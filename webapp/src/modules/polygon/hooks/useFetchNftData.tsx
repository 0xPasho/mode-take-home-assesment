"use client";

import { useAccount } from "wagmi";
import { usePolygonStore } from "../store/polygon-store";

const useFetchNftData = () => {
  const { address } = useAccount();
  const { setNfts, setLoadingNfts } = usePolygonStore();

  const refreshNftData = async () => {
    try {
      setLoadingNfts(true);

      const nftResponse = await fetch(
        "/api/polygon/nfts?userAddress=" + address
      );
      const nftData = await nftResponse.json();

      if (nftData && nftData.nfts) {
        setNfts(nftData.nfts);
      }
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    } finally {
      setLoadingNfts(false);
    }
  };

  return { refreshNftData };
};

export default useFetchNftData;
