"use client";

import TodoItem from "./todo-item";
import { TodoPagination } from "./todo-pagination";
import { useEffect, useRef, useState } from "react";
import useTodoApi from "../hooks/use-todo-api";
import { CreateTodoDrawer } from "../../create/components/create-todo-drawer";
import "@mdxeditor/editor/style.css";
import { useTodoStore } from "../store/todo-store";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import ChallengeItem from "./challenge-item";

const TodoDashboardContent = () => {
  const { items } = useTodoStore();
  const initialCall = useRef(false);
  const [isTodoDrawerOpen, setIsTodoDrawerOpen] = useState(false);
  const { fetchTodos } = useTodoApi();

  useEffect(() => {
    if (!initialCall.current) {
      fetchTodos();
      initialCall.current = true;
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-4 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Daily Challenges
        </h2>
        <ChallengeItem onViewMore={() => {}} />
      </div>
      <div>
        <div className="flex flex-row items-center">
          <h2 className="text-3xl font-bold tracking-tight mt-8 mb-2">
            Your To-Dos
          </h2>
          <Button variant="outline">
            <PlusCircledIcon /> Create new
          </Button>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          {items.map((item) => {
            return (
              <TodoItem
                item={item}
                key={`your-todo-${item.id}`}
                onComplete={() => {}}
                onViewMore={() => {}}
              />
            );
          })}
          {/* {todoFakeItems.map((item) => {
            return (
              <TodoItem
                item={item}
                key={`your-todo-${item.id}`}
                onComplete={() => {}}
                onViewMore={() => {}}
              />
            );
          })} */}
        </div>
        <TodoPagination />
      </div>
      <CreateTodoDrawer
        open={isTodoDrawerOpen}
        key={`${isTodoDrawerOpen}`}
        onOpenChange={(open) => {
          setIsTodoDrawerOpen(open);
        }}
      />
    </div>
  );
};

export default TodoDashboardContent;
