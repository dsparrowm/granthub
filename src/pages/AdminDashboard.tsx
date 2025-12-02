import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth, User } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    LogOut,
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    DollarSign,
    TrendingUp,
    Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Application } from "@/services/api";



const AdminDashboard = () => {
    const { isAuthenticated, user, logout, token } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [applications, setApplications] = useState<Application[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else if (user?.role !== "admin") {
            // For demo purposes, we might want to allow viewing if we are just testing
            // But strictly speaking:
            // toast.error("Access denied. Admin privileges required.");
            // navigate("/");
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        console.log('[AdminDashboard] Applications useEffect triggered', { token: !!token, user, role: user?.role });
        const loadApplications = async () => {
            if (!token || !user || user.role !== 'admin') {
                console.log('[AdminDashboard] Skipping applications fetch', { token: !!token, user: !!user, role: user?.role });
                return;
            }

            console.log('[AdminDashboard] Fetching applications...');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/applications/admin/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();
                console.log('[AdminDashboard] Applications fetched:', data.length);
                setApplications(data);
            } catch (error) {
                console.log('Could not load applications:', error);
            } finally {
                setLoading(false);
            }
        };

        loadApplications();
    }, [token, user]);

    useEffect(() => {
        console.log('[AdminDashboard] Users useEffect triggered', { token: !!token, user, role: user?.role });
        const loadUsers = async () => {
            if (!token || !user || user.role !== 'admin') {
                console.log('[AdminDashboard] Skipping users fetch', { token: !!token, user: !!user, role: user?.role });
                return;
            }

            console.log('[AdminDashboard] Fetching users...');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/auth/admin/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();
                console.log('[AdminDashboard] Users fetched:', data.length);
                setUsers(data);
            } catch (error) {
                console.log('Could not load users:', error);
            }
        };

        loadUsers();
    }, [token, user]);

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/");
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        if (!token) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/applications/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Update failed');

            const updatedApp = await response.json();
            setApplications(prev => prev.map(app =>
                app.id === id ? updatedApp : app
            ));
            toast.success(`Application status updated to ${newStatus}`);
        } catch (error) {
            toast.error('Failed to update status');
            console.error('Status update error:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            case 'under_review': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'submitted': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filteredApplications = applications.filter(app =>
        app.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.grant?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'submitted' || a.status === 'under_review').length,
        approved: applications.filter(a => a.status === 'approved').length,
        totalValue: applications.filter(a => a.status === 'approved').reduce((acc, curr) => acc + (curr.requestedAmount || 0), 0)
    };

    // Generate chart data from applications by month
    const chartData = React.useMemo(() => {
        const monthCounts: Record<string, number> = {};
        const now = new Date();

        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleString('default', { month: 'short' });
            monthCounts[monthName] = 0;
        }

        // Count applications by month
        applications.forEach(app => {
            const date = new Date(app.submittedAt);
            const monthName = date.toLocaleString('default', { month: 'short' });
            if (monthCounts[monthName] !== undefined) {
                monthCounts[monthName]++;
            }
        });

        return Object.entries(monthCounts).map(([name, applications]) => ({ name, applications }));
    }, [applications]);

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col bg-muted/10">
            <Header />

            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <Card className="sticky top-24">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-6 px-2">
                                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                                        A
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-semibold truncate">Admin Portal</h3>
                                        <p className="text-xs text-muted-foreground truncate">Manage Platform</p>
                                    </div>
                                </div>

                                <nav className="space-y-1">
                                    {[
                                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                                        { id: 'applications', label: 'Applications', icon: FileText },
                                        { id: 'users', label: 'Users', icon: Users },
                                        { id: 'settings', label: 'Settings', icon: Settings },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === item.id
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                                }`}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </button>
                                    ))}

                                    <div className="pt-4 mt-4 border-t border-border">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Log Out
                                        </button>
                                    </div>
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

                            {/* OVERVIEW TAB */}
                            <TabsContent value="overview" className="space-y-6 animate-fade-in">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                                    <p className="text-muted-foreground">Platform statistics and recent activity.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{stats.total}</div>
                                            <p className="text-xs text-muted-foreground">+12% from last month</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                                            <Clock className="h-4 w-4 text-yellow-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{stats.pending}</div>
                                            <p className="text-xs text-muted-foreground">Requires attention</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
                                            <DollarSign className="h-4 w-4 text-green-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">${(stats.totalValue / 1000000).toFixed(1)}M</div>
                                            <p className="text-xs text-muted-foreground">Approved grants value</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                                            <Users className="h-4 w-4 text-blue-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{users.length}</div>
                                            <p className="text-xs text-muted-foreground">+4 new this week</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <Card className="col-span-1">
                                        <CardHeader>
                                            <CardTitle>Application Trends</CardTitle>
                                            <CardDescription>Monthly submission volume</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-[300px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={chartData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="applications" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>

                                    <Card className="col-span-1">
                                        <CardHeader>
                                            <CardTitle>Recent Activity</CardTitle>
                                            <CardDescription>Latest platform actions</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-8">
                                                {applications.slice(0, 4).map((app) => (
                                                    <div key={app.id} className="flex items-center">
                                                        <div className="space-y-1">
                                                            <p className="text-sm font-medium leading-none">
                                                                New application from {app.user.name}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {app.grant.title}
                                                            </p>
                                                        </div>
                                                        <div className="ml-auto font-medium text-xs text-muted-foreground">
                                                            {new Date(app.submittedAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* APPLICATIONS TAB */}
                            <TabsContent value="applications" className="space-y-6 animate-fade-in">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold">Applications</h2>
                                        <p className="text-muted-foreground">Manage and review grant submissions.</p>
                                    </div>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>All Applications</CardTitle>
                                            <div className="relative w-64">
                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="Search applications..."
                                                    className="pl-8"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>ID</TableHead>
                                                    <TableHead>Applicant</TableHead>
                                                    <TableHead>Yearly Income</TableHead>
                                                    <TableHead>Grant</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredApplications.map((app) => (
                                                    <TableRow key={app.id}>
                                                        <TableCell className="font-medium">{app.id}</TableCell>
                                                        <TableCell>
                                                            <div>
                                                                <div className="font-medium">{app.user.name}</div>
                                                                <div className="text-xs text-muted-foreground">{app.user.email}</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{app.annualIncome || 'N/A'}</TableCell>
                                                        <TableCell>{app.grant.title}</TableCell>
                                                        <TableCell>${(app.requestedAmount / 100).toLocaleString()}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className={getStatusColor(app.status)}>
                                                                {app.status.replace('_', ' ').toUpperCase()}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Select
                                                                defaultValue={app.status}
                                                                onValueChange={(val) => handleStatusChange(app.id, val)}
                                                            >
                                                                <SelectTrigger className="w-[130px] h-8">
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
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* USERS TAB */}
                            <TabsContent value="users" className="space-y-6 animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-bold">User Management</h2>
                                    <p className="text-muted-foreground">View and manage registered users.</p>
                                </div>

                                <Card>
                                    <CardContent className="p-0">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Email</TableHead>
                                                    <TableHead>Role</TableHead>
                                                    <TableHead>Joined Date</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {users.map((u) => (
                                                    <TableRow key={u.id}>
                                                        <TableCell className="font-medium">{u.name}</TableCell>
                                                        <TableCell>{u.email}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                                                                {u.role}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="sm">Edit</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* SETTINGS TAB */}
                            <TabsContent value="settings" className="space-y-6 animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-bold">Platform Settings</h2>
                                    <p className="text-muted-foreground">Configure global application settings.</p>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>General Configuration</CardTitle>
                                        <CardDescription>Manage site-wide parameters.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Platform Name</label>
                                            <Input defaultValue="NovaGrants" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Support Email</label>
                                            <Input defaultValue="support@novagrants.org" />
                                        </div>
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium">Maintenance Mode</h4>
                                                <p className="text-sm text-muted-foreground">Disable access for non-admins</p>
                                            </div>
                                            <Button variant="outline">Enable</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                        </Tabs>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
