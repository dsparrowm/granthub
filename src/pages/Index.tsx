import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, FileText, Award, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrantCard from "@/components/GrantCard";
import heroImage from "@/assets/hero-collaboration.jpg";

const Index = () => {
  const featuredGrants = [
    {
      id: "1",
      title: "Innovation Startup Grant",
      organization: "Tech Foundation",
      amount: "$50,000 - $100,000",
      deadline: "Dec 31, 2025",
      location: "United States",
      category: "Technology",
      description: "Supporting innovative tech startups with groundbreaking ideas in AI, blockchain, and sustainable technology.",
    },
    {
      id: "2",
      title: "Small Business Growth Fund",
      organization: "Economic Development Agency",
      amount: "$25,000",
      deadline: "Nov 15, 2025",
      location: "Global",
      category: "Business",
      description: "Empowering small businesses to scale and create jobs in their communities.",
    },
    {
      id: "3",
      title: "Social Impact Initiative",
      organization: "Global Impact Fund",
      amount: "$75,000",
      deadline: "Jan 20, 2026",
      location: "Worldwide",
      category: "Social Good",
      description: "Funding projects that create positive social change and community development.",
    },
  ];

  const howItWorks = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse thousands of grant opportunities tailored to your needs and eligibility.",
    },
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete your application with our guided step-by-step process and expert tips.",
    },
    {
      icon: Award,
      title: "Get Funded",
      description: "Receive funding to bring your innovative ideas and projects to life.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Startup Founder",
      content: "GrantConnect helped me secure $75,000 in funding for my AI startup. The platform made the entire process seamless!",
    },
    {
      name: "Michael Chen",
      role: "Social Entrepreneur",
      content: "Thanks to GrantConnect, our community project received the funding it needed. Their support was invaluable.",
    },
    {
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      content: "I discovered grants I never knew existed. The platform is user-friendly and the results speak for themselves.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Diverse team collaborating on innovative projects" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 gradient-hero opacity-90" />
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Empowering Ideas Through Grants
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
                Discover funding opportunities and resources for individuals and startups. Search, apply, and get funded.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="hero" size="lg">
                  <Link to="/grants">Search Grants <ArrowRight className="ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/apply">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Grants */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Grant Opportunities</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore our curated selection of grants available for individuals and startups
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGrants.map((grant, index) => (
                <div key={grant.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <GrantCard {...grant} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="default" size="lg">
                <Link to="/grants">View All Grants <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Three simple steps to secure funding for your ideas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full gradient-accent">
                    <step.icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hear from those who've transformed their ideas into reality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-card p-6 rounded-lg shadow-custom-md hover:shadow-custom-lg transition-smooth animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                    <span className="text-sm font-semibold text-secondary">Funded</span>
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of innovators and entrepreneurs who've secured funding through GrantConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90">
                <Link to="/grants">Browse Grants</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
