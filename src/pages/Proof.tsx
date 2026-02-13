import { ClipboardCheck } from "lucide-react";

const Proof = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <ClipboardCheck className="h-10 w-10 text-muted-foreground/50 mb-s3" />
      <h2>Proof of Work</h2>
      <p className="mt-s1 text-muted-foreground">
        Artifacts, screenshots, and build evidence will be collected here.
      </p>
    </div>
  );
};

export default Proof;
