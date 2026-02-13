import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import SecondaryPanel from "@/components/SecondaryPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

const Index = () => {
  const [proofItems, setProofItems] = useState([
    { id: "ui", label: "UI Built", checked: false },
    { id: "logic", label: "Logic Working", checked: false },
    { id: "test", label: "Test Passed", checked: false },
    { id: "deploy", label: "Deployed", checked: false },
  ]);

  const handleProofToggle = (id: string) => {
    setProofItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <PageLayout
      projectName="KodNest Premium"
      currentStep={1}
      totalSteps={5}
      status="not-started"
      headline="Design System Confirmation"
      subtext="Review the core components and tokens that define this build system."
      proofItems={proofItems}
      onProofToggle={handleProofToggle}
      secondaryPanel={
        <SecondaryPanel
          stepTitle="Getting Started"
          stepDescription="This panel provides context and actions for each step of your build process."
          prompt="Design system has been initialized with Lora serif headings, IBM Plex Sans body, deep red accent, and a strict 8px spacing scale."
        />
      }
    >
      <div className="flex flex-col gap-s4">
        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-s3">
            <div>
              <h1>Heading One — Lora Serif</h1>
              <h2 className="mt-s1">Heading Two — Confident & Clear</h2>
              <h3 className="mt-s1">Heading Three — Section Level</h3>
            </div>
            <p className="text-muted-foreground">
              Body text uses IBM Plex Sans at 16px with 1.7 line-height. Maximum width is capped at 720px for optimal readability. Every typographic decision serves clarity.
            </p>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Color System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-s2">
              {[
                { name: "Background", className: "bg-background border border-border" },
                { name: "Foreground", className: "bg-foreground" },
                { name: "Primary", className: "bg-primary" },
                { name: "Success", className: "bg-success" },
                { name: "Warning", className: "bg-warning" },
                { name: "Muted", className: "bg-muted border border-border" },
              ].map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-s1">
                  <div className={`h-12 w-12 rounded-md ${color.className}`} />
                  <span className="text-xs text-muted-foreground">{color.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-s2">
              <Button>Primary Action</Button>
              <Button variant="outline">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-s2 max-w-md">
            <Input placeholder="Default input state" />
            <Input placeholder="Disabled input" disabled />
          </CardContent>
        </Card>

        {/* Status Confirmation */}
        <Card className="border-success/30">
          <CardContent className="flex items-center gap-s2 py-s3">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm font-medium">
              Design system initialized. All tokens, components, and layout structures are ready.
            </span>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Index;
