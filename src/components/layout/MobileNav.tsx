import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
        aria-label="Toggle navigation menu"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-bg-secondary border-l border-border-default overflow-y-auto animate-slide-right">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-lg font-bold">Menu</span>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg text-text-secondary hover:text-text-primary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">Credit Cards</h3>
                  <ul className="space-y-1">
                    <li><a href="/credit-cards" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>All Credit Cards</a></li>
                    <li><a href="/credit-cards/best/cashback" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Best Cashback</a></li>
                    <li><a href="/credit-cards/best/travel" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Best Travel</a></li>
                    <li><a href="/credit-cards/best/rewards" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Best Rewards</a></li>
                    <li><a href="/credit-cards/best/premium" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Best Premium</a></li>
                    <li><a href="/credit-cards/best/for-students" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>For Students</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">Debit & Prepaid</h3>
                  <ul className="space-y-1">
                    <li><a href="/debit-cards" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>All Debit Cards</a></li>
                    <li><a href="/prepaid-cards" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>All Prepaid Cards</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">Tools</h3>
                  <ul className="space-y-1">
                    <li><a href="/card-genie" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Card Genie (AI) ✨</a></li>
                    <li><a href="/compare" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Compare Cards</a></li>
                    <li><a href="/calculators" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Calculators</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">Learn</h3>
                  <ul className="space-y-1">
                    <li><a href="/blog" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Blog</a></li>
                    <li><a href="/glossary" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Glossary</a></li>
                    <li><a href="/issuers" className="block py-2 text-sm text-text-secondary hover:text-gold transition-colors" onClick={() => setOpen(false)}>Issuers</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
