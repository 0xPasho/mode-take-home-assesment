import { useTodoStore } from "../store/todo-store";
import { TodoItemType } from "../types";

const API_URL = "http://localhost:7979/api/v1/todos";

const useTodoApi = () => {
  const {
    items,
    paginationData,
    appendMoreItems,
    updateItem,
    deleteItem,
    removeInformation,
    updatePaginationData,
  } = useTodoStore();

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `${API_URL}?page=${paginationData.page}&limit=${paginationData.limit}`
      );
      const data = await response.json();
      appendMoreItems(data.data, "end");
      updatePaginationData({
        limit: data.limit,
        page: data.page,
        total: data.total,
      });
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  // Create a new Todo item
  const createTodo = async (newTodo: Partial<TodoItemType>) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const createdTodo = await response.json();
      appendMoreItems([createdTodo], "start");
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };

  // Update a Todo item
  const updateTodo = async (id: number, updatedData: Partial<TodoItemType>) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        updateItem(id, updatedData); // Update the item in the store
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  // Delete a Todo item
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteItem(id); // Remove the item from the store
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  // Clear all Todo data (both local and remote handling can be implemented)
  const clearTodos = () => {
    removeInformation();
  };

  return {
    items,
    paginationData,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    clearTodos,
  };
};

export default useTodoApi;
