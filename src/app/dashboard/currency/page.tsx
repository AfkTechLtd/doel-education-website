"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteCurrency, getCurrencies } from "@/lib/currencyStore";
import { Currency } from "@/types/currency";

function formatUpdatedDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function CurrencyManagementPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    setCurrencies(getCurrencies());
  }, []);

  function handleDelete(id: string) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this currency?",
    );

    if (!isConfirmed) {
      return;
    }

    const isDeleted = deleteCurrency(id);
    if (isDeleted) {
      setCurrencies(getCurrencies());
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Currency Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              View all currencies and maintain them from one place.
            </p>
          </div>

          <Link
            href="/dashboard/currency/create"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Create Currency
          </Link>
        </div>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Code
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Symbol
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Rate
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Updated
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currencies.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={6}>
                    No currencies found. Click "Create Currency" to add one.
                  </td>
                </tr>
              ) : (
                currencies.map((currency) => (
                  <tr key={currency.id} className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-700">{currency.name}</td>
                    <td className="px-4 py-3 text-gray-700">{currency.code}</td>
                    <td className="px-4 py-3 text-gray-700">{currency.symbol}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {currency.exchangeRate}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatUpdatedDate(currency.updatedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/currency/${currency.id}/edit`}
                          className="inline-flex items-center rounded-md border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
                        >
                          Update
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(currency.id)}
                          className="inline-flex items-center rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
