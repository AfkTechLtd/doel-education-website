import { Currency, CurrencyInput } from "@/types/currency";

const STORAGE_KEY = "doel-dashboard-currencies";

const seedCurrencies: Currency[] = [
  {
    id: "usd",
    name: "US Dollar",
    code: "USD",
    symbol: "$",
    exchangeRate: 1,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bdt",
    name: "Bangladeshi Taka",
    code: "BDT",
    symbol: "Tk",
    exchangeRate: 117.2,
    updatedAt: new Date().toISOString(),
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCurrencies(): Currency[] {
  if (!isBrowser()) {
    return seedCurrencies;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedCurrencies));
    return seedCurrencies;
  }

  try {
    const parsed = JSON.parse(raw) as Currency[];
    if (!Array.isArray(parsed)) {
      return seedCurrencies;
    }
    return parsed;
  } catch {
    return seedCurrencies;
  }
}

function saveCurrencies(currencies: Currency[]) {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currencies));
}

export function createCurrency(input: CurrencyInput): Currency {
  const newCurrency: Currency = {
    ...input,
    id: crypto.randomUUID(),
    code: input.code.toUpperCase(),
    updatedAt: new Date().toISOString(),
  };

  const currencies = getCurrencies();
  saveCurrencies([...currencies, newCurrency]);
  return newCurrency;
}

export function updateCurrency(id: string, input: CurrencyInput): Currency | null {
  const currencies = getCurrencies();
  const existingCurrency = currencies.find((currency) => currency.id === id);

  if (!existingCurrency) {
    return null;
  }

  const updatedCurrency: Currency = {
    ...existingCurrency,
    ...input,
    code: input.code.toUpperCase(),
    updatedAt: new Date().toISOString(),
  };

  const updatedCurrencies = currencies.map((currency) => {
    if (currency.id !== id) {
      return currency;
    }
    return updatedCurrency;
  });

  saveCurrencies(updatedCurrencies);
  return updatedCurrency;
}

export function deleteCurrency(id: string): boolean {
  const currencies = getCurrencies();
  const updatedCurrencies = currencies.filter((currency) => currency.id !== id);

  if (updatedCurrencies.length === currencies.length) {
    return false;
  }

  saveCurrencies(updatedCurrencies);
  return true;
}

export function getCurrencyById(id: string): Currency | null {
  const currencies = getCurrencies();
  return currencies.find((currency) => currency.id === id) ?? null;
}
