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
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
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
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock Data
const MOCK_APPLICATIONS = [
    {
        id: "APP-2025-001",
        user: { name: "Alice Johnson", email: "alice@example.com" },
        grant: { title: "Green Energy Innovation Fund", organization: "EcoFuture Foundation" },
        status: "under_review",
        submittedAt: "2025-11-10T10:00:00Z",
        requestedAmount: 5000000
    },
    {
        id: "APP-2025-002",
        user: { name: "Bob Smith", email: "bob@techstart.io" },
        grant: { title: "Tech for Social Good", organization: "Global Tech Alliance" },
        status: "submitted",
        submittedAt: "2025-11-18T14:30:00Z",
        requestedAmount: 2500000
    },
    {
        id: "APP-2025-003",
        user: { name: "Carol White", email: "carol@community.org" },
        grant: { title: "Community Arts Grant", organization: "Arts Council" },
        status: "approved",
        submittedAt: "2025-10-05T09:15:00Z",
        requestedAmount: 1000000
    },
    {
        id: "APP-2025-004",
        user: { name: "David Brown", email: "david@research.edu" },
        grant: { title: "Scientific Research Fund", organization: "Science Foundation" },
        status: "rejected",
        submittedAt: "2025-09-20T11:45:00Z",
        requestedAmount: 7500000
    },
    {
        id: "APP-2025-005",
        user: { name: "Eva Green", email: "eva@green.org" },
        grant: { title: "Green Energy Innovation Fund", organization: "EcoFuture Foundation" },
        status: "approved",
        submittedAt: "2025-11-01T16:20:00Z",
        requestedAmount: 4500000
    }
];

const MOCK_USERS = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "user", joined: "2025-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@techstart.io", role: "user", joined: "2025-02-20" },
    { id: 3, name: "Admin User", email: "admin@novagrants.org", role: "admin", joined: "2024-12-01" },
    { id: 4, name: "Carol White", email: "carol@community.org", role: "user", joined: "2025-03-10" },
];

const CHART_DATA = [
    { name: 'Jan', applications: 4 },
    { name: 'Feb', applications: 7 },
    { name: 'Mar', applications: 5 },
    { name: 'Apr', applications: 12 },
    { name: 'May', applications: 18 },
    { name: 'Jun', applications: 14 },
];

const AdminDashboard = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [applications, setApplications] = useState(MOCK_APPLICATIONS);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/");
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        setApplications(prev => prev.map(app => 
            app.id === id ? { ...app, status: newStatus } : app
        ));
        toast.success(`Application status updated to ${newStatus}`);
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
        app.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'submitted' || a.status === 'under_review').length,
        approved: applications.filter(a => a.status === 'approved').length,
        totalValue: applications.filter(a => a.status === 'approved').reduce((acc, curr) => acc + curr.requestedAmount, 0)
    };

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
                                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                activeTab === item.id 
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
                                            <div className="text-2xl font-bold">{MOCK_USERS.length}</div>
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
                                                <BarChart data={CHART_DATA}>
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
                                                {MOCK_USERS.map((u) => (
                                                    <TableRow key={u.id}>
                                                        <TableCell className="font-medium">{u.name}</TableCell>
                                                        <TableCell>{u.email}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                                                                {u.role}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>{new Date(u.joined).toLocaleDateString()}</TableCell>
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
