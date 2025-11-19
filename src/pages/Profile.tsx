import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  DollarSign,
  Calendar
} from "lucide-react";

// Mock data for applications (fallback if API fails or for demo)
const MOCK_APPLICATIONS = [
  {
    id: "APP-2025-001",
    grant: { title: "Green Energy Innovation Fund", organization: "EcoFuture Foundation" },
    status: "under_review",
    submittedAt: "2025-11-10T10:00:00Z",
    requestedAmount: 5000000,
    feeStatus: "paid"
  },
  {
    id: "APP-2025-002",
    grant: { title: "Tech for Social Good", organization: "Global Tech Alliance" },
    status: "pending_payment",
    submittedAt: "2025-11-18T14:30:00Z",
    requestedAmount: 2500000,
    feeStatus: "unpaid",
    feeAmount: 5000
  }
];

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, appId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock upload process
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'Uploading proof of payment...',
          success: () => {
            // Update local state to show as paid/processing
            setApplications(prev => prev.map(app => 
              app.id === appId ? { ...app, feeStatus: 'processing' } : app
            ));
            return 'Proof of payment uploaded successfully!';
          },
          error: 'Upload failed',
        }
      );
    }
  };

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'under_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending_payment': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-6 px-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold truncate">{user.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  {[
                    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                    { id: 'applications', label: 'My Applications', icon: FileText },
                    { id: 'payments', label: 'Payments & Fees', icon: CreditCard },
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

          {/* Main Content Area */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              
              {/* OVERVIEW TAB */}
              <TabsContent value="overview" className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                  <p className="text-muted-foreground">Welcome back, here's what's happening with your grants.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{applications.length}</div>
                      <p className="text-xs text-muted-foreground">Lifetime submissions</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Action</CardTitle>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {applications.filter(a => a.status === 'pending_payment').length}
                      </div>
                      <p className="text-xs text-muted-foreground">Requires payment or info</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Grants</CardTitle>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {applications.filter(a => a.status === 'approved').length}
                      </div>
                      <p className="text-xs text-muted-foreground">Currently funded projects</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {applications.map((app) => (
                          <div key={app.id} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                Application {app.status === 'submitted' ? 'Submitted' : 'Updated'}
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
                  
                  <Card className="col-span-3 bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle>Need Help?</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        Our support team is here to assist you with your application process.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="secondary" className="w-full" onClick={() => navigate('/contact')}>
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* APPLICATIONS TAB */}
              <TabsContent value="applications" className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">My Applications</h2>
                    <p className="text-muted-foreground">Track and manage your grant submissions.</p>
                  </div>
                  <Button onClick={() => navigate('/grants')}>Browse Grants</Button>
                </div>

                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{app.grant.title}</h3>
                              <p className="text-sm text-muted-foreground">{app.grant.organization}</p>
                            </div>
                            <Badge variant="outline" className={getStatusColor(app.status)}>
                              {app.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">Application ID</p>
                              <p className="font-medium">{app.id}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Submitted Date</p>
                              <p className="font-medium">{new Date(app.submittedAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Requested</p>
                              <p className="font-medium">{formatCurrency(app.requestedAmount)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Fee Status</p>
                              <div className="flex items-center gap-2">
                                {app.feeStatus === 'paid' ? (
                                  <span className="text-green-600 flex items-center gap-1 font-medium">
                                    <CheckCircle2 className="w-3 h-3" /> Paid
                                  </span>
                                ) : app.feeStatus === 'processing' ? (
                                  <span className="text-blue-600 flex items-center gap-1 font-medium">
                                    <Clock className="w-3 h-3" /> Processing
                                  </span>
                                ) : (
                                  <span className="text-yellow-600 flex items-center gap-1 font-medium">
                                    <AlertCircle className="w-3 h-3" /> Unpaid
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {app.status === 'pending_payment' && (
                          <div className="bg-yellow-50/50 p-6 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-border min-w-[200px]">
                            <p className="text-sm font-medium text-yellow-800 mb-3">Action Required</p>
                            <Button size="sm" onClick={() => setActiveTab('payments')}>
                              Pay Application Fee
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* PAYMENTS TAB */}
              <TabsContent value="payments" className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-bold">Payments & Fees</h2>
                  <p className="text-muted-foreground">Manage application fees and upload proof of payment.</p>
                </div>

                <div className="grid gap-6">
                  {applications.filter(app => app.feeStatus !== 'paid').length === 0 ? (
                    <Card className="bg-muted/50 border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-semibold">All Caught Up!</h3>
                        <p className="text-muted-foreground">You have no pending payments or fees.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    applications.filter(app => app.feeStatus !== 'paid').map(app => (
                      <Card key={app.id} className="border-l-4 border-l-yellow-500">
                        <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                            <span>Application Fee: {app.grant.title}</span>
                            <span className="text-xl font-bold">{formatCurrency(app.feeAmount || 5000)}</span>
                          </CardTitle>
                          <CardDescription>
                            Application ID: {app.id} • Due within 7 days of submission
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted p-4 rounded-lg mb-6">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <CreditCard className="w-4 h-4" /> Payment Instructions
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Please transfer the application fee to the following bank account:
                            </p>
                            <ul className="text-sm space-y-1 font-mono bg-background p-3 rounded border">
                              <li>Bank: Global Trust Bank</li>
                              <li>Account Name: NovaGrants LLC</li>
                              <li>Account Number: 1234-5678-9012</li>
                              <li>Reference: {app.id}</li>
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <Label>Upload Proof of Payment</Label>
                            <div className="flex items-center gap-4">
                              <Input 
                                type="file" 
                                accept="image/*,.pdf" 
                                onChange={(e) => handleFileUpload(e, app.id)}
                                disabled={app.feeStatus === 'processing'}
                              />
                              {app.feeStatus === 'processing' && (
                                <Badge variant="secondary">Under Review</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Accepted formats: PDF, JPG, PNG. Max size: 5MB.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}

                  {/* Payment History */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                    <Card>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {applications.filter(app => app.feeStatus === 'paid').map(app => (
                            <div key={app.id} className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{app.grant.title}</p>
                                  <p className="text-xs text-muted-foreground">Paid on {new Date().toLocaleDateString()}</p>
                                </div>
                              </div>
                              <span className="font-bold text-sm">{formatCurrency(5000)}</span>
                            </div>
                          ))}
                          {applications.filter(app => app.feeStatus === 'paid').length === 0 && (
                            <div className="p-8 text-center text-muted-foreground text-sm">
                              No payment history available.
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* SETTINGS TAB */}
              <TabsContent value="settings" className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-bold">Account Settings</h2>
                  <p className="text-muted-foreground">Update your profile and preferences.</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue={user.email} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="org">Organization</Label>
                        <Input id="org" defaultValue={user.organization || ""} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => toast.success("Profile updated successfully")}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your password and account security.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Update Password</Button>
                  </CardFooter>
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

export default Profile;
