import { todoFakeItems } from "@/modules/data";
import TodoItem from "./todo-item";
import { TodoPagination } from "./todo-pagination";

const TodoDashboardContent = () => {
  return (
    <div className="max-w-6xl mx-auto pt-4 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Daily Challenges
        </h2>
        <TodoItem
          item={{
            id: 0,
            title: "Complete two to-dos to claim a NFT",
            description:
              "Once you complete two NFTs you will be able to claim a unique NFT",
            dueDate: new Date().toISOString(),
            priority: "high",
          }}
          onComplete={() => {}}
          onViewMore={() => {}}
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold tracking-tight mt-8 mb-2">
          Your To-Dos
        </h2>
        <div className="flex flex-col gap-2 mb-2">
          {todoFakeItems.map((item) => {
            return (
              <TodoItem
                item={item}
                key={`your-todo-${item.id}`}
                onComplete={() => {}}
                onViewMore={() => {}}
              />
            );
          })}
        </div>
        <TodoPagination />
      </div>
    </div>
  );
};

export default TodoDashboardContent;
