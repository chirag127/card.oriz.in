import { useState, useEffect } from "react";
import type { CardData } from "@/types/card";
import { ALL_CARDS } from "@/data/index";
import CardThumbnail from "@/components/cards/CardThumbnail";

function filterCards(query: string): CardData[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return ALL_CARDS.filter(
    (card) =>
      card.name.toLowerCase().includes(q) ||
      card.tagline.toLowerCase().includes(q) ||
      card.bank.toLowerCase().includes(q) ||
      card.bankCode.toLowerCase().includes(q) ||
      card.network.toLowerCase().includes(q)
  );
}

export default function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CardData[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    setQuery(q);
    setResults(filterCards(q));
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.pushState({}, "", url.toString());
    setResults(filterCards(query));
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cards by name, bank, or network..."
            className="flex-1 px-4 py-3 bg-bg-secondary border border-border-default rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-gold/50 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gold text-bg-primary font-semibold rounded-xl hover:bg-gold-2 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {query && (
        <p className="text-sm text-text-tertiary mb-6">
          {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((card) => (
            <CardThumbnail key={card.id} card={card} showCompare={false} />
          ))}
        </div>
      ) : (
        query && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">No cards found matching your search.</p>
            <p className="text-text-tertiary text-sm mt-2">Try a different keyword or browse by category.</p>
          </div>
        )
      )}

      {!query && (
        <div className="text-center py-12">
          <p className="text-text-secondary text-lg">Start typing to search cards.</p>
          <p className="text-text-tertiary text-sm mt-2">Search by card name, bank, or payment network.</p>
        </div>
      )}
    </div>
  );
}
