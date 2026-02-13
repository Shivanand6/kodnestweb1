import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "jobTrackerTestChecklist";

interface TestItem {
  id: string;
  label: string;
  help: string;
}

const testItems: TestItem[] = [
  { id: "pref", label: "Preferences persist after refresh", help: "Set preferences, refresh page, confirm values remain." },
  { id: "score", label: "Match score calculates correctly", help: "Check match badge reflects scoring rules." },
  { id: "toggle", label: '"Show only matches" toggle works', help: "Enable toggle and verify filtering by threshold." },
  { id: "save", label: "Save job persists after refresh", help: "Save a job, refresh, confirm saved state remains." },
  { id: "apply", label: "Apply opens in new tab", help: "Click Apply and confirm new browser tab opens." },
  { id: "status", label: "Status update persists after refresh", help: "Change status, refresh, confirm persistence." },
  { id: "statusFilter", label: "Status filter works correctly", help: "Filter by status and verify correct jobs appear." },
  { id: "digestTop10", label: "Digest generates top 10 by score", help: "Generate digest and verify sorting logic." },
  { id: "digestPersist", label: "Digest persists for the day", help: "Refresh digest page and confirm same results." },
  { id: "console", label: "No console errors on main pages", help: "Open DevTools console and confirm no red errors." },
];

const Proof = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setChecked(JSON.parse(stored));
    } else {
      const initial: Record<string, boolean> = {};
      testItems.forEach(item => (initial[item.id] = false));
      setChecked(initial);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = (id: string) => {
    setChecked(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetChecklist = () => {
    const reset: Record<string, boolean> = {};
    testItems.forEach(item => (reset[item.id] = false));
    setChecked(reset);
  };

  const passed = Object.values(checked).filter(Boolean).length;

  return (
    <div className="flex-1 px-s4 py-s4 bg-muted/30">
      <div className="max-w-3xl mx-auto space-y-s4">

        <Card className="bg-white shadow-md">
          <CardContent className="p-s4 space-y-s3">

            <div>
              <h2 className="text-xl font-semibold">Release Test Checklist</h2>
              <p className="text-sm text-muted-foreground">
                Tests Passed: {passed} / {testItems.length}
              </p>
            </div>

            {passed < testItems.length && (
              <div className="text-sm text-amber-600">
                Resolve all issues before shipping.
              </div>
            )}

            <div className="space-y-s2">
              {testItems.map(item => (
                <div key={item.id} className="flex items-start gap-s2 border-b pb-s2">
                  <input
                    type="checkbox"
                    checked={checked[item.id] || false}
                    onChange={() => toggle(item.id)}
                  />
                  <div>
                    <p className="text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      How to test: {item.help}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" onClick={resetChecklist}>
              Reset Test Status
            </Button>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Proof;
