import { Checkbox } from "@/components/ui/checkbox";
import { TodoItemType, TodoPriorityType } from "../types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, DashIcon } from "@radix-ui/react-icons";

export const priorityBadgeClasses = (priority: TodoPriorityType) => {
  if (priority === "high") {
    return { class: "bg-red-500 text-white", icon: ArrowUpIcon };
  }

  if (priority === "medium") {
    return { class: "bg-gray-100", icon: DashIcon };
  }

  return { class: "bg-blue-100", icon: ArrowDownIcon };
};

export function capitalizeFirstLetter(str: string) {
  if (!str) {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
}

const TodoItem = ({
  item,
  onComplete,
  onViewMore,
  isChallenge,
}: {
  item: TodoItemType & { completedAt?: string };
  onComplete?: () => void;
  onViewMore: () => void;
  isChallenge?: boolean;
}) => {
  const [makeStrokeAnimation, setMakeStrokeAnimation] = useState(false);

  const badge = priorityBadgeClasses(item.priority);
  return (
    <button
      key={item.id}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent w-full"
      )}
      onClick={(e) => {
        e.preventDefault();
        onViewMore();
      }}
    >
      <div className="flex flex-row gap-2 w-full">
        {!isChallenge && (
          <Checkbox
            className="shrink-0 rounded-full mt-1.5"
            onClick={() => {
              if (!makeStrokeAnimation) {
                setMakeStrokeAnimation(true);
              }
              onComplete?.();
            }}
            checked={item.completed}
          />
        )}
        <div className="flex w-full flex-col gap-1 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-lg">{item.title}</div>
              <Badge variant="secondary" className={badge.class}>
                <badge.icon /> {capitalizeFirstLetter(item.priority)}
              </Badge>
            </div>
            {!isChallenge && (
              <div className={cn("ml-auto  text-muted-foreground")}>
                {formatDistanceToNow(new Date(item.dueDate), {
                  addSuffix: true,
                })}
              </div>
            )}
          </div>
          <div className="text-md font-medium">{item.description}</div>
        </div>
      </div>
    </button>
  );
};

export default TodoItem;
