import { Checkbox } from "@/components/ui/checkbox";

interface ProofItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ProofFooterProps {
  items: ProofItem[];
  onToggle: (id: string) => void;
}

const ProofFooter = ({ items, onToggle }: ProofFooterProps) => {
  return (
    <footer className="border-t border-border px-s4 py-s3">
      <div className="flex flex-wrap items-center gap-s4">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-s1 text-sm text-muted-foreground cursor-pointer select-none transition-colors duration-[180ms] hover:text-foreground"
          >
            <Checkbox
              checked={item.checked}
              onCheckedChange={() => onToggle(item.id)}
              className="border-border data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
            {item.label}
          </label>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
