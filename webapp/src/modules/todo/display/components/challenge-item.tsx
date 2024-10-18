import { Badge } from "@/components/ui/badge";
import { priorityBadgeClasses } from "./todo-item";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HandIcon } from "@radix-ui/react-icons";
import { useTodoStore } from "../store/todo-store";

const ChallengeItem = ({ onViewMore }: { onViewMore: () => void }) => {
  const badge = priorityBadgeClasses("high");
  const { items } = useTodoStore();
  const count = items.filter((item) => item.completed).length;

  return (
    <button
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all  w-full",
        count < 2
          ? "bg-gray-100 cursor-not-allowed"
          : "hover:bg-accent cursor-pointer"
      )}
      disabled={count < 2}
      onClick={(e) => {
        e.preventDefault();
        onViewMore();
      }}
    >
      <div className="flex flex-row gap-2 w-full">
        <div className="flex w-full flex-col gap-1 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-lg">
                Complete two to-dos to claim a NFT
              </div>
              <Badge variant="secondary" className={badge.class}>
                <badge.icon /> High
              </Badge>
            </div>
            <Button disabled={count < 2}>
              <HandIcon /> Mint now
            </Button>
          </div>
          <div className="text-md font-medium">
            Once you complete two NFTs you will be able to claim a unique NFT
          </div>
        </div>
      </div>
    </button>
  );
};

export default ChallengeItem;
