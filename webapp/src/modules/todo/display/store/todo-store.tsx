import { create } from "zustand";
import { TodoItemType } from "../types";

type AppendItemsPositionType = "end" | "start" | undefined;
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
  previewTodoItemId: string;
  viewingPage: number;
  setPreviewTodoItemId: (id: string) => void;
  paginationData: PaginationDataType;
  items: Array<TodoItemType>;
  isRetrievingData: boolean;
  setViewingPage: (viewingPage: number) => void;
  setIsRetrievingData: (loading: boolean) => void;
  appendMoreItems: (
    newItems: TodoItemType[],
    position: AppendItemsPositionType
  ) => void;
  updateItem: (idToUpdate: string, data: Partial<TodoItemType>) => void;
  updatePaginationData: (data: PaginationDataType, cb?: () => void) => void;
  movePagination: (next: boolean) => void;
  deleteItem: (deletedId: string) => void;
  removeInformation: () => void;
}

const initialState = {
  paginationData: defaultPaginationData,
  items: [],
  previewTodoItemId: "",
  isRetrievingData: true,
  viewingPage: 1,
};

const useTodoStore = create<TodoState>()((set) => ({
  ...initialState,
  setViewingPage: (viewingPage: number) => {
    set({ viewingPage });
  },
  setPreviewTodoItemId: (id: string) => {
    set({ previewTodoItemId: id });
  },
  setIsRetrievingData: (loading: boolean) => {
    set({ isRetrievingData: loading });
  },
  appendMoreItems: (
    newItems: TodoItemType[],
    position: AppendItemsPositionType = "end"
  ) => {
    set((data) => {
      if (position === "end") {
        return { ...data, items: [...data.items, ...newItems] };
      }
      return { ...data, items: [...newItems, ...data.items] };
    });
  },
  updatePaginationData: (pagination: PaginationDataType) => {
    set((data) => ({
      ...data,
      paginationData: { ...data.paginationData, ...pagination },
    }));
  },
  movePagination: (next: boolean) => {
    set((data) => ({
      ...data,
      paginationData: {
        ...data.paginationData,
        page: data.paginationData.page + (next ? 1 : -1),
      },
    }));
  },
  updateItem: (idToUpdate: string, givenData: Partial<TodoItemType>) => {
    set((data) => {
      let tempData = [...data.items];
      const foundIndex = tempData.findIndex((item) => item.id === idToUpdate);
      if (foundIndex === -1) {
        return data;
      }
      tempData[foundIndex] = { ...tempData[foundIndex], ...givenData };
      return { ...data, items: tempData };
    });
  },
  deleteItem: (deletedId: string) => {
    set((data) => ({
      ...data,
      items: data.items.filter((item) => item.id === deletedId),
    }));
  },
  removeInformation: () => {
    set(initialState);
  },
}));

export { useTodoStore };
