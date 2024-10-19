import { Badge } from "@/components/ui/badge";
import { priorityBadgeClasses } from "./todo-item";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon, HandIcon } from "@radix-ui/react-icons";
import { useTodoStore } from "../store/todo-store";
import { useNftContract } from "@/modules/polygon/hooks/useNftContract";
import { useState } from "react";
import useFetchNftData from "@/modules/polygon/hooks/useFetchNftData";
import { usePolygonStore } from "@/modules/polygon/store/polygon-store";

const ChallengeItem = () => {
  const badge = priorityBadgeClasses("high");
  const { items } = useTodoStore();
  const count = 2; //items.filter((item) => item.completed).length;
  const [minting, setMinting] = useState(false);
  const { nfts } = usePolygonStore();
  const { mintToken } = useNftContract();
  const { refreshNftData } = useFetchNftData();
  const hasAvailableNftMinted = (nfts || []).length > 0;

  return (
    <button
      className={cn(
        hasAvailableNftMinted ? "bg-green-300 dark:bg-green-500" : "",
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all  w-full",
        count < 2 || minting
          ? "bg-gray-100 cursor-not-allowed"
          : "hover:bg-accent cursor-pointer"
      )}
      disabled={count < 2 || minting}
      onClick={async (e) => {
        e.preventDefault();
        if (hasAvailableNftMinted) {
          return;
        }
        setMinting(true);
        const response = await mintToken().finally(() => {
          setMinting(false);
          refreshNftData();
        });
      }}
    >
      <div className="flex flex-row gap-2 w-full">
        <div className="flex w-full flex-col gap-1 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-lg">
                Complete two to-dos to claim a NFT
              </div>

              {hasAvailableNftMinted ? (
                <Badge variant="secondary" className="bg-green-500">
                  <CheckCircledIcon /> Completed
                </Badge>
              ) : (
                <Badge variant="secondary" className={badge.class}>
                  <badge.icon /> High
                </Badge>
              )}
            </div>
            {!hasAvailableNftMinted && (
              <Button disabled={count < 2 || minting}>
                <HandIcon /> {minting ? "Minting..." : "Mint now"}
              </Button>
            )}
          </div>
          <div className="text-md font-medium">
            {!hasAvailableNftMinted
              ? "Once you complete two NFTs you will be able to claim a unique NFT"
              : "Nft Minted. To be able to mint again please Burn first the NFT and try again."}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ChallengeItem;
