"use client";

import { useState } from "react";
import { buttonClass } from "./ui";

const amounts = [50, 100, 250, 500, 1000];

export function DonatePicker({ donateUrl }: { donateUrl: string }) {
  const [amount, setAmount] = useState(100);
  const [monthly, setMonthly] = useState(false);
  const href = `${donateUrl}?amount=${amount}${monthly ? "&frequency=monthly" : ""}`;

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-10">
      <div role="radiogroup" aria-label="Gift frequency" className="grid grid-cols-2 rounded-full bg-ivory p-1">
        {[false, true].map((m) => (
          <button
            key={String(m)}
            type="button"
            role="radio"
            aria-checked={monthly === m}
            onClick={() => setMonthly(m)}
            className={`rounded-full py-3 text-sm font-semibold transition-colors ${monthly === m ? "bg-ink text-white" : ""}`}
          >
            {m ? "Monthly" : "One-time"}
          </button>
        ))}
      </div>

      <div role="radiogroup" aria-label="Gift amount" className="mt-6 grid grid-cols-3 gap-3">
        {amounts.map((a) => (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={amount === a}
            onClick={() => setAmount(a)}
            className={`rounded-2xl border py-4 font-display text-2xl transition-colors ${
              amount === a ? "border-ink bg-ink text-white" : "border-ink/15 hover:border-ink"
            }`}
          >
            ${a.toLocaleString("en-US")}
          </button>
        ))}
        <label className="relative">
          <span className="sr-only">Other amount</span>
          <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl text-muted">
            $
          </span>
          <input
            type="number"
            min={5}
            placeholder="Other"
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v >= 5) setAmount(v);
            }}
            className="h-full w-full rounded-2xl border border-ink/15 bg-white pl-9 pr-3 font-display text-xl focus:border-ink focus:outline-none"
          />
        </label>
      </div>

      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass("solid", "mt-8 w-full py-4!")}>
        Give ${amount.toLocaleString("en-US")}
        {monthly ? " monthly" : ""} securely
      </a>
      <p className="mt-3 text-center text-xs text-muted">You’ll complete your gift on our secure payment partner’s page.</p>
    </div>
  );
}
