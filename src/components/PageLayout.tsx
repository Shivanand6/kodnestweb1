import { ReactNode } from "react";
import TopBar from "./TopBar";
import ContextHeader from "./ContextHeader";
import ProofFooter from "./ProofFooter";

interface ProofItem {
  id: string;
  label: string;
  checked: boolean;
}

interface PageLayoutProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "not-started" | "in-progress" | "shipped";
  headline: string;
  subtext: string;
  proofItems: ProofItem[];
  onProofToggle: (id: string) => void;
  children: ReactNode;
  secondaryPanel?: ReactNode;
}

const PageLayout = ({
  projectName,
  currentStep,
  totalSteps,
  status,
  headline,
  subtext,
  proofItems,
  onProofToggle,
  children,
  secondaryPanel,
}: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        projectName={projectName}
        currentStep={currentStep}
        totalSteps={totalSteps}
        status={status}
      />
      <ContextHeader headline={headline} subtext={subtext} />

      <main className="flex flex-1">
        <div className={secondaryPanel ? "w-[70%] border-r border-border p-s4" : "w-full p-s4"}>
          {children}
        </div>
        {secondaryPanel && (
          <aside className="w-[30%] p-s4">
            {secondaryPanel}
          </aside>
        )}
      </main>

      <ProofFooter items={proofItems} onToggle={onProofToggle} />
    </div>
  );
};

export default PageLayout;
