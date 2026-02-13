import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  prompt?: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, prompt }: SecondaryPanelProps) => {
  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      toast.success("Prompt copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col gap-s3">
      <div>
        <h3 className="mb-s1">{stepTitle}</h3>
        <p className="text-sm text-muted-foreground">{stepDescription}</p>
      </div>

      {prompt && (
        <div className="rounded-md border border-border bg-muted/50 p-s2">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80 font-sans">
            {prompt}
          </pre>
        </div>
      )}

      <div className="flex flex-col gap-s1">
        {prompt && (
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="mr-1" />
            Copy
          </Button>
        )}
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-1" />
          Build in Lovable
        </Button>
        <Button variant="success" size="sm">
          It Worked
        </Button>
        <Button variant="destructive" size="sm">
          Error
        </Button>
      </div>
    </div>
  );
};

export default SecondaryPanel;
