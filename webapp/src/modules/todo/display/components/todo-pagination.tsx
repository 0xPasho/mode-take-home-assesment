import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "../store/todo-store";
import useTodoApi from "../hooks/use-todo-api";

export function TodoPagination() {
  const { paginationData, isRetrievingData, items, viewingPage } =
    useTodoStore();
  const { fetchTodos } = useTodoApi();

  const maxPages = Math.floor(paginationData.total / paginationData.limit) + 1;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= maxPages) {
      fetchTodos(newPage);
    }
  };

  return (
    <div
      className="flex items-center justify-end px-2 py-2"
      key={`${items.length}`}
    >
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center justify-center text-sm font-medium">
          Per page: {paginationData.limit}, Total: {paginationData.total}
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {viewingPage}/{paginationData.total > 0 ? maxPages : 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(viewingPage - 1)}
            disabled={viewingPage <= 1 || isRetrievingData}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(viewingPage + 1)}
            disabled={viewingPage >= maxPages || isRetrievingData}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
