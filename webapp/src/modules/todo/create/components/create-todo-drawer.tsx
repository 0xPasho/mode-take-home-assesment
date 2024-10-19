import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  MDXEditor,
  BoldItalicUnderlineToggles,
  UndoRedo,
  toolbarPlugin,
} from "@mdxeditor/editor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  capitalizeFirstLetter,
  priorityBadgeClasses,
} from "../../display/components/todo-item";
import { TodoPriorityType } from "../../display/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import useTodoApi from "../../display/hooks/use-todo-api";
import { useTodoStore } from "../../display/store/todo-store";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const priorities: Array<TodoPriorityType> = ["low", "medium", "high"];

export function CreateTodoDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { previewTodoItemId, items } = useTodoStore();
  const { fetchTodos } = useTodoApi();
  const foundItem = items.find((item) => item.id === previewTodoItemId);
  const [title, setTitle] = useState(foundItem?.title || "");
  const [details, setDetails] = useState(foundItem?.description || "");
  const [priority, setPriority] = useState<TodoPriorityType>(
    foundItem?.priority || "low"
  );
  const [date, setDate] = useState<Date | undefined>(
    foundItem?.dueDate ? new Date(foundItem.dueDate) : undefined
  );
  const { createTodo, updateTodo } = useTodoApi();
  const handleSave = async () => {
    if (details.length < 1) {
      toast({ variant: "destructive", title: "Description cannot be empty" });
      return;
    }
    setIsLoading(true);
    const dataToUpdate = {
      ...foundItem,
      description: details,
      dueDate: date ? date.toISOString() : new Date().toISOString(),
      priority,
      title,
    };
    if (previewTodoItemId) {
      if (!foundItem?.id) {
        return;
      }
      await updateTodo(foundItem.id, {
        ...foundItem,
        ...dataToUpdate,
      });
      toast({
        title: `Task Updated: ${dataToUpdate.title}`,
      });
      setIsLoading(false);
      onOpenChange(false);
      return;
    }
    await createTodo({
      ...dataToUpdate,
      completed: false,
    });
    setIsLoading(false);
    onOpenChange(false);
    toast({
      title: `New Task Created: ${dataToUpdate.title}`,
    });
    fetchTodos(1, true);
  };

  const { theme } = useTheme();

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent
        side="bottom"
        className="max-h-[60vh] h-full w-1/2 mx-auto rounded-t-xl"
      >
        <SheetHeader>
          <SheetTitle>New Task</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 h-full flex-col justify-between">
          <div className="flex flex-col w-full overflow-y-auto px-1">
            <Input
              autoFocus
              placeholder="What do you want to do?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 text-4xl border-none shadow-none min-h-auto h-auto mb-8 mt-2"
            />
            <MDXEditor
              markdown={details}
              onChange={(newMarkdown) => setDetails(newMarkdown)}
              placeholder="Give more details of this task"
              className={cn("min-h-[200px]", theme === "dark" ? "dark" : "")}
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                    </>
                  ),
                }),
              ]}
            />
            <div className="w-full pb-1 flex flex-row gap-4">
              <div className="pb-1 flex flex-col">
                <Label className="font-bold mb-2">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(priority: TodoPriorityType) => {
                    setPriority(priority);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      {priorities.map((priority, index) => {
                        const badge = priorityBadgeClasses(priority);
                        return (
                          <SelectItem
                            value={priority}
                            key={`${priority}-${index}`}
                          >
                            <Badge variant="secondary" className={badge.class}>
                              <badge.icon /> {capitalizeFirstLetter(priority)}
                            </Badge>
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="pb-1 flex flex-col">
                <Label className="font-bold mb-2">Due date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-[280px] justify-start text-left font-normal ${
                        !date ? "text-muted-foreground" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <SheetFooter className="mb-8">
            <Button
              type="button"
              disabled={isLoading}
              className="w-full"
              onClick={handleSave}
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
