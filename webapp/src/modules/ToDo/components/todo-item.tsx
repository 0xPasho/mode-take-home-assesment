import { Checkbox } from "@/components/ui/checkbox";
import { TodoItemType } from "../types";

const TodoItem = ({
  item,
  onComplete,
  onViewMore,
}: {
  item: TodoItemType;
  onComplete: () => void;
  onViewMore: () => void;
}) => {
  return (
    <div
      className="flex items-center gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800"
      onClick={(e) => {
        e.preventDefault();
        onViewMore();
      }}
    >
      <Checkbox
        id="todo-1"
        className="shrink-0 rounded-full"
        onClick={onComplete}
      />
      <div className="flex-1 space-y-1">
        <h3 className="font-bold break-words">{item.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 break-words">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default TodoItem;
