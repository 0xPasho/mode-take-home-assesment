import erc20Abi from "@/modules/polygon/utils/ERC721-ABI.json";
import { NextResponse } from "next/server";
import { formatUnits } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "../../../../../../web3-config";
import { ERC20_ADDRESS } from "@/modules/polygon/contants";

const getUserBalances = (
  userAddress: string
): Promise<{ erc20Bal: string }> => {
  const erc20Promise = readContract(config, {
    address: ERC20_ADDRESS,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [userAddress],
  });

  return Promise.all([erc20Promise])
    .then(([erc20Balance]) => {
      return {
        erc20Bal:
          Number(formatUnits(erc20Balance as bigint, 18)).toFixed(3) || "00",
      };
    })
    .catch((error) => {
      console.error("Error fetching balances:", error);
      throw new Error("Failed to fetch balances");
    });
};

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
    const balances = await getUserBalances(userAddress);
    return NextResponse.json(balances, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch balance", details: error?.message },
      { status: 500 }
    );
  }
}
