export type TodoPriorityType = "low" | "medium" | "high";

export interface TodoItemType {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TodoPriorityType;
  completed: boolean;
}
