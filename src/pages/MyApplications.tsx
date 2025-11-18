import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, DollarSign } from "lucide-react";

const MyApplications = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    // Mock applications data - would come from API
    const applications = [
        {
            id: "app-1",
            grantTitle: "Innovation Startup Grant",
            organization: "Tech Foundation",
            amount: "$75,000",
            submittedDate: "Nov 1, 2025",
            status: "under_review",
        },
        {
            id: "app-2",
            grantTitle: "Small Business Growth Fund",
            organization: "Economic Development Agency",
            amount: "$25,000",
            submittedDate: "Oct 15, 2025",
            status: "approved",
        },
    ];

    const statusColors = {
        submitted: "bg-blue-100 text-blue-800",
        under_review: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
    };

    const statusLabels = {
        submitted: "Submitted",
        under_review: "Under Review",
        approved: "Approved",
        rejected: "Rejected",
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-background py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-2">My Applications</h1>
                        <p className="text-muted-foreground mb-8">
                            Track your grant applications and their status
                        </p>

                        <div className="space-y-4">
                            {applications.map((app) => (
                                <Card key={app.id} className="hover:shadow-custom-lg transition-smooth">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle>{app.grantTitle}</CardTitle>
                                                <CardDescription>{app.organization}</CardDescription>
                                            </div>
                                            <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                                                {statusLabels[app.status as keyof typeof statusLabels]}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-6 text-sm">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                <span>Requested: {app.amount}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>Submitted: {app.submittedDate}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {applications.length === 0 && (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <p className="text-muted-foreground">
                                        You haven't submitted any applications yet.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MyApplications;
