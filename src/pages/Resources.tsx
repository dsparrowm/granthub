import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import grantsIllustration from "@/assets/grants-illustration.jpg";

const Resources = () => {
  const articles = [
    {
      id: 1,
      title: "10 Tips for Writing a Winning Grant Proposal",
      category: "Grant Writing",
      date: "Oct 15, 2025",
      excerpt: "Learn the essential elements that make grant proposals stand out to reviewers and increase your chances of funding success.",
      image: grantsIllustration,
    },
    {
      id: 2,
      title: "Success Story: How TechStart Secured $100K in Funding",
      category: "Success Stories",
      date: "Oct 10, 2025",
      excerpt: "Read about TechStart's journey from idea to funded startup and the strategies that helped them win multiple grants.",
      image: grantsIllustration,
    },
    {
      id: 3,
      title: "Understanding Grant Eligibility Requirements",
      category: "Grant Basics",
      date: "Oct 5, 2025",
      excerpt: "A comprehensive guide to understanding and meeting grant eligibility criteria for different types of funding opportunities.",
      image: grantsIllustration,
    },
    {
      id: 4,
      title: "Building a Strong Project Budget for Grant Applications",
      category: "Grant Writing",
      date: "Sep 28, 2025",
      excerpt: "Master the art of creating detailed, realistic budgets that demonstrate fiscal responsibility and project viability.",
      image: grantsIllustration,
    },
    {
      id: 5,
      title: "The Importance of Impact Measurement in Grant Projects",
      category: "Best Practices",
      date: "Sep 20, 2025",
      excerpt: "Learn how to define, track, and report on project outcomes to satisfy funders and improve future applications.",
      image: grantsIllustration,
    },
    {
      id: 6,
      title: "Common Grant Application Mistakes to Avoid",
      category: "Grant Writing",
      date: "Sep 15, 2025",
      excerpt: "Discover the most common pitfalls in grant applications and how to avoid them for a stronger submission.",
      image: grantsIllustration,
    },
  ];

  const categories = ["All", "Grant Writing", "Success Stories", "Grant Basics", "Best Practices"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Resources & Blog
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Tips, guides, and success stories to help you succeed in your grant journey
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-card shadow-custom-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={category === "All" ? "default" : "secondary"}
                  className="cursor-pointer hover:opacity-80 transition-opacity px-4 py-2"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-lg shadow-custom-lg overflow-hidden animate-fade-in">
                <div className="order-2 lg:order-1 p-8 flex flex-col justify-center">
                  <Badge className="bg-accent text-accent-foreground w-fit mb-4">Featured</Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    {articles[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {articles[0].excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <Calendar className="mr-2 h-4 w-4" />
                    {articles[0].date}
                  </div>
                  <Button className="w-fit">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="order-1 lg:order-2">
                  <img 
                    src={articles[0].image} 
                    alt={articles[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(1).map((article, index) => (
                  <Card 
                    key={article.id} 
                    className="gradient-card shadow-custom-md hover:shadow-custom-lg transition-smooth group animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="overflow-hidden rounded-t-lg">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          {article.date}
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 gradient-accent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
              Stay Informed
            </h2>
            <p className="text-secondary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest tips, success stories, and funding opportunities
            </p>
            <Button size="lg" className="bg-card text-primary hover:bg-card/90">
              Subscribe Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
