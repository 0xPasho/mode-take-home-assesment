import { ERC721_ADDRESS } from "@/modules/polygon/contants";
import { ethers } from "ethers";
import { NextResponse } from "next/server";
import erc721Abi from "@/modules/polygon/utils/ERC721-ABI.json";

const polygonRpcUrl = "https://zkevm-rpc.com";

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

    const nfts = [];
    for (let i = 0; i < nftBalance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
      nfts.push(tokenId.toString());
    }

    return NextResponse.json({ nfts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch NFTs" },
      { status: 500 }
    );
  }
}
