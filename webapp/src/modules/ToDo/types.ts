export type TodoPriorityType = "low" | "medium" | "high";

export interface TodoItem {
  title: string;
  description: string;
  dueDate: string;
  priority: TodoPriorityType;
}
