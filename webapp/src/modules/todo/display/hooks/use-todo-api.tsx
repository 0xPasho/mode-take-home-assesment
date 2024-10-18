import { useState } from "react";
import { useTodoStore } from "../store/todo-store";
import { TodoItemType } from "../types";

const API_URL = process.env.NEXT_PUBLIC_TODO_API;

const useTodoApi = () => {
  const [latestPageRetrieval, setLatestPageRetrieval] = useState(0);
  const {
    paginationData,
    appendMoreItems,
    updateItem,
    deleteItem,
    updatePaginationData,
    setIsRetrievingData,
    removeInformation,
    viewingPage,
    setViewingPage,
  } = useTodoStore();

  const fetchTodos = async (newPage: number, fresh?: boolean) => {
    try {
      const currentViewingPage = viewingPage;
      setViewingPage(newPage);
      // If we are retrieving fresh data, we reset the latest page retrieval
      if (fresh) {
        setLatestPageRetrieval(newPage);
        removeInformation(); // clear old data
      }

      // Avoid fetching if we're trying to load a page we've already retrieved
      if (currentViewingPage <= latestPageRetrieval && !fresh) {
        return;
      }

      // Set loading state
      setIsRetrievingData(true);

      // Fetch data from the API
      const response = await fetch(`${API_URL}?page=${newPage}`);
      const data = await response.json();

      // Append fetched todos to the store
      appendMoreItems(data.data, "end");

      // Update pagination data
      updatePaginationData({
        limit: data.limit,
        page: data.page,
        total: data.total,
      });

      // Update the latest page retrieval state to the newly fetched page
      if (fresh) {
        setLatestPageRetrieval(1);
      } else {
        setLatestPageRetrieval((value) => Math.max(value, newPage));
      }
    } catch (error) {
      console.error("Failed to fetch todos", error);
    } finally {
      // Stop loading state
      setIsRetrievingData(false);
    }
  };

  const createTodo = async (newTodo: Partial<TodoItemType>) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      await fetchTodos(1, true);
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };

  const updateTodo = async (id: string, updatedData: Partial<TodoItemType>) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        updateItem(id, updatedData);
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchTodos(1, true);
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return {
    paginationData,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodoApi;
