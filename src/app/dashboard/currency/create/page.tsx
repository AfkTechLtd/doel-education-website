"use client";

import { useRouter } from "next/navigation";
import CurrencyForm from "@/components/dashboard/CurrencyForm";
import { createCurrency } from "@/lib/currencyStore";
import { CurrencyInput } from "@/types/currency";

export default function CreateCurrencyPage() {
  const router = useRouter();

  function handleCreateCurrency(input: CurrencyInput) {
    createCurrency(input);
    router.push("/dashboard/currency");
  }

  return (
    <CurrencyForm
      title="Create Currency"
      submitLabel="Save Currency"
      onSubmit={handleCreateCurrency}
    />
  );
}
