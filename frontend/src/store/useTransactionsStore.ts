import { create } from "zustand";

type Transaction = {
  id: string;
  description: string;
  amount: number;
};

type TransactionsStore = {
  transactions: Transaction[];
  setTransactions: (tx: Transaction[]) => void;
};

export const useTransactionsStore = create<TransactionsStore>((set) => ({
  transactions: [],
  setTransactions: (tx) => set({ transactions: tx }),
}));
