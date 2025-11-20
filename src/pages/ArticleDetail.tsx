import { useParams, Link, useNavigate } from "react-router-dom";
import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter, Facebook, Link as LinkIcon, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);

    const article = articles.find(a => a.id === Number(id));
    const relatedArticles = articles
        .filter(a => a.category === article?.category && a.id !== article?.id)
        .slice(0, 2);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!article) {
            // Optional: Redirect to resources or show 404 component
            // navigate("/resources");
        }
        window.scrollTo(0, 0);
    }, [article, navigate]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
    };

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-8">
                    <h1 className="text-2xl font-bold mb-4">Article not found</h1>
                    <Button asChild>
                        <Link to="/resources">Back to Resources</Link>
                    </Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-50 bg-muted">
                <div
                    className="h-full bg-primary transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            <Header />

            <main className="flex-1 pb-20">
                {/* Article Header Section */}
                <section className="pt-12 pb-8 md:pt-16 md:pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <Link
                            to="/resources"
                            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors text-sm font-medium group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Resources
                        </Link>

                        <div className="space-y-6">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 text-sm font-medium">
                                {article.category}
                            </Badge>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                                {article.title}
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {article.excerpt}
                            </p>

                            <div className="flex items-center justify-between py-6 border-y border-border/50">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${article.author}`} />
                                        <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{article.author}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center">
                                                <Calendar className="mr-1 h-3 w-3" />
                                                {article.date}
                                            </span>
                                            <span className="flex items-center">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {article.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleShare}>
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                        <Bookmark className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hero Image */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="max-w-4xl mx-auto aspect-video relative rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </section>

                {/* Article Content */}
                <article className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-12">
                            {/* Social Sidebar (Desktop) */}
                            <div className="hidden md:flex flex-col gap-4 sticky top-24 h-fit">
                                <Button variant="outline" size="icon" className="rounded-full hover:text-[#1DA1F2] hover:border-[#1DA1F2]" onClick={() => toast.info("Shared to Twitter")}>
                                    <Twitter className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full hover:text-[#0A66C2] hover:border-[#0A66C2]" onClick={() => toast.info("Shared to LinkedIn")}>
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full hover:text-[#1877F2] hover:border-[#1877F2]" onClick={() => toast.info("Shared to Facebook")}>
                                    <Facebook className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full" onClick={handleShare}>
                                    <LinkIcon className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Main Content */}
                            <div
                                className="prose prose-lg prose-slate dark:prose-invert max-w-none flex-1
                                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                                    prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6
                                    prose-ul:my-6 prose-li:mb-2 prose-li:text-muted-foreground
                                    prose-strong:text-foreground prose-strong:font-semibold
                                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                    prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </div>

                        {/* Author Bio Box */}
                        <div className="mt-16 p-8 bg-muted/30 rounded-2xl border border-border/50">
                            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                                <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${article.author}`} />
                                    <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-lg font-bold text-foreground">About {article.author}</h3>
                                    <p className="text-muted-foreground">
                                        Senior Grant Specialist and contributing editor at GrantHub. Passionate about helping organizations secure the funding they need to make a difference.
                                    </p>
                                    <Button variant="link" className="p-0 h-auto text-primary">
                                        View all articles by {article.author}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedArticles.map((related) => (
                                    <Link key={related.id} to={`/resources/${related.id}`} className="group">
                                        <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 bg-card overflow-hidden">
                                            <div className="flex flex-col h-full">
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={related.image}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                                <CardContent className="p-6 flex-1 flex flex-col">
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                                        <Badge variant="secondary" className="text-xs font-normal">
                                                            {related.category}
                                                        </Badge>
                                                        <span>•</span>
                                                        <span>{related.readTime}</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                        {related.title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                                                        {related.excerpt}
                                                    </p>
                                                    <div className="flex items-center text-sm font-medium text-primary mt-auto">
                                                        Read Article <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </CardContent>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ArticleDetail;
