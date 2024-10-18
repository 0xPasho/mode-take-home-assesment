import { create } from "zustand";

export interface PolygonState {
  erc20Price: number;
  nfts: string[];
  loadingErc20: boolean;
  loadingNfts: boolean;
  setErc20Price: (price: number) => void;
  setNfts: (nfts: string[]) => void;
  setLoadingErc20: (loading: boolean) => void;
  setLoadingNfts: (loading: boolean) => void;
}

const initialState = {
  erc20Price: 0,
  nfts: [],
  loadingErc20: false,
  loadingNfts: false,
};

const usePolygonStore = create<PolygonState>()((set) => ({
  ...initialState,
  setErc20Price: (price: number) => {
    set({ erc20Price: price });
  },
  setNfts: (nfts: string[]) => {
    set({ nfts });
  },
  setLoadingErc20: (loading: boolean) => {
    set({ loadingErc20: loading });
  },
  setLoadingNfts: (loading: boolean) => {
    set({ loadingNfts: loading });
  },
}));

export { usePolygonStore };
