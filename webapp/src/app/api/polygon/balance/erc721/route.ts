import { ERC721_ADDRESS } from "@/modules/polygon/contants";
import { ethers } from "ethers";
import { NextResponse } from "next/server";
import erc721Abi from "@/modules/polygon/utils/ERC721-ABI.json";

const polygonRpcUrl = "https://polygon-amoy-bor-rpc.publicnode.com";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userAddress = searchParams.get("userAddress");
  if (!userAddress) {
    return NextResponse.json(
      { error: "User address is required" },
      { status: 400 }
    );
  }

  try {
    const provider = new ethers.JsonRpcProvider(polygonRpcUrl);

    const contractAddress = ERC721_ADDRESS;
    const abi = erc721Abi.abi;

    const contract = new ethers.Contract(contractAddress, abi, provider);
    const nftBalance = await contract.balanceOf(userAddress);
    if (!nftBalance || nftBalance <= 0) {
      return NextResponse.json({ nfts: [] }, { status: 200 });
    }
    // based on the ABI given, there's no totalSupply and neither tokenOfOwnerByIndex
    const INITIAL_MANUAL_CHECK_NFT_NUMBER = 120;
    // to avoid slow connections...
    const MAX_CHECK = 200;

    // Logic is set to in the future keep all the NFTs in an array nfts, and avoid breaking anything
    // And to avoid keep checking more, we'll just check for the first one
    for (let i = INITIAL_MANUAL_CHECK_NFT_NUMBER; i < MAX_CHECK; i++) {
      try {
        const owner = await contract.ownerOf(i);
        if (owner === userAddress) {
          return NextResponse.json({ nfts: [`${i}`] }, { status: 200 });
        }
      } catch (error) {}
    }

    return NextResponse.json({ nfts: [] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch NFTs" },
      { status: 500 }
    );
  }
}
