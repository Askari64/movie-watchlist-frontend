import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookmarkPlus,
  CheckCircle,
  Clock,
  PlayCircle,
  StopCircle,
} from "lucide-react";
import { useAddToWatchlist } from "@/hooks/useAddToWatchlist";

type AddToWatchlistProps = {
  movieId: string;
}

function AddToWatchlist({movieId}: AddToWatchlistProps) {

  const {mutate, isPending} = useAddToWatchlist();

  const handleAddToWatchlist = (status: string) => {
    mutate({ movieId, status });
  }

  return (
    <div className="absolute top-2 right-2 z-30">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button disabled={isPending} className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all">
            <BookmarkPlus className="h-3 w-3 text-white" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleAddToWatchlist("PLANNED")}>
            <Clock className="mr-2 h-4 w-4" />
            <span>Planned</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddToWatchlist("WATCHING")}>
            <PlayCircle className="mr-2 h-4 w-4" />
            <span>Watching</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddToWatchlist("COMPLETED")}>
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Completed</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddToWatchlist("DROPPED")}>
            <StopCircle className="mr-2 h-4 w-4" />
            <span>Dropped</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AddToWatchlist;
