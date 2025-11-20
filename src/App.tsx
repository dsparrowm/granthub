import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Grants from "./pages/Grants";
import GrantDetail from "./pages/GrantDetail";
import Apply from "./pages/Apply";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Resources from "./pages/Resources";
import ArticleDetail from "./pages/ArticleDetail";
import NewsEvents from "./pages/NewsEvents";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/grants" element={<Grants />} />
            <Route path="/grants/:id" element={<GrantDetail />} />
            <Route path="/apply/:grantId" element={<Apply />} />
            <Route path="/application/:applicationId/success" element={<ApplicationSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ArticleDetail />} />
            <Route path="/news" element={<NewsEvents />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
