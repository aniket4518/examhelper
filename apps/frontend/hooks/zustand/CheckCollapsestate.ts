import { create } from "zustand";

type CollapseState = {
  collapseNavbar: boolean;
  setCollapseNavbar: (value: boolean) => void;
  toggleCollapseNavbar: () => void;
  collapseStudio: boolean;
  setCollapseStudio: (value: boolean) => void;
  toggleCollapseStudio: () => void;
};

export const useCollapseStore = create<CollapseState>((set) => ({
  collapseNavbar: false,
  setCollapseNavbar: (value) => set({ collapseNavbar: value }),
  toggleCollapseNavbar: () =>
    set((state) => ({ collapseNavbar: !state.collapseNavbar })),
  collapseStudio: false,
  setCollapseStudio: (value) => set({ collapseStudio: value }),
  toggleCollapseStudio: () =>
    set((state) => ({ collapseStudio: !state.collapseStudio })),
}));
