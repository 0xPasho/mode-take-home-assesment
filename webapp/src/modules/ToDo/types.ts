export type TodoPriorityType = "low" | "medium" | "high";

export interface TodoItemType {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: TodoPriorityType;
}
