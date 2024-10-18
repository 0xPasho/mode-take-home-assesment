import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useFetchErc20Data from "@/modules/polygon/hooks/useFetchErc20Data";
import { useNftContract } from "@/modules/polygon/hooks/useNftContract";
import { usePolygonStore } from "@/modules/polygon/store/polygon-store";

const NftDataContent = () => {
  const { nfts, loadingNfts } = usePolygonStore();
  const { refreshErc20Data } = useFetchErc20Data();
  const { burnToken } = useNftContract();

  if (loadingNfts) {
    return <div className="w-full">Loading Nfts...</div>;
  }

  if (!nfts.length) {
    return (
      <div className="w-full">No NFT claimed with this address yet...</div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      {nfts.map((nft, index) => {
        return (
          <button
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all  w-full"
            )}
            onClick={async (e) => {
              e.preventDefault();
            }}
            key={`${nft}-${index}`}
          >
            <span className="text-2xl text-center w-full">
              Nft with token id: {nft}
            </span>
            <Button
              variant="destructive"
              onClick={async () => {
                const response = await burnToken(parseInt(nft));
                console.log({ response });
                await refreshErc20Data();
              }}
            >
              Burn
            </Button>
          </button>
        );
      })}
    </div>
  );
};

export default NftDataContent;
