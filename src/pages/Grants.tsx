import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrantCard from "@/components/GrantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { getAllGrants } from "@/services/grantsData";

const Grants = () => {
  const allGrants = getAllGrants();

  // Extract unique values for filters
  const categories = Array.from(new Set(allGrants.map(g => g.category)));
  const locations = Array.from(new Set(allGrants.map(g => g.location)));

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000000]); // 0 to 3M default

  // Filter Logic
  const filteredGrants = allGrants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(grant.category);
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(grant.location);

    // Check if grant amount overlaps with selected range
    // If grant has no min/max, assume it matches (or handle gracefully)
    const grantMin = grant.amount_min || 0;
    const grantMax = grant.amount_max || grantMin;

    const matchesPrice = (grantMin <= priceRange[1] && grantMax >= priceRange[0]);

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  // Handlers
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setPriceRange([0, 3000000]);
    setSearchQuery("");
  };

  // Sidebar Component
  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label htmlFor={`cat-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4">Location</h3>
        <div className="space-y-3">
          {locations.map(location => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`loc-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => toggleLocation(location)}
              />
              <label htmlFor={`loc-${location}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4">Grant Amount</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 3000000]}
            max={3000000}
            step={50000}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${(priceRange[0] / 1000).toFixed(0)}k</span>
            <span>${(priceRange[1] / 1000000).toFixed(1)}M+</span>
          </div>
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedLocations.length > 0 || priceRange[0] > 0 || priceRange[1] < 3000000) && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#0b2545] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 border-blue-500/50">Funding Opportunities</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Grant</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Browse our comprehensive database of funding opportunities designed to help you scale your impact.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="h-5 w-5" />
                  <h2 className="font-bold text-lg">Filters</h2>
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Mobile Filter Toggle */}
              <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by keyword, organization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters (Mobile/Desktop) */}
              {(selectedCategories.length > 0 || selectedLocations.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategories.map(cat => (
                    <Badge key={cat} variant="secondary" className="flex items-center gap-1">
                      {cat}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
                    </Badge>
                  ))}
                  {selectedLocations.map(loc => (
                    <Badge key={loc} variant="outline" className="flex items-center gap-1">
                      {loc}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleLocation(loc)} />
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-6">
                    Clear all
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6 text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredGrants.length}</span> results
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGrants.map((grant) => (
                  <GrantCard key={grant.id} {...grant} />
                ))}
              </div>

              {filteredGrants.length === 0 && (
                <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No grants found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any grants matching your current filters.
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Grants;
