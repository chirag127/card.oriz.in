import { useState, useRef, useEffect } from "react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-default text-sm text-text-tertiary hover:border-border-bright hover:text-text-secondary transition-colors"
        aria-label="Search cards"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-bg-tertiary rounded border border-border-default">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg mx-4 bg-bg-secondary border border-border-default rounded-2xl shadow-2xl animate-slide-top">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border-default">
                <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cards, banks, benefits..."
                  className="flex-1 bg-transparent text-text-primary placeholder-text-tertiary outline-none text-sm"
                />
                <kbd className="px-1.5 py-0.5 text-xs bg-bg-tertiary rounded border border-border-default text-text-tertiary">
                  ESC
                </kbd>
              </div>
            </form>
            <div className="p-4">
              <p className="text-xs text-text-tertiary text-center">
                Type to search across 300+ cards, banks, and categories
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
