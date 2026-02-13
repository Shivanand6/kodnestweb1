import { Mail } from "lucide-react";

const Digest = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <Mail className="h-10 w-10 text-muted-foreground/50 mb-s3" />
      <h2>No digests yet</h2>
      <p className="mt-s1 text-muted-foreground">
        Your daily 9AM digest summaries will be collected here.
      </p>
    </div>
  );
};

export default Digest;
