import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Upload } from "lucide-react";
import { toast } from "sonner";

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! We'll review your submission and get back to you soon.");
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
              Complete your application step by step
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
                {["Personal Info", "Project Details", "Documents", "Review"].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index + 1 <= currentStep ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
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
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization/Company *</Label>
                      <Input id="organization" placeholder="Your Company Name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Your Position *</Label>
                      <Input id="position" placeholder="e.g., Founder, CEO" required />
                    </div>
                  </div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">Project Title *</Label>
                      <Input id="projectTitle" placeholder="Your innovative project" required />
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
                      <Label htmlFor="fundingAmount">Requested Funding Amount *</Label>
                      <Input id="fundingAmount" type="number" placeholder="50000" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectSummary">Project Summary (max 500 words) *</Label>
                      <Textarea 
                        id="projectSummary" 
                        placeholder="Describe your project, its goals, and expected impact..." 
                        className="min-h-[150px]"
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectTimeline">Project Timeline *</Label>
                      <Input id="projectTimeline" placeholder="e.g., 12 months" required />
                    </div>
                  </div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 3 && (
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
                {currentStep === 4 && (
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
