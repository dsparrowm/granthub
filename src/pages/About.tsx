import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, ArrowRight, CheckCircle2, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We exist to democratize access to funding and empower innovators worldwide.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Eye,
      title: "Transparent",
      description: "We believe in clear communication and honest processes throughout the grant lifecycle.",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Heart,
      title: "Impact-Focused",
      description: "Every grant we facilitate is chosen for its potential to create meaningful change.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      icon: Users,
      title: "Community-Centered",
      description: "We build lasting relationships with grantees, funders, and partners.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Executive Director",
      bio: "15+ years in nonprofit management and social entrepreneurship.",
      initials: "SM",
    },
    {
      name: "James Chen",
      role: "Director of Programs",
      bio: "Expert in grant management with background in venture capital.",
      initials: "JC",
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Partnerships",
      bio: "Former corporate social responsibility leader at Fortune 500 company.",
      initials: "MR",
    },
    {
      name: "David Kim",
      role: "Technology Director",
      bio: "Tech entrepreneur passionate about leveraging technology for social good.",
      initials: "DK",
    },
  ];

  const stats = [
    { number: "500+", label: "Grants Facilitated" },
    { number: "$50M+", label: "Funding Distributed" },
    { number: "35+", label: "Countries Reached" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
                Established 2018
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8">
                Empowering the next generation of <span className="text-primary">changemakers</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                We connect innovators, entrepreneurs, and visionaries with the resources they need to transform ideas into reality and create meaningful global impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="h-12 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Link to="/grants">
                    Explore Grants <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-2">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="py-8 text-center px-4">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Split */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-2xl -z-10" />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs hidden lg:block">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Global Reach</p>
                      <p className="text-xs text-muted-foreground">Supporting ideas everywhere</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    NovaGrants was founded with a simple yet powerful vision: to democratize access to funding. We believe that great ideas shouldn't fail due to lack of capital, and that passionate individuals deserve support to bring their visions to life.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Innovation First</h3>
                      <p className="text-muted-foreground">Prioritizing breakthrough ideas that challenge the status quo.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-secondary/10 p-2 rounded-lg">
                      <ShieldCheck className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Trust & Integrity</h3>
                      <p className="text-muted-foreground">Building a transparent ecosystem for funders and grantees.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Funding Works - Modern Cards */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Sustainable Model</h2>
              <p className="text-muted-foreground text-lg">
                We operate with transparency to ensure the platform remains accessible and impactful for years to come.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-none shadow-lg bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Operational Sustainability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To maintain our platform, staff, and application processing, we collect a small application fee calculated based on the requested grant amount. This fee is strictly for operational costs and is never part of the grant funding itself.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">The Pay-It-Forward Pledge</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Recipients who successfully receive funding are asked to return 30% of the grant amount after two years. These returned funds are directly re-distributed to new grantees, creating a revolving pool of impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Values</h2>
              <p className="text-muted-foreground">The principles that guide our every decision</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${value.bg} ${value.color}`}>
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}



      </main>

      <Footer />
    </div>
  );
};

export default About;
