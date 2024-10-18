import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

const priorities: Array<TodoPriorityType> = ["low", "medium", "high"];

export function CreateTodoDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState<TodoPriorityType>("low");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { createTodo } = useTodoApi();
  const handleSave = async () => {
    const newTodo = {
      title,
      details,
      priority,
      date,
    };
    console.log("Saving todo:", newTodo);
    // Handle save logic here (e.g., API call or state update)
    const response = await createTodo({
      description: details,
      dueDate: date ? date.toISOString() : undefined,
      priority,
      title,
    });
    console.log({ response });
  };

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
              className="min-h-[200px]"
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
                <Label className="font-bold">Priority</Label>
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
                <Label className="font-bold">Due date</Label>
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
            <SheetClose asChild>
              <Button type="submit" className="w-full" onClick={handleSave}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
