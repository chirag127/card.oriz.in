import { useState, useMemo } from "react";

export default function InterestCalculator() {
  const [balance, setBalance] = useState(50000);
  const [rate, setRate] = useState(3.75);
  const [payment, setPayment] = useState(5000);

  const result = useMemo(() => {
    if (payment <= 0 || balance <= 0 || rate <= 0) {
      return null;
    }

    let remaining = balance;
    let months = 0;
    let totalPaid = 0;
    let totalInterest = 0;
    const maxMonths = 600;

    while (remaining > 0 && months < maxMonths) {
      const interest = remaining * (rate / 100);
      totalInterest += interest;
      remaining += interest;

      const actualPayment = Math.min(payment, remaining);
      remaining -= actualPayment;
      totalPaid += actualPayment;
      months++;

      if (remaining < 1) {
        totalPaid += remaining;
        remaining = 0;
      }
    }

    return { months, totalInterest: Math.round(totalInterest), totalPaid: Math.round(totalPaid) };
  }, [balance, rate, payment]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border-default p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-text-primary mb-6">
          Credit Card Interest Calculator
        </h2>

        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Outstanding Balance (₹)
            </label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-default text-text-primary text-sm focus:outline-none focus:border-gold/50"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Interest Rate (% per month)
            </label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-default text-text-primary text-sm focus:outline-none focus:border-gold/50"
            />
            <p className="text-xs text-text-tertiary mt-1">
              Typical range: 2.5% – 4.17% per month
            </p>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Monthly Payment (₹)
            </label>
            <input
              type="number"
              value={payment}
              onChange={(e) => setPayment(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-3 rounded-xl bg-bg-tertiary border border-border-default text-text-primary text-sm focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-bg-primary border border-border-default p-4 text-center">
              <p className="text-xs text-text-tertiary mb-1">Months to Pay Off</p>
              <p className="text-2xl font-display font-bold text-gold">
                {result.months}
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                ≈ {(result.months / 12).toFixed(1)} years
              </p>
            </div>
            <div className="rounded-xl bg-bg-primary border border-border-default p-4 text-center">
              <p className="text-xs text-text-tertiary mb-1">Total Interest Paid</p>
              <p className="text-2xl font-display font-bold text-rose-card">
                ₹{result.totalInterest.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl bg-bg-primary border border-border-default p-4 text-center">
              <p className="text-xs text-text-tertiary mb-1">Total Amount Paid</p>
              <p className="text-2xl font-display font-bold text-text-primary">
                ₹{result.totalPaid.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
