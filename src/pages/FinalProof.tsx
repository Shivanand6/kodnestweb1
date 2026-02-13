import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CHECKLIST_KEY = "jobTrackerTestChecklist";
const PROOF_KEY = "jobTrackerFinalProof";

interface ProofData {
  lovable: string;
  github: string;
  deployed: string;
}

const isValidUrl = (url: string) =>
  /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(url);

const FinalProof = () => {
  const [proof, setProof] = useState<ProofData>({
    lovable: "",
    github: "",
    deployed: "",
  });

  const [testsPassed, setTestsPassed] = useState(false);
  const [shipStatus, setShipStatus] = useState<
    "Not Started" | "In Progress" | "Shipped"
  >("Not Started");

  useEffect(() => {
    const stored = localStorage.getItem(PROOF_KEY);
    if (stored) setProof(JSON.parse(stored));

    const checklist = JSON.parse(
      localStorage.getItem(CHECKLIST_KEY) || "{}"
    );
    const passed =
      Object.keys(checklist).length > 0 &&
      Object.values(checklist).every(Boolean);

    setTestsPassed(passed);
  }, []);

  useEffect(() => {
    localStorage.setItem(PROOF_KEY, JSON.stringify(proof));

    const linksProvided =
      isValidUrl(proof.lovable) &&
      isValidUrl(proof.github) &&
      isValidUrl(proof.deployed);

    if (!linksProvided && !testsPassed) {
      setShipStatus("Not Started");
    } else if (!linksProvided || !testsPassed) {
      setShipStatus("In Progress");
    } else {
      setShipStatus("Shipped");
    }
  }, [proof, testsPassed]);

  const copySubmission = () => {
    const formatted = `
Job Notification Tracker — Final Submission

Lovable Project:
${proof.lovable}

GitHub Repository:
${proof.github}

Live Deployment:
${proof.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`;

    navigator.clipboard.writeText(formatted);
    alert("Final submission copied to clipboard.");
  };

  const badgeColor =
    shipStatus === "Shipped"
      ? "bg-green-500 text-white"
      : shipStatus === "In Progress"
      ? "bg-amber-500 text-white"
      : "bg-gray-300 text-black";

  return (
    <div className="flex-1 px-s4 py-s4 bg-muted/30">
      <div className="max-w-3xl mx-auto space-y-s4">

        <Card className="bg-white shadow-md">
          <CardContent className="p-s4 space-y-s3">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Project 1 — Job Notification Tracker
              </h2>
              <Badge className={badgeColor}>{shipStatus}</Badge>
            </div>

            {/* Step Completion Summary */}
            <div className="space-y-s1">
              <h3 className="font-medium">Step Completion Summary</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                <li>Match scoring engine</li>
                <li>Filter logic</li>
                <li>Status tracking</li>
                <li>Status filter</li>
                <li>Daily digest engine</li>
                <li>Digest persistence</li>
                <li>Test checklist enforced</li>
                <li>Ship lock system</li>
              </ul>
            </div>

            {/* Artifact Collection */}
            <div className="space-y-s2">
              <h3 className="font-medium">Artifact Collection</h3>

              <input
                type="text"
                placeholder="Lovable Project Link"
                value={proof.lovable}
                onChange={(e) =>
                  setProof({ ...proof, lovable: e.target.value })
                }
                className="w-full border p-2 rounded text-sm"
              />

              <input
                type="text"
                placeholder="GitHub Repository Link"
                value={proof.github}
                onChange={(e) =>
                  setProof({ ...proof, github: e.target.value })
                }
                className="w-full border p-2 rounded text-sm"
              />

              <input
                type="text"
                placeholder="Deployed URL"
                value={proof.deployed}
                onChange={(e) =>
                  setProof({ ...proof, deployed: e.target.value })
                }
                className="w-full border p-2 rounded text-sm"
              />
            </div>

            <Button
              variant="outline"
              onClick={copySubmission}
              disabled={shipStatus !== "Shipped"}
            >
              Copy Final Submission
            </Button>

            {shipStatus === "Shipped" && (
              <div className="text-sm text-green-600 pt-s2">
                Project 1 Shipped Successfully.
              </div>
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default FinalProof;
