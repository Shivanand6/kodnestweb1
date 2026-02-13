import { Badge } from "@/components/ui/badge";

type StatusType = "not-started" | "in-progress" | "shipped";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: StatusType;
}

const statusLabels: Record<StatusType, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "shipped": "Shipped",
};

const statusStyles: Record<StatusType, string> = {
  "not-started": "border-border bg-muted text-muted-foreground",
  "in-progress": "border-warning bg-warning/10 text-warning",
  "shipped": "border-success bg-success/10 text-success",
};

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b border-border px-s4 py-s2">
      <span className="font-serif text-base font-semibold tracking-tight">
        {projectName}
      </span>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <Badge
        variant="outline"
        className={`text-xs font-medium ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </Badge>
    </header>
  );
};

export default TopBar;
