import { create } from "zustand";

type CollapseState = {
  collapse: boolean;
  setCollapse: (value: boolean) => void;
  toggleCollapse: () => void;
};

export const useCollapseStore = create<CollapseState>((set) => ({
  collapse: false,
  setCollapse: (value) => set({ collapse: value }),
  toggleCollapse: () => set((state) => ({ collapse: !state.collapse })),
}));