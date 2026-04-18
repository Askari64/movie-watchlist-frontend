import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, Clock, PlayCircle, StopCircle } from "lucide-react";
import { useUpdateWatchlistItem } from "@/hooks/useUpdateWatchlistItem";
import { Button } from "./ui/button";

type UpdateWatchlistItemButtonProps = {
  watchlistItemId: string; // This is the watchlist item ID, not movieId!
  currentStatus: string;
};

function UpdateWatchlistItemButton({
  watchlistItemId,
  currentStatus,
}: UpdateWatchlistItemButtonProps) {
  const { mutate, isPending } = useUpdateWatchlistItem();

  const handleUpdateStatus = (status: string) => {
    mutate({ watchlistItemId, status });
  };

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={isPending} variant="outline" className="w-full">
            {currentStatus}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleUpdateStatus("PLANNED")}>
            <Clock className="mr-2 h-4 w-4" />
            <span>Planned</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdateStatus("WATCHING")}>
            <PlayCircle className="mr-2 h-4 w-4" />
            <span>Watching</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdateStatus("COMPLETED")}>
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Completed</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdateStatus("DROPPED")}>
            <StopCircle className="mr-2 h-4 w-4" />
            <span>Dropped</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UpdateWatchlistItemButton;
