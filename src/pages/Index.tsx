import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, FileText, Award, ArrowRight, CheckCircle, DollarSign } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrantCard from "@/components/GrantCard";
import { getAllGrants } from "@/services/grantsData";
import heroImage from "@/assets/Hero-Home.png";
import heroMobile from "@/assets/Hero-mobile.png";
import newsImg1 from "@/assets/ceo-image.png";
import newsImg2 from "@/assets/hero-collaboration.jpg";
import newsImg3 from "@/assets/community-image.png";
// Use the bundled `heroImage` as the hero background. The `gradient-hero` overlay remains as a
// visual fallback/overlay.

const Index = () => {
  // Get grants from centralized service
  const allGrants = getAllGrants();
  const featuredGrants = allGrants.slice(0, 3);

  // small helper: sort grants by deadline (earliest first) for "Closing soon"
  const soonGrants = [...featuredGrants]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

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
      content: "NovaGrants helped me secure $75,000 in funding for my AI startup. The platform made the entire process seamless!",
    },
    {
      name: "Michael Chen",
      role: "Social Entrepreneur",
      content: "Thanks to NovaGrants, our community project received the funding it needed. Their support was invaluable.",
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
          {/* Desktop / tablet background (hidden on small screens) */}
          <div
            className="hidden md:absolute md:inset-0 md:bg-cover md:bg-center md:block"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden
          />
          {/* Mobile background (visible only on small screens) */}
          <div
            className="absolute inset-0 bg-cover bg-center md:hidden"
            style={{ backgroundImage: `url(${heroMobile})` }}
            aria-hidden
          />
          {/* Mobile overlay so text remains readable on small screens */}
          <div className="absolute inset-0 md:hidden pointer-events-none" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </div>
          {/* Reduce overlay opacity so background image remains visible */}
          {/* <div className="absolute inset-0 gradient-hero opacity-30" /> */}

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 lg:py-48">
            <div className="max-w-3xl mx-auto md:mx-0 text-left text-white/80 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight transform -translate-y-3 md:-translate-y-6 lg:-translate-y-8">
                <span className="block">Empowering Ideas</span>
                <span className="block mt-4">Through Grants</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
                Discover funding opportunities and resources for individuals and startups. Search, apply, and get funded.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button asChild variant="outline" size="lg" className="bg-primary-foreground text-primary">
                  <Link to="/grants">Search Grants <ArrowRight className="ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/apply">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile inline search (visible on small screens so users can start searching immediately) */}
          <div className="md:hidden container mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search grants..."
                className="w-full px-4 py-3 pr-10 border border-input rounded-md bg-background text-sm focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* How we help — News / Success cards (overlapping hero) */}
        <section className="relative -mt-12 md:-mt-20 z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { img: newsImg1, title: "Seed Funding Success", desc: "Early-stage grants that helped a founder take product to market and secure follow-on investment." },
                { img: newsImg2, title: "Scaling Small Businesses", desc: "Targeted grants enabled small businesses to expand operations and hire local talent." },
                { img: newsImg3, title: "Social Impact Grants", desc: "Community projects that converted grant awards into ongoing revenue and social programs." },
              ].map((card, i) => (
                <article key={i} className="relative z-30 bg-card rounded-xl overflow-hidden shadow-custom-md hover:shadow-custom-lg transition-transform transform hover:-translate-y-1">
                  <img src={card.img} alt={card.title} className="w-full h-44 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.desc}</p>
                    {/* Extra content to increase card height */}
                    <p className="mt-3 text-sm text-muted-foreground">
                      Our grants are paired with mentoring, capacity building and access to networks — a combination that helps recipients scale revenue and build resilient organizations.
                    </p>
                    <ul className="mt-3 text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Seed funding to validate product-market fit</li>
                      <li>Operational support for hiring and marketing</li>
                      <li>Long-term partnerships that unlock follow-on capital</li>
                    </ul>
                    <div className="mt-4">
                      <a href="#" className="text-sm font-semibold text-primary hover:underline">Read case study →</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Transform section - dark background with colorful images */}
        <section className="py-16 md:py-24 bg-[#0b2545] text-white mt-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Transform Your Business: Access Capital, Contracts, and Markets with GrantHub's National Network
                </h2>
                <p className="text-white/70 mb-6">
                  Leverage specialized grant programs, procurement pathways, and market access support to grow revenue, win contracts, and scale sustainably. Our network connects you to capital and partners tailored to your business goals.
                </p>
                <div className="flex gap-4">
                  <Button asChild size="default" className="gradient-accent text-white">
                    <a href="#">Learn how we help</a>
                  </Button>
                  <Button asChild variant="outline" size="default" className="border-white text-white">
                    <a href="#">Contact our network</a>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <img src={newsImg1} alt="Grant illustration" className="w-full h-40 object-cover rounded-lg shadow-lg" />
                <img src={newsImg2} alt="Collaboration" className="w-full h-40 object-cover rounded-lg shadow-lg" />
                <img src={newsImg3} alt="Team photo" className="w-full h-40 object-cover rounded-lg shadow-lg col-span-2 md:col-span-1" />
                <img src={heroImage} alt="Access to markets" className="w-full h-40 object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Grants (with closing-soon box) */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between mb-8">
              <div className="text-left mb-6 md:mb-0 animate-slide-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Grant Opportunities</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Explore our curated selection of grants available for individuals and startups
                </p>
              </div>

              <div className="hidden md:block">
                <div className="bg-card p-3 rounded-md text-sm w-64">
                  <h4 className="font-semibold mb-2">Closing soon</h4>
                  {soonGrants.map((g) => (
                    <div key={g.id} className="mb-2">
                      <div className="font-medium">{g.title}</div>
                      <div className="text-muted-foreground text-sm">{g.deadline}</div>
                    </div>
                  ))}
                  <div className="mt-2">
                    <Link to="/grants" className="text-primary text-sm font-medium">See all deadlines →</Link>
                  </div>
                </div>
              </div>
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

        {/* How to Apply - step-by-step */}
        <section className="py-12 bg-muted/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold">How to Apply</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">A quick, step-by-step guide to find, prepare, and submit successful grant applications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-card p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-white">
                  <Search className="h-5 w-5" />
                </div>
                <h4 className="font-semibold mb-2">1. Search & Discover</h4>
                <p className="text-sm text-muted-foreground">Find grants that match your sector and stage.</p>
              </div>

              <div className="bg-card p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <h4 className="font-semibold mb-2">2. Check Eligibility</h4>
                <p className="text-sm text-muted-foreground">Confirm requirements and prepare supporting documents.</p>
              </div>

              <div className="bg-card p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-white">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="font-semibold mb-2">3. Complete Application</h4>
                <p className="text-sm text-muted-foreground">Follow the application instructions and attach required files.</p>
              </div>

              <div className="bg-card p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-white">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h4 className="font-semibold mb-2">4. Submit & Follow Up</h4>
                <p className="text-sm text-muted-foreground">Submit before the deadline and track progress through your dashboard.</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/apply">Start an application</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Who can apply for grants?</AccordionTrigger>
                <AccordionContent>
                  Most grants are open to organizations and individuals that match the eligibility criteria listed on each opportunity. Check the "Eligibility" section on the grant detail page.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What documents do I need?</AccordionTrigger>
                <AccordionContent>
                  Typical documents include a project summary, budget, proof of organization registration, and CVs of key personnel. Exact requirements are listed per grant.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>When will I hear back?</AccordionTrigger>
                <AccordionContent>
                  Review timelines vary. If awarded, you will be notified by email; timelines are noted in the grant listing under "Decision date".
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What are the application fees?</AccordionTrigger>
                <AccordionContent>
                  Application fees range from $500 to $2,000 depending on the grant amount requested. These fees help cover administrative costs and ensure serious, qualified applicants. The fee is non-refundable and must be paid when submitting your application.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Is there a repayment requirement?</AccordionTrigger>
                <AccordionContent>
                  Yes. Recipients are required to return 25% of the grant amount after 2 years. This repayment model allows us to sustain the program and fund future entrepreneurs while keeping most of the funding non-dilutive for you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Grant Terms & Conditions Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Understanding Our Grant Terms</h2>
                <p className="text-muted-foreground text-lg">
                  Transparent funding with fair terms designed to support your growth
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Application Fee Card */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-full bg-blue-100">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle>Application Fees</CardTitle>
                    </div>
                    <CardDescription>
                      One-time, non-refundable fee to process your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">$250K - $500K grants</span>
                        <span className="font-semibold">$500</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">$500K - $1M grants</span>
                        <span className="font-semibold">$750</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">$1M - $2.5M grants</span>
                        <span className="font-semibold">$1,250</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">$2.5M - $5M grants</span>
                        <span className="font-semibold">$2,000</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>Why we charge:</strong> Application fees cover administrative costs, thorough review processes, and help ensure we receive serious applications from qualified candidates.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Repayment Terms Card */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-full bg-green-100">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle>Repayment Terms</CardTitle>
                    </div>
                    <CardDescription>
                      Fair and flexible repayment to sustain the program
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-center mb-3">
                          <div className="text-4xl font-bold text-green-900">25%</div>
                          <div className="text-sm text-green-700">of grant amount</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-900">2 Years</div>
                          <div className="text-sm text-green-700">after receiving funds</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">No monthly payments or interest charges</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">Keep 75% of funding with no equity dilution</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">Helps us fund the next generation of innovators</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-900">
                        <strong>Example:</strong> If you receive a $1M grant, you'll repay $250K after 2 years, keeping $750K to grow your business.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Questions About Our Terms?</h3>
                  <p className="text-muted-foreground mb-4">
                    Our team is here to help you understand the application process and grant terms.
                  </p>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
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
              Join thousands of innovators and entrepreneurs who've secured funding through NovaGrants
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
