"use client";

import { useAccount } from "wagmi";
import { usePolygonStore } from "../store/polygon-store";

const useFetchErc20Data = () => {
  const { setErc20Price, setLoadingErc20 } = usePolygonStore();
  const { address } = useAccount();

  const refreshErc20Data = async () => {
    try {
      setLoadingErc20(true);
      const erc20Response = await fetch(
        "/api/polygon/balance/erc20?userAddress=" + address
      );
      const erc20Data = await erc20Response.json();

      if (erc20Data && erc20Data.erc20Bal !== undefined) {
        setErc20Price(erc20Data.erc20Bal);
      }
    } catch (error) {
      console.error("Error fetching ERC20 data:", error);
    } finally {
      setLoadingErc20(false);
    }
  };

  return { refreshErc20Data };
};

export default useFetchErc20Data;
