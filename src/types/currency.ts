export type Currency = {
  id: string;
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;
  updatedAt: string;
};

export type CurrencyInput = {
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;
};
