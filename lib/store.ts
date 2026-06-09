import { create } from "zustand";

type Store = {
   isNavOpened: boolean;
   setIsNavOpened: (value: boolean) => void;
   toggleNavOpened: () => void;
};

export const useStore = create<Store>((set) => ({
   isNavOpened: false,
   setIsNavOpened: (value: boolean) => set({ isNavOpened: value }),
   toggleNavOpened: () =>
      set((state) => ({ isNavOpened: !state.isNavOpened })),
}));
