"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CurrencyInput } from "@/types/currency";

type CurrencyFormProps = {
  title: string;
  submitLabel: string;
  initialValues?: CurrencyInput;
  onSubmit: (input: CurrencyInput) => void;
};

const defaultValues: CurrencyInput = {
  name: "",
  code: "",
  symbol: "",
  exchangeRate: 0,
};

export default function CurrencyForm({
  title,
  submitLabel,
  initialValues,
  onSubmit,
}: CurrencyFormProps) {
  const [name, setName] = useState(initialValues?.name ?? defaultValues.name);
  const [code, setCode] = useState(initialValues?.code ?? defaultValues.code);
  const [symbol, setSymbol] = useState(
    initialValues?.symbol ?? defaultValues.symbol,
  );
  const [exchangeRate, setExchangeRate] = useState(
    initialValues?.exchangeRate ?? defaultValues.exchangeRate,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      name: name.trim(),
      code: code.trim(),
      symbol: symbol.trim(),
      exchangeRate,
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <Link
            href="/dashboard/currency"
            className="text-sm font-medium text-primary hover:underline"
          >
            Back to Currency List
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="e.g. Euro"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="USD"
                minLength={3}
                maxLength={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Symbol
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(event) => setSymbol(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="$"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exchange Rate
              </label>
              <input
                type="number"
                value={exchangeRate}
                onChange={(event) =>
                  setExchangeRate(Number.parseFloat(event.target.value) || 0)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="1"
                min={0}
                step="0.0001"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
