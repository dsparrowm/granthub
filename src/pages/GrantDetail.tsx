import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, MapPin, Building2, Users, FileText, CheckCircle } from "lucide-react";
import { computeApplicationFee, formatCurrency } from "@/lib/fees";
import { getGrantById } from "@/services/appwrite/grants.service";
import EligibilityModal from "@/components/EligibilityModal";
import { toast } from "sonner";

const GrantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [grant, setGrant] = useState<any>(null);

  useEffect(() => {
    const loadGrant = async () => {
      if (!id) return;
      try {
        const grantData = await getGrantById(id);
        if (!grantData) {
          toast.error("Grant not found");
          navigate("/grants");
          return;
        }
        setGrant(grantData);
      } catch (error) {
        console.error('Failed to load grant:', error);
        toast.error("Failed to load grant");
        navigate("/grants");
      }
    };
    loadGrant();
  }, [id, navigate]);

  if (!grant) {
    return null;
  }

  // compute fee
  const fee = computeApplicationFee(grant.amount);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="gradient-hero py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Badge className="bg-secondary text-secondary-foreground mb-4">{grant.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                {grant.title}
              </h1>
              <p className="text-primary-foreground/90 text-lg mb-6">
                {grant.organization}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center text-primary-foreground">
                  <DollarSign className="mr-2 h-5 w-5" />
                  <div>
                    <p className="text-sm text-primary-foreground/80">Funding Amount</p>
                    <p className="font-semibold">{grant.amount}</p>
                  </div>
                </div>
                <div className="flex items-center text-primary-foreground">
                  <Calendar className="mr-2 h-5 w-5" />
                  <div>
                    <p className="text-sm text-primary-foreground/80">Deadline</p>
                    <p className="font-semibold">{grant.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center text-primary-foreground">
                  <MapPin className="mr-2 h-5 w-5" />
                  <div>
                    <p className="text-sm text-primary-foreground/80">Location</p>
                    <p className="font-semibold">{grant.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <div className="bg-card p-6 rounded-lg shadow-custom-md">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-primary" />
                    Overview
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {grant.fullDescription}
                  </p>
                </div>

                {/* Eligibility */}
                <div className="bg-card p-6 rounded-lg shadow-custom-md">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Users className="mr-2 h-6 w-6 text-primary" />
                    Eligibility Criteria
                  </h2>
                  <ul className="space-y-3">
                    {grant.eligibility.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="bg-card p-6 rounded-lg shadow-custom-md">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-primary" />
                    Application Requirements
                  </h2>
                  <ul className="space-y-3">
                    {grant.requirements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="bg-card p-6 rounded-lg shadow-custom-md">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Building2 className="mr-2 h-6 w-6 text-primary" />
                    What You'll Get
                  </h2>
                  <ul className="space-y-3">
                    {grant.benefits.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Eligibility Check CTA */}
                <div className="bg-secondary/10 border-2 border-secondary rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3">Check Your Eligibility First</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Avoid paying the application fee if you don't meet the requirements. Check your eligibility in seconds.
                  </p>
                  <Button
                    onClick={() => setEligibilityModalOpen(true)}
                    variant="outline"
                    className="w-full mb-3 border-secondary text-secondary hover:bg-secondary/10"
                  >
                    Check Eligibility
                  </Button>
                </div>

                {/* Apply CTA */}
                <div className="bg-card p-6 rounded-lg shadow-custom-md sticky top-20">
                  <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Start your application now and take the first step towards funding your innovation.
                  </p>
                  <Button asChild className="w-full mb-3" size="lg">
                    <Link to={`/apply/${grant.id}`}>Apply Now</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/grants">Browse More Grants</Link>
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Quick Information</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Grant Type</dt>
                      <dd className="font-medium">Non-dilutive Funding</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Decision Timeline</dt>
                      <dd className="font-medium">6-8 weeks</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Application Fee</dt>
                      <dd className="font-medium">{formatCurrency(fee)}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Repayment Policy</dt>
                      <dd className="font-medium">Recipients who receive a grant are asked to return 30% of the grant amount after 2 years to help fund future grantees.</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Platform Fees</dt>
                      <dd className="font-medium">We charge an application fee (shown above) which covers our operational costs — staff, platform maintenance, and application processing. Grant funds themselves are provided by governments, foundations, or private donors; our platform only facilitates awarding and administration.</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Renewability</dt>
                      <dd className="font-medium">One-time grant</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <EligibilityModal
        open={eligibilityModalOpen}
        onOpenChange={setEligibilityModalOpen}
        grantId={grant.id}
        eligibilityCriteria={grant.eligibility || []}
      />

      <Footer />
    </div>
  );
};

export default GrantDetail;
