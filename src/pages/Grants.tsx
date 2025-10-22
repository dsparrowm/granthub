import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrantCard from "@/components/GrantCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Grants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const allGrants = [
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
    {
      id: "4",
      title: "Green Energy Grant",
      organization: "Environmental Coalition",
      amount: "$100,000",
      deadline: "Feb 28, 2026",
      location: "Europe",
      category: "Environment",
      description: "Supporting renewable energy projects and sustainable solutions for climate change.",
    },
    {
      id: "5",
      title: "Healthcare Innovation Fund",
      organization: "Health Alliance",
      amount: "$60,000",
      deadline: "Dec 15, 2025",
      location: "United States",
      category: "Healthcare",
      description: "Advancing healthcare technology and improving patient outcomes through innovation.",
    },
    {
      id: "6",
      title: "Education Excellence Grant",
      organization: "Education First Foundation",
      amount: "$40,000",
      deadline: "Nov 30, 2025",
      location: "Global",
      category: "Education",
      description: "Supporting educational initiatives that improve learning outcomes and accessibility.",
    },
  ];

  const filteredGrants = allGrants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grant.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || grant.category === categoryFilter;
    const matchesLocation = locationFilter === "all" || grant.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Discover Grant Opportunities
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Search through hundreds of funding opportunities to find the perfect grant for your project
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-card shadow-custom-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search grants by title, organization, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Social Good">Social Good</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Global">Global</SelectItem>
                  <SelectItem value="Worldwide">Worldwide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredGrants.length} of {allGrants.length} grants
            </div>
          </div>
        </section>

        {/* Grants Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGrants.map((grant) => (
                <GrantCard key={grant.id} {...grant} />
              ))}
            </div>

            {filteredGrants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No grants found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Grants;
