import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight, Newspaper } from "lucide-react";

const NewsEvents = () => {
    const news = [
        {
            id: 1,
            title: "Global Innovation Fund Announces New Climate Track",
            category: "Funding News",
            date: "Nov 18, 2025",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
            excerpt: "A new $10M fund dedicated to supporting startups working on carbon capture and renewable energy solutions.",
        },
        {
            id: 2,
            title: "Success Story: How GreenTech Solutions Scaled to 5 Countries",
            category: "Impact Stories",
            date: "Nov 15, 2025",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
            excerpt: "From a small garage in Nairobi to a multinational enterprise, read about their journey with NovaGrants.",
        },
        {
            id: 3,
            title: "2026 Grant Application Guidelines Released",
            category: "Announcements",
            date: "Nov 10, 2025",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
            excerpt: "Everything you need to know about the upcoming grant cycle, including new eligibility criteria and deadlines.",
        },
    ];

    const events = [
        {
            id: 1,
            title: "Grant Writing Workshop: Mastering the Narrative",
            date: "Dec 05, 2025",
            time: "10:00 AM - 12:00 PM EST",
            location: "Virtual (Zoom)",
            type: "Workshop",
        },
        {
            id: 2,
            title: "Annual Innovators Summit 2025",
            date: "Jan 15-17, 2026",
            time: "09:00 AM - 05:00 PM EST",
            location: "New York City, NY",
            type: "Conference",
        },
        {
            id: 3,
            title: "Q&A Session with Program Directors",
            date: "Dec 12, 2025",
            time: "02:00 PM - 03:30 PM EST",
            location: "Virtual (Zoom)",
            type: "Webinar",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden bg-muted/30">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
                            Stay Updated
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                            News & <span className="text-primary">Events</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Discover the latest updates, success stories, and upcoming opportunities to connect with the NovaGrants community.
                        </p>
                    </div>
                </section>

                {/* Latest News */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold">Latest News</h2>
                            <Button variant="ghost" className="hidden sm:flex">
                                View All News <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {news.map((item) => (
                                <Card key={item.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-background/90 text-foreground hover:bg-background/100 backdrop-blur-sm">
                                                {item.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="text-sm text-muted-foreground mb-3">{item.date}</div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0">
                                        <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-8 text-center sm:hidden">
                            <Button variant="outline" className="w-full">View All News</Button>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
                                <p className="text-muted-foreground">Join us for workshops, webinars, and conferences.</p>
                            </div>
                            <Button variant="outline" className="hidden sm:flex">
                                View Calendar
                            </Button>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Featured Event (Left 2/3 on large screens) */}
                            <div className="lg:col-span-2 bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-80 group-hover:opacity-90 transition-opacity duration-500 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/40 to-primary/20" />
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <Badge className="bg-white/20 text-white hover:bg-white/30 border-none mb-6">Featured Event</Badge>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Annual Innovators Summit 2025</h3>
                                    <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl">
                                        Join over 500+ social entrepreneurs, investors, and policymakers for three days of networking, learning, and collaboration in New York City.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 opacity-80" />
                                            <span className="font-medium">Jan 15-17, 2026</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 opacity-80" />
                                            <span className="font-medium">New York City, NY</span>
                                        </div>
                                    </div>

                                    <Button size="lg" variant="secondary" className="self-start">
                                        Register Now
                                    </Button>
                                </div>
                            </div>

                            {/* Event List (Right 1/3) */}
                            <div className="space-y-6">
                                {events.filter(e => e.id !== 2).map((event) => (
                                    <Card key={event.id} className="border-none shadow-md hover:shadow-lg transition-all">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <Badge variant="outline" className="text-xs font-normal">
                                                    {event.type}
                                                </Badge>
                                                <div className="text-center bg-muted rounded-lg p-2 min-w-[60px]">
                                                    <div className="text-xs font-bold text-muted-foreground uppercase">{event.date.split(' ')[0]}</div>
                                                    <div className="text-xl font-bold text-primary">{event.date.split(' ')[1].replace(',', '')}</div>
                                                </div>
                                            </div>

                                            <h4 className="text-lg font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                                                {event.title}
                                            </h4>

                                            <div className="space-y-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>

                                            <Button variant="outline" size="sm" className="w-full mt-4">
                                                Details & RSVP
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}

                                <Card className="border-dashed border-2 shadow-none bg-transparent flex items-center justify-center p-6 h-[180px]">
                                    <div className="text-center">
                                        <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                        <p className="text-muted-foreground font-medium">More events coming soon</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />

                            <div className="relative z-10 max-w-2xl mx-auto">
                                <Newspaper className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" />
                                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                                    Stay in the Loop
                                </h2>
                                <p className="text-primary-foreground/80 text-lg mb-8">
                                    Subscribe to our newsletter to get the latest funding opportunities, success stories, and event invitations delivered to your inbox.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="flex-1 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder:text-white/60 backdrop-blur-sm"
                                    />
                                    <Button size="lg" variant="secondary" className="whitespace-nowrap">
                                        Subscribe
                                    </Button>
                                </div>
                                <p className="text-xs text-primary-foreground/60 mt-4">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default NewsEvents;
