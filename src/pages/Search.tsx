import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard?city=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Weather Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Search for any city to view current weather and forecasts
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input type="text" placeholder="Enter city name (e.g., London, New York, Tokyo)" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-12 h-14 text-lg bg-card border-border shadow-lg rounded-2xl focus-visible:ring-primary" />
          </div>
          <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all" disabled={!searchQuery.trim()}>
            Search Weather
          </Button>
        </form>

        <div className="pt-8 space-y-3">
          <p className="text-sm text-muted-foreground">Popular cities:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["London", "New York", "Tokyo", "Paris", "Sydney"].map(city => <Button key={city} variant="secondary" size="sm" onClick={() => navigate(`/dashboard?city=${city}`)} className="rounded-full">
                {city}
              </Button>)}
          </div>
        </div>
      </div>
    </div>;
};
export default Search;