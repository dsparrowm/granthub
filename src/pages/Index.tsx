import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Search, FileText, Award, ArrowRight, CheckCircle, DollarSign, Quote, Clock, TrendingUp } from "lucide-react";
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
  const featuredGrants = allGrants.slice(0, 4);

  // small helper: sort grants by deadline (earliest first) for "Closing soon"
  const soonGrants = [...allGrants]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4);

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
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      content: "NovaGrants helped me secure $75,000 in funding for my AI startup. The platform made the entire process seamless!",
      grant: "Tech Innovation Fund"
    },
    {
      name: "Michael Chen",
      role: "Social Entrepreneur",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      content: "Thanks to NovaGrants, our community project received the funding it needed. Their support was invaluable.",
      grant: "Community Impact Grant"
    },
    {
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
      content: "I discovered grants I never knew existed. The platform is user-friendly and the results speak for themselves.",
      grant: "Small Business Growth"
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
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000')` }}
            aria-hidden
          />
          {/* Mobile background (visible only on small screens) */}
          <div
            className="absolute inset-0 bg-cover bg-center md:hidden"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800')` }}
            aria-hidden
          />
          {/* Gradient overlay: Darker on left for text, lighter on right for image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70ack/50 to-transparent" aria-hidden />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 lg:py-48">
            <div className="max-w-3xl mx-auto md:mx-0 text-left text-white animate-fade-in relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight transform -translate-y-3 md:-translate-y-6 lg:-translate-y-8 drop-shadow-md">
                <span className="block">Empowering Ideas</span>
                <span className="block mt-4">Through Grants</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-sm">
                Discover funding opportunities and resources for individuals and startups. Search, apply, and get funded.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button asChild variant="outline" size="lg" className="bg-primary-foreground text-primary">
                  <Link to="/grants">Search Grants <ArrowRight className="ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/grants">Apply Now</Link>
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
                <img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80" alt="Financial Growth" className="w-full h-40 object-cover rounded-lg shadow-lg" />
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" alt="Strategic Partnerships" className="w-full h-40 object-cover rounded-lg shadow-lg" />
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Market Analytics" className="w-full h-40 object-cover rounded-lg shadow-lg col-span-2 md:col-span-1" />
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Network Connections" className="w-full h-40 object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Grants (with closing-soon box) */}
        <section className="py-24 bg-background relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">

              {/* Main Content - Featured Grants */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <Badge variant="outline" className="mb-2 border-primary/20 text-primary">Opportunities</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold">Featured Grants</h2>
                    <p className="text-muted-foreground mt-2">Curated funding opportunities for your next big idea.</p>
                  </div>
                  <Button asChild variant="ghost" className="hidden md:flex group">
                    <Link to="/grants">View all <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredGrants.map((grant, index) => (
                    <div key={grant.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <GrantCard {...grant} />
                    </div>
                  ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/grants">View all grants</Link>
                  </Button>
                </div>
              </div>

              {/* Sidebar - Closing Soon & Categories */}
              <div className="lg:w-80 space-y-6">
                {/* Closing Soon Card */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4 text-amber-600">
                    <Clock className="h-5 w-5" />
                    <h3 className="font-bold">Closing Soon</h3>
                  </div>
                  <div className="space-y-4">
                    {soonGrants.map((g) => (
                      <Link key={g.id} to={`/grants/${g.id}`} className="block group">
                        <div className="p-3 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors">
                          <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">{g.title}</h4>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <span>{g.organization}</span>
                            <span className="text-amber-600 font-medium">{g.deadline}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button asChild variant="link" className="w-full mt-2 text-muted-foreground hover:text-primary">
                    <Link to="/grants">View calendar</Link>
                  </Button>
                </div>

                {/* Quick Stats or Info */}
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <TrendingUp className="h-5 w-5" />
                    <h3 className="font-bold">Grant Trends</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tech and Green Energy grants are seeing a 40% increase in funding this quarter.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tech Innovation</span>
                      <span className="font-bold">32 Active</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
              </div>

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
                <Link to="/grants">Start an application</Link>
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
        <section className="py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Transparent & Fair Terms</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  We believe in clear, upfront communication. Our funding model is designed to be sustainable for us and transformative for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Application Fee Card */}
                <div className="group relative bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl" />

                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Application Fees</h3>
                    <p className="text-muted-foreground">A one-time processing fee to ensure serious applicants and cover administrative review.</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      { range: "$250K - $500K", fee: "$500" },
                      { range: "$500K - $1M", fee: "$750" },
                      { range: "$1M - $2.5M", fee: "$1,250" },
                      { range: "$2.5M - $5M", fee: "$2,000" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                        <span className="text-sm font-medium text-muted-foreground">{item.range}</span>
                        <span className="font-bold text-foreground">{item.fee}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Note:</span> Fees are non-refundable and strictly cover the operational costs of our rigorous review process.
                  </div>
                </div>

                {/* Repayment Terms Card */}
                <div className="group relative bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl" />

                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                      <Award className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Repayment Model</h3>
                    <p className="text-muted-foreground">A founder-friendly approach that keeps equity in your hands while sustaining the ecosystem.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-green-500/5 rounded-xl p-4 text-center border border-green-500/10">
                      <div className="text-3xl font-bold text-green-600 mb-1">25%</div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Repayment</div>
                    </div>
                    <div className="bg-green-500/5 rounded-xl p-4 text-center border border-green-500/10">
                      <div className="text-3xl font-bold text-green-600 mb-1">2 Years</div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Grace Period</div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      "No equity dilution – you keep full ownership",
                      "No monthly payments or interest charges",
                      "Funds are reinvested to support new grantees"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      <strong>Example:</strong> For a $1M grant, you repay $250K after 2 years. You keep $750K debt-free.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center">
                <p className="text-muted-foreground mb-6">Have specific questions about your eligibility or terms?</p>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/contact">Talk to our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Redesigned */}
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary">Simple Process</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">From Idea to Funding</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                We've streamlined the grant process to help you focus on what matters most—your innovation.
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {howItWorks.map((step, index) => (
                  <div key={index} className="group relative flex flex-col items-center text-center">
                    {/* Step Number/Icon Container */}
                    <div className="relative z-10 mb-8 transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="w-24 h-24 rounded-2xl bg-background border border-border shadow-lg flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <step.icon className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background px-3 py-1 rounded-full border border-border text-xs font-bold text-muted-foreground shadow-sm">
                        Step 0{index + 1}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button asChild size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all">
                <Link to="/grants">Start Your Journey</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-muted/20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Real Impact</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join the community of innovators who have transformed their vision into reality with our support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                    <Quote className="h-12 w-12" />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="mb-6 relative z-10">
                    <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                  </div>

                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center text-sm font-medium text-primary">
                      <Award className="h-4 w-4 mr-2" />
                      {testimonial.grant}
                    </div>
                    <Badge variant="outline" className="bg-green-500/5 text-green-600 border-green-200 hover:bg-green-500/10">
                      Funded
                    </Badge>
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
