import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, DollarSign, Users, FileText, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

interface Application {
    id: string;
    status: string;
    requestedAmount: number;
    submittedAt: string;
    user: {
        name: string;
        email: string;
    };
    grant: {
        title: string;
        organization: string;
    };
}

interface Stats {
    totalApplications: number;
    pendingApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    totalGrantAmount: number;
}

const AdminDashboard = () => {
    const { isAuthenticated, user, token } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [stats, setStats] = useState<Stats>({
        totalApplications: 0,
        pendingApplications: 0,
        approvedApplications: 0,
        rejectedApplications: 0,
        totalGrantAmount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (user?.role !== "admin") {
            toast.error("Access denied. Admin privileges required.");
            navigate("/");
            return;
        }

        fetchApplications();
    }, [isAuthenticated, user, navigate, token]);

    const fetchApplications = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/applications`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }

            const data = await response.json();
            setApplications(data);

            // Calculate stats
            const stats = {
                totalApplications: data.length,
                pendingApplications: data.filter((app: Application) => app.status === 'submitted' || app.status === 'under_review').length,
                approvedApplications: data.filter((app: Application) => app.status === 'approved').length,
                rejectedApplications: data.filter((app: Application) => app.status === 'rejected').length,
                totalGrantAmount: data
                    .filter((app: Application) => app.status === 'approved')
                    .reduce((sum: number, app: Application) => sum + app.requestedAmount, 0),
            };
            setStats(stats);
        } catch (error) {
            console.error('Error fetching applications:', error);
            toast.error('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    const updateApplicationStatus = async (applicationId: string, status: string) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/applications/${applicationId}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            toast.success(`Application ${status}`);
            fetchApplications(); // Refresh data
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update application status');
        }
    };

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

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 bg-background py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center">Loading...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-background py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-muted-foreground">
                            Manage grant applications and review submissions
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalApplications}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.pendingApplications}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.approvedApplications}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${(stats.totalGrantAmount / 100).toLocaleString()}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Applications Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>All Applications</CardTitle>
                            <CardDescription>Review and manage grant applications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="pending">Pending</TabsTrigger>
                                    <TabsTrigger value="approved">Approved</TabsTrigger>
                                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="mt-4">
                                    <ApplicationsTable
                                        applications={applications}
                                        statusColors={statusColors}
                                        statusLabels={statusLabels}
                                        onStatusChange={updateApplicationStatus}
                                    />
                                </TabsContent>

                                <TabsContent value="pending" className="mt-4">
                                    <ApplicationsTable
                                        applications={applications.filter(app => app.status === 'submitted' || app.status === 'under_review')}
                                        statusColors={statusColors}
                                        statusLabels={statusLabels}
                                        onStatusChange={updateApplicationStatus}
                                    />
                                </TabsContent>

                                <TabsContent value="approved" className="mt-4">
                                    <ApplicationsTable
                                        applications={applications.filter(app => app.status === 'approved')}
                                        statusColors={statusColors}
                                        statusLabels={statusLabels}
                                        onStatusChange={updateApplicationStatus}
                                    />
                                </TabsContent>

                                <TabsContent value="rejected" className="mt-4">
                                    <ApplicationsTable
                                        applications={applications.filter(app => app.status === 'rejected')}
                                        statusColors={statusColors}
                                        statusLabels={statusLabels}
                                        onStatusChange={updateApplicationStatus}
                                    />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

interface ApplicationsTableProps {
    applications: Application[];
    statusColors: Record<string, string>;
    statusLabels: Record<string, string>;
    onStatusChange: (id: string, status: string) => void;
}

const ApplicationsTable = ({ applications, statusColors, statusLabels, onStatusChange }: ApplicationsTableProps) => {
    if (applications.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No applications found
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Grant</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell>
                                <div>
                                    <div className="font-medium">{app.user.name}</div>
                                    <div className="text-sm text-muted-foreground">{app.user.email}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div className="font-medium">{app.grant.title}</div>
                                    <div className="text-sm text-muted-foreground">{app.grant.organization}</div>
                                </div>
                            </TableCell>
                            <TableCell>${(app.requestedAmount / 100).toLocaleString()}</TableCell>
                            <TableCell>
                                {new Date(app.submittedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </TableCell>
                            <TableCell>
                                <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                                    {statusLabels[app.status as keyof typeof statusLabels]}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Select
                                    defaultValue={app.status}
                                    onValueChange={(value) => onStatusChange(app.id, value)}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="submitted">Submitted</SelectItem>
                                        <SelectItem value="under_review">Under Review</SelectItem>
                                        <SelectItem value="approved">Approve</SelectItem>
                                        <SelectItem value="rejected">Reject</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminDashboard;
