import { Bookmark } from "lucide-react";

const Saved = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <Bookmark className="h-10 w-10 text-muted-foreground/50 mb-s3" />
      <h2>No saved jobs</h2>
      <p className="mt-s1 text-muted-foreground">
        Jobs you bookmark will appear here for quick access.
      </p>
    </div>
  );
};

export default Saved;
