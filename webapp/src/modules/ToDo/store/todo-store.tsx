import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { TodoItemType } from "../types";

interface PaginationDataType {
  page: number;
  limit: number;
  total: number;
}

const defaultPaginationData: PaginationDataType = {
  page: 1,
  limit: 10,
  total: 0,
};

export interface TodoState {
  paginationData: PaginationDataType;
  items: Array<TodoItemType>;
  appendMoreItems: (newPortfolio: TodoItemType[]) => void;
  removeInformation: () => void;
}

const initialState = {
  paginationData: defaultPaginationData,
  items: [],
};

const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      ...initialState,
      appendMoreItems: (newPortfolio: TodoItemType[]) => {
        set((data) => ({ ...data, items: [...data.items, ...newPortfolio] }));
      },
      removeInformation: () => {
        set(initialState);
      },
    }),
    {
      name: "TodoStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useTodoStore };
