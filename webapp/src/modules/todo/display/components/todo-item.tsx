import { Checkbox } from "@/components/ui/checkbox";
import { TodoItemType, TodoPriorityType } from "../types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DashIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { MDXEditor } from "@mdxeditor/editor";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useTodoApi from "../hooks/use-todo-api";

export const priorityBadgeClasses = (priority: TodoPriorityType) => {
  if (priority === "high") {
    return { class: "bg-red-500 text-white", icon: ArrowUpIcon };
  }

  if (priority === "medium") {
    return { class: "bg-gray-100 dark:text-black", icon: DashIcon };
  }

  return {
    class: "bg-blue-100 dark:bg-blue-300 dark:text-black",
    icon: ArrowDownIcon,
  };
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
}: {
  item: TodoItemType & { completedAt?: string };
  onComplete?: () => void;
  onViewMore: () => void;
}) => {
  const { deleteTodo, fetchTodos } = useTodoApi();
  const [makeStrokeAnimation, setMakeStrokeAnimation] = useState(false);
  const { theme } = useTheme();
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
        <Checkbox
          className="shrink-0 rounded-full mt-1.5"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!makeStrokeAnimation) {
              setMakeStrokeAnimation(true);
            }
            onComplete?.();
          }}
          checked={item.completed}
        />
        <div className="flex flex-row justify-between w-full">
          <div className="flex w-full flex-col gap-1 flex-1">
            <div className="flex items-center w-full">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-lg">{item.title}</div>
                <Badge variant="secondary" className={badge.class}>
                  <badge.icon /> {capitalizeFirstLetter(item.priority)}
                </Badge>
              </div>
            </div>
            <div className="text-md font-medium dark:text-white">
              <MDXEditor
                key={`${item.description}`}
                markdown={item.description || ""}
                placeholder=""
                plugins={[]}
                readOnly
                className={cn(
                  "p-0 m-0 -ml-2.5 -mt-2",
                  theme === "dark" ? "dark" : ""
                )}
              />
            </div>
          </div>
          <div className="flex flex-col">
            {item.dueDate && (
              <div className={cn("ml-auto  text-muted-foreground")}>
                {formatDistanceToNow(new Date(item.dueDate), {
                  addSuffix: true,
                })}
              </div>
            )}
            <div className="flex-1 items-end align-end flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 w-8 rounded-full m-0 border-none"
                  >
                    <DotsHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={async (e) => {
                      e.stopPropagation();
                      deleteTodo(item.id);
                      fetchTodos(1, true);
                    }}
                    className="cursor-pointer text-red-500"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <TrashIcon />
                      <span>Delete</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default TodoItem;
