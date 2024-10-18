import { ethers } from "ethers";
import ERC721JSON from "./../utils/ERC721-ABI.json";
import { ERC721_ADDRESS } from "../contants";
import { Config, useAccount, useConnectorClient } from "wagmi";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useMemo } from "react";
import { polygonAmoy } from "wagmi/chains";

export function clientToSigner(client) {
  const { account, chain, transport } = client;
  const network = {
    chainId: polygonAmoy.id,
    name: polygonAmoy.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}

export const useNftContract = () => {
  const { isConnected, connector } = useAccount();
  const signer = useEthersSigner({ chainId: polygonAmoy.id });
  const mintToken = async () => {
    if (!isConnected)
      return { success: false, message: "Wallet is not connected", tokenId: 0 };

    try {
      const nftContract = new ethers.Contract(
        ERC721_ADDRESS,
        ERC721JSON.abi,
        signer
      );
      const tx = await nftContract.mint();
      const receipt = await tx.wait(5);
      const mintedTokenId = receipt.logs[0].topics[3];

      return { success: true, message: "", tokenId: mintedTokenId };
    } catch (err: any) {
      console.log(err);
      return { success: false, message: err.reason, tokenId: 0 };
    }
  };

  const burnToken = async (tokenId: number) => {
    if (!isConnected)
      return { success: false, message: "Wallet is not connected" };

    try {
      const nftContract = new ethers.Contract(
        ERC721_ADDRESS,
        ERC721JSON.abi,
        signer
      );
      const tx = await nftContract.burn(tokenId);
      await tx.wait(5);

      return { success: true, message: "" };
    } catch (err: any) {
      console.log(err);
      return { success: false, message: err.reason };
    }
  };

  return { mintToken, burnToken };
};
