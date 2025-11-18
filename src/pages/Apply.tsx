import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getGrantById } from "@/services/grantsData";
import { computeApplicationFee, formatCurrency } from "@/lib/fees";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Apply = () => {
  const { grantId } = useParams();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for grants");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch grant data
  const grant = grantId ? getGrantById(grantId) : null;

  // Redirect if grant not found
  useEffect(() => {
    if (grantId && !grant) {
      toast.error("Grant not found");
      navigate("/grants");
    }
  }, [grantId, grant, navigate]);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    organization: user?.organization || "",
    position: "",
    projectTitle: "",
    projectDescription: "",
    requestedAmount: "",
    timeline: "",
  });

  const estimatedFee = formData.requestedAmount ? computeApplicationFee(formData.requestedAmount) : 0;

  // Eligibility state - users must confirm all to proceed
  // Initialize with false for each eligibility criterion from the grant
  const [eligibility, setEligibility] = useState<Record<number, boolean>>({});

  const isEligible = grant?.eligibility
    ? grant.eligibility.every((_, index) => eligibility[index] === true)
    : false;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  if (!grant) {
    return null; // Will redirect in useEffect
  }
  const handleNext = () => {
    // prevent moving past eligibility if not eligible
    if (currentStep === 1 && !isEligible) {
      toast.error("You must confirm all eligibility criteria before proceeding.");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Authentication required");
      navigate("/login");
      return;
    }

    try {
      const applicationData = {
        applicantName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        organization: formData.organization,
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        requestedAmount: parseFloat(formData.requestedAmount),
      };

      // Call API
      const response = await fetch(`${API_URL}/api/grants/${grantId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Application submission failed");
      }

      const result = await response.json();

      // Navigate to success page
      navigate(`/application/${result.id}/success`);
    } catch (error) {
      console.error("Application error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="gradient-hero py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Grant Application
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Applying for: <strong>{grant.title}</strong>
            </p>
            <p className="text-primary-foreground/80 text-sm mt-2">
              {grant.organization}
            </p>
          </div>
        </section>

        {/* Progress */}
        <section className="py-6 bg-card shadow-custom-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="flex justify-between mt-4">
                {["Eligibility", "Personal Info", "Project Details", "Documents", "Review"].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 <= currentStep ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                      {index + 1 < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
                    </div>
                    <span className="text-xs mt-2 hidden sm:block">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-custom-md">
                {/* Step 1: Personal Information */}
                {/* Step 0: Eligibility Check */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Eligibility Check</h2>

                    <p className="text-sm text-muted-foreground">Please confirm the following to make sure you are eligible to apply. If you do not meet these criteria, do not proceed — applying may require a non-refundable application fee.</p>

                    <div className="space-y-3 mt-4">
                      {grant.eligibility?.map((criterion, index) => (
                        <div key={index} className="flex items-start">
                          <Checkbox
                            id={`eligibility-${index}`}
                            checked={eligibility[index] || false}
                            onCheckedChange={(val) => setEligibility(prev => ({ ...prev, [index]: Boolean(val) }))}
                          />
                          <Label htmlFor={`eligibility-${index}`} className="ml-3 text-sm cursor-pointer">
                            {criterion}
                          </Label>
                        </div>
                      ))}

                      {Object.keys(eligibility).length > 0 && !isEligible && (
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md text-sm">
                          Based on your answers, you are currently marked as not eligible. If you believe this is an error, contact our team or review the eligibility requirements for the specific grant before applying.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 1: Personal Information */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization/Company *</Label>
                      <Input
                        id="organization"
                        placeholder="Your Company Name"
                        value={formData.organization}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Your Position *</Label>
                      <Input
                        id="position"
                        placeholder="e.g., Founder, CEO"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Project Details</h2>

                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">Project Title *</Label>
                      <Input
                        id="projectTitle"
                        placeholder="Your innovative project"
                        value={formData.projectTitle}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Project Category *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="social">Social Good</SelectItem>
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requestedAmount">Requested Funding Amount *</Label>
                      <Input
                        id="requestedAmount"
                        type="number"
                        placeholder="50000"
                        value={formData.requestedAmount}
                        onChange={handleInputChange}
                        required
                      />
                      {formData.requestedAmount && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>Estimated application fee: <strong className="text-primary">{formatCurrency(estimatedFee)}</strong></span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectDescription">Project Summary (max 500 words) *</Label>
                      <Textarea
                        id="projectDescription"
                        placeholder="Describe your project, its goals, and expected impact..."
                        className="min-h-[150px]"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Project Timeline *</Label>
                      <Input
                        id="timeline"
                        placeholder="e.g., 12 months"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}                {/* Step 3: Documents */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Required Documents</h2>

                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="font-medium mb-2">Business Plan</p>
                        <p className="text-sm text-muted-foreground mb-4">PDF, DOC, or DOCX (Max 10MB)</p>
                        <Button type="button" variant="outline">Choose File</Button>
                      </div>

                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="font-medium mb-2">Financial Projections</p>
                        <p className="text-sm text-muted-foreground mb-4">PDF, XLS, or XLSX (Max 10MB)</p>
                        <Button type="button" variant="outline">Choose File</Button>
                      </div>

                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="font-medium mb-2">Pitch Deck</p>
                        <p className="text-sm text-muted-foreground mb-4">PDF or PPT (Max 20MB)</p>
                        <Button type="button" variant="outline">Choose File</Button>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> All documents will be reviewed confidentially. Please ensure all files are up to date.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>

                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Personal Information</h3>
                        <p className="text-sm text-muted-foreground">Please review your personal details in Step 1</p>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Project Details</h3>
                        <p className="text-sm text-muted-foreground">Please review your project information in Step 2</p>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Documents</h3>
                        <p className="text-sm text-muted-foreground">Please review your uploaded documents in Step 3</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 mt-6">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        I certify that all information provided is accurate and complete. I understand that false information may result in disqualification. I agree to the terms and conditions of the grant program.
                      </Label>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mt-4 text-sm">
                      <p className="font-medium mb-2">Important policy summary</p>
                      <p className="text-muted-foreground">If your application is successful, recipients are asked to return 30% of the grant amount after two years so that we can support more projects in the future. We also collect an application fee (calculated from the requested amount) which covers our operational costs — staff, platform maintenance, and processing. Grants are awarded by funders (governments, foundations, or private donors); our platform facilitates awarding and administration.</p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={handleNext}>
                      Next Step
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-secondary hover:bg-secondary/90">
                      Submit Application
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
