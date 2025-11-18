import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Clock, Mail } from "lucide-react";

const ApplicationSuccess = () => {
    const { applicationId } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-background">
                {/* Success Header */}
                <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-6">
                                <CheckCircle className="h-12 w-12 text-secondary" />
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Application Submitted Successfully!
                            </h1>

                            <p className="text-lg text-muted-foreground mb-2">
                                Your application has been received and is now under review.
                            </p>

                            <div className="inline-block bg-muted px-4 py-2 rounded-lg">
                                <p className="text-sm font-medium">
                                    Application ID: <span className="font-mono text-primary">{applicationId}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What Happens Next */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6">What happens next?</h2>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 bg-card rounded-lg shadow-custom-md">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                            <Mail className="h-6 w-6 text-secondary" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">Confirmation Email</h3>
                                        <p className="text-sm text-muted-foreground">
                                            You'll receive a confirmation email with your application details and next steps within the next few minutes.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-6 bg-card rounded-lg shadow-custom-md">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                            <FileText className="h-6 w-6 text-accent" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">Application Review</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Our team will review your application along with all supporting documents. This typically takes 6-8 weeks.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-6 bg-card rounded-lg shadow-custom-md">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-2">Decision Notification</h3>
                                        <p className="text-sm text-muted-foreground">
                                            You'll be notified of the decision via email. If approved, you'll receive information about the grant disbursement process and next steps.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Information */}
                            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                                <h3 className="font-semibold mb-3">Important Information</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Keep your application ID safe for future reference</li>
                                    <li>• Check your email regularly for updates</li>
                                    <li>• You may be contacted for additional information or clarification</li>
                                    <li>• Application fees are non-refundable</li>
                                    <li>• If approved, remember the 30% repayment policy after 2 years</li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="flex-1">
                                    <Link to="/grants">Browse More Grants</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="flex-1">
                                    <Link to="/">Return Home</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ApplicationSuccess;
