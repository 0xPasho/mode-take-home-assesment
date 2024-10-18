"use client";

import TodoItem from "./todo-item";
import { TodoPagination } from "./todo-pagination";
import { useEffect, useRef, useState } from "react";
import useTodoApi from "../hooks/use-todo-api";
import { CreateTodoDrawer } from "../../create/components/create-todo-drawer";
import "@mdxeditor/editor/style.css";
import { useTodoStore } from "../store/todo-store";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import ChallengeItem from "./challenge-item";
import { Footer } from "@/modules/layout/components/footer";
import { Header } from "@/modules/layout/components/header";

const TodoDashboardContent = () => {
  const { items, viewingPage, paginationData, setPreviewTodoItemId } =
    useTodoStore();
  const initialCall = useRef(false);
  const [isTodoDrawerOpen, setIsTodoDrawerOpen] = useState(false);
  const { fetchTodos, updateTodo } = useTodoApi();

  useEffect(() => {
    if (!initialCall.current) {
      fetchTodos(1);
      initialCall.current = true;
    }
  }, []);

  const currentPageItems = items.slice(
    (viewingPage - 1) * paginationData.limit,
    viewingPage * paginationData.limit
  );

  return (
    <div className="max-w-6xl mx-auto pt-4 pb-12 px-4 xl:px-0">
      <Header />
      <div>
        <div className="flex flex-row gap-2">
          <CheckCircledIcon className="w-6 h-6 mt-1.5" />
          <h2 className="text-3xl font-bold tracking-tight mb-2">Challenges</h2>
        </div>
        <ChallengeItem onViewMore={() => {}} />
      </div>
      <div className="w-full mt-8">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row gap-2">
            <CheckCircledIcon className="w-6 h-6 mt-1.5" />
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Your tasks
            </h2>
          </div>
          <Button
            variant="outline"
            className="-mt-1"
            onClick={() => {
              setIsTodoDrawerOpen(true);
            }}
          >
            <PlusCircledIcon /> Create new
          </Button>
        </div>
        <div
          className="flex flex-col gap-2 mb-2"
          key={`${currentPageItems?.length}`}
        >
          {currentPageItems.length > 0 ? (
            currentPageItems.map((item) => (
              <TodoItem
                item={item}
                key={`todo-${item.id}`}
                onComplete={async () => {
                  const response = await updateTodo(item.id, {
                    ...item,
                    completed: !item.completed,
                  });
                  console.log({ response });
                }}
                onViewMore={() => {
                  setPreviewTodoItemId(item.id);
                  setIsTodoDrawerOpen(true);
                }}
              />
            ))
          ) : (
            <div className="w-full">
              <p>No tasks available for this page.</p>
            </div>
          )}
        </div>
        <TodoPagination />
        <div className="mt-8 w-full border-t pt-2">
          <Footer />
        </div>
      </div>
      <CreateTodoDrawer
        open={isTodoDrawerOpen}
        key={`${isTodoDrawerOpen}`}
        onOpenChange={(open) => {
          setIsTodoDrawerOpen(open);
          if (!open) {
            setPreviewTodoItemId("");
          }
        }}
      />
    </div>
  );
};

export default TodoDashboardContent;
