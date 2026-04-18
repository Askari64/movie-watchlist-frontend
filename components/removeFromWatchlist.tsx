import { Trash2 } from "lucide-react";

function RemoveFromWatchlist() {
  return (
    <div className="absolute top-2 right-2 z-30">
      <button className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all">
        <Trash2 className="h-3 w-3 text-white" />
      </button>
    </div>
  );
}

export default RemoveFromWatchlist;
