import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users } from "lucide-react";
import teamPhoto from "@/assets/image.png";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We exist to democratize access to funding and empower innovators worldwide.",
    },
    {
      icon: Eye,
      title: "Transparent",
      description: "We believe in clear communication and honest processes throughout the grant lifecycle.",
    },
    {
      icon: Heart,
      title: "Impact-Focused",
      description: "Every grant we facilitate is chosen for its potential to create meaningful change.",
    },
    {
      icon: Users,
      title: "Community-Centered",
      description: "We build lasting relationships with grantees, funders, and partners.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Executive Director",
      bio: "15+ years in nonprofit management and social entrepreneurship",
    },
    {
      name: "James Chen",
      role: "Director of Programs",
      bio: "Expert in grant management with background in venture capital",
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Partnerships",
      bio: "Former corporate social responsibility leader at Fortune 500 company",
    },
    {
      name: "David Kim",
      role: "Technology Director",
      bio: "Tech entrepreneur passionate about leveraging technology for social good",
    },
  ];

  const stats = [
    { number: "500+", label: "Grants Facilitated" },
    { number: "$50M+", label: "Funding Distributed" },
    { number: "35+", label: "Countries Reached" },
    { number: "95%", label: "Success Rate" },
  ];

  const partners = [
    "Global Innovation Fund",
    "Tech Foundation",
    "Green Future Initiative",
    "Education First",
    "Health Alliance",
    "Social Impact Ventures",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-background">
          <div className="absolute inset-0 gradient-hero opacity-10" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Left Column - Content */}
              <div className="animate-fade-in">
                <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
                  <span className="text-sm font-semibold text-secondary">Since 2018</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Democratizing Access to{" "}
                  <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Funding
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                  We connect innovators, entrepreneurs, and changemakers with the resources they need to transform ideas into reality and create meaningful impact worldwide.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="shadow-elegant">
                    <Link to="/grants">Explore Grants</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>

              {/* Right Column - Image & Stats Overlay */}
              <div className="relative animate-scale-in">
                <div className="relative rounded-2xl overflow-hidden shadow-custom-xl">
                  <img
                    src={teamPhoto}
                    alt="GrantConnect team collaborating on funding initiatives"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-custom-lg border border-border animate-slide-up">
                  <div className="text-4xl font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Grants Facilitated</div>
                </div>

                <div className="absolute -top-6 -right-6 bg-card p-6 rounded-xl shadow-custom-lg border border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
                  <div className="text-4xl font-bold text-secondary mb-1">$50M+</div>
                  <div className="text-sm text-muted-foreground">Funding Distributed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="animate-slide-up">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  GrantConnect was founded in 2018 with a simple yet powerful vision: to democratize access to funding for innovators, entrepreneurs, and changemakers. We believe that great ideas shouldn't fail due to lack of funding, and that passionate individuals deserve support to bring their visions to life.
                </p>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where every innovator has access to the resources they need to succeed. Through our platform, we're building a global community of funded changemakers who are solving the world's most pressing challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 gradient-accent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-secondary-foreground/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-custom-md hover:shadow-custom-lg transition-smooth animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg gradient-accent">
                    <value.icon className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Meet the passionate individuals driving our mission forward
              </p>
            </div>

            <div className="mb-12">
              <img
                src={teamPhoto}
                alt="GrantConnect leadership team"
                className="w-full max-w-4xl mx-auto rounded-lg shadow-custom-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-custom-md text-center animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Collaborating with leading organizations to maximize impact
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-card p-4 rounded-lg shadow-custom-sm hover:shadow-custom-md transition-smooth flex items-center justify-center text-center animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="text-sm font-medium text-muted-foreground">{partner}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Join Our Mission
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're seeking funding or want to support innovators, we'd love to have you in our community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90">
                <Link to="/grants">Explore Grants</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
