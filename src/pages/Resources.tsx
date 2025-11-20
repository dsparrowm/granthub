import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ArrowRight, Search, BookOpen, TrendingUp, Users, Mail } from "lucide-react";
import heroImage from "@/assets/hero-collaboration.jpg";
import { articles } from "@/data/articles";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Grant Writing", "Success Stories", "Grant Basics", "Best Practices"];

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter(article => article.category === activeCategory);

  const featuredArticle = articles[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Modern Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Resources Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1 text-sm">
                Resource Hub
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Insights for Your <br className="hidden md:block" />
                <span className="text-primary">Funding Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Expert guides, success stories, and practical tips to help you navigate the world of grants and secure funding for your vision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
                  />
                </div>
                <Button size="lg" className="h-12 px-8">Search</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories & Content */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Category Tabs */}
            <div className="mb-12 overflow-x-auto pb-2">
              <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
                <TabsList className="h-12 bg-background/50 backdrop-blur-sm border p-1 gap-1 inline-flex w-auto min-w-full sm:min-w-0 justify-start">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm transition-all"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Featured Article (Only show on 'All' view) */}
            {activeCategory === "All" && (
              <div className="mb-16 animate-fade-in">
                <div className="group relative overflow-hidden rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-md border-none">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {featuredArticle.date}</span>
                        <span>•</span>
                        <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> {featuredArticle.readTime}</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {featuredArticle.author.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{featuredArticle.author}</span>
                        </div>
                        <Button variant="ghost" className="group/btn" asChild>
                          <Link to={`/resources/${featuredArticle.id}`}>
                            Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeCategory === "All" ? filteredArticles.slice(1) : filteredArticles).map((article, index) => (
                <Card
                  key={article.id}
                  className="group flex flex-col border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-card overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 pb-4">
                    <CardDescription className="line-clamp-3 text-base">
                      {article.excerpt}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="pt-0 border-t bg-muted/10 p-4 mt-auto">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-medium text-muted-foreground">By {article.author}</span>
                      <span className="text-sm font-medium text-primary flex items-center group-hover:translate-x-1 transition-transform cursor-pointer">
                        <Link to={`/resources/${article.id}`} className="flex items-center">
                          Read <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-primary-foreground/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-6">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
                  <p className="text-primary-foreground/80 text-lg leading-relaxed">
                    Get the latest grant opportunities, expert tips, and success stories delivered directly to your inbox every week.
                  </p>
                  <div className="flex items-center gap-4 mt-6 text-sm text-primary-foreground/60">
                    <span className="flex items-center"><Users className="w-4 h-4 mr-2" /> 10k+ Subscribers</span>
                    <span className="flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> Weekly Updates</span>
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <label className="text-sm font-medium ml-1">Email Address</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="bg-white/90 border-0 text-foreground h-12"
                      />
                    </div>
                    <Button size="lg" className="w-full h-12 bg-white text-primary hover:bg-white/90 font-semibold">
                      Subscribe Now
                    </Button>
                    <p className="text-xs text-center text-primary-foreground/60 mt-4">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
