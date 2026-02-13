import { useMemo, useState } from "react";
import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Preferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string[];
  minMatchScore: number;
}

const STATUS_LOG_KEY = "jobTrackerStatusLog";

function calculateMatchScore(job: any, preferences: Preferences): number {
  let score = 0;

  const roleKeywords = preferences.roleKeywords.map(k => k.toLowerCase());
  const userSkills = preferences.skills.map(s => s.toLowerCase());

  if (roleKeywords.some(k => job.title.toLowerCase().includes(k))) score += 25;
  if (roleKeywords.some(k => job.description?.toLowerCase().includes(k))) score += 15;
  if (preferences.preferredLocations.includes(job.location)) score += 15;
  if (preferences.preferredMode.includes(job.mode)) score += 10;
  if (preferences.experienceLevel === job.experience) score += 10;

  if (
    job.skills?.some((skill: string) =>
      userSkills.includes(skill.toLowerCase())
    )
  )
    score += 15;

  if (job.postedDaysAgo <= 2) score += 5;
  if (job.source === "LinkedIn") score += 5;

  return Math.min(score, 100);
}

const Digest = () => {
  const [digestJobs, setDigestJobs] = useState<
    (Job & { matchScore: number })[]
  >([]);

  const preferences: Preferences | null = useMemo(() => {
    const stored = localStorage.getItem("jobTrackerPreferences");
    return stored ? JSON.parse(stored) : null;
  }, []);

  const todayKey = `jobTrackerDigest_${new Date()
    .toISOString()
    .split("T")[0]}`;

  const generateDigest = () => {
    if (!preferences) return;

    const existing = localStorage.getItem(todayKey);
    if (existing) {
      setDigestJobs(JSON.parse(existing));
      return;
    }

    const scored = jobs.map((job) => ({
      ...job,
      matchScore: calculateMatchScore(job, preferences),
    }));

    const top10 = scored
      .filter(j => j.matchScore >= preferences.minMatchScore)
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore)
          return b.matchScore - a.matchScore;
        return a.postedDaysAgo - b.postedDaysAgo;
      })
      .slice(0, 10);

    localStorage.setItem(todayKey, JSON.stringify(top10));
    setDigestJobs(top10);
  };

  const copyToClipboard = () => {
    const text = digestJobs
      .map(
        j =>
          `${j.title} - ${j.company} (${j.location}) | ${j.experience} yrs | Match: ${j.matchScore}%`
      )
      .join("\n");

    navigator.clipboard.writeText(text);
    alert("Digest copied to clipboard");
  };

  const createEmailDraft = () => {
    const body = digestJobs
      .map(
        j =>
          `${j.title} - ${j.company} (${j.location}) | ${j.experience} yrs | Match: ${j.matchScore}%`
      )
      .join("%0D%0A");

    window.location.href = `mailto:?subject=My 9AM Job Digest&body=${body}`;
  };

  const statusLog = JSON.parse(
    localStorage.getItem(STATUS_LOG_KEY) || "[]"
  );

  if (!preferences) {
    return (
      <div className="flex-1 flex items-center justify-center text-center px-s4">
        <p className="text-muted-foreground">
          Set preferences to generate a personalized digest.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-s4 py-s4 bg-muted/30">
      <div className="max-w-3xl mx-auto space-y-s4">

        <Button onClick={generateDigest}>
          Generate Today's 9AM Digest (Simulated)
        </Button>

        {digestJobs.length === 0 && (
          <p className="text-muted-foreground text-center mt-s4">
            No matching roles today. Check again tomorrow.
          </p>
        )}

        {digestJobs.length > 0 && (
          <Card className="bg-white shadow-md">
            <CardContent className="p-s4 space-y-s3">

              <div>
                <h2 className="text-xl font-semibold">
                  Top 10 Jobs For You — 9AM Digest
                </h2>
                <p className="text-sm text-muted-foreground">
                  {new Date().toDateString()}
                </p>
              </div>

              {digestJobs.map(job => (
                <div key={job.id} className="border-b pb-s2">
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.company} · {job.location} · {job.experience} yrs
                  </p>
                  <p className="text-sm font-medium">
                    Match Score: {job.matchScore}%
                  </p>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm underline"
                  >
                    Apply
                  </a>
                </div>
              ))}

              <div className="pt-s3 text-sm text-muted-foreground">
                This digest was generated based on your preferences.
              </div>

              <div className="flex gap-s2 pt-s2">
                <Button variant="outline" onClick={copyToClipboard}>
                  Copy Digest to Clipboard
                </Button>
                <Button variant="outline" onClick={createEmailDraft}>
                  Create Email Draft
                </Button>
              </div>

              <div className="text-xs text-muted-foreground pt-s2">
                Demo Mode: Daily 9AM trigger simulated manually.
              </div>

            </CardContent>
          </Card>
        )}

        {statusLog.length > 0 && (
          <Card className="bg-white shadow-sm">
            <CardContent className="p-s3 space-y-s2">
              <h3 className="font-medium">Recent Status Updates</h3>
              {statusLog.slice(0, 5).map((entry: any, idx: number) => (
                <div key={idx} className="text-sm text-muted-foreground">
                  {entry.title} — {entry.company} → {entry.status} (
                  {new Date(entry.date).toLocaleDateString()})
                </div>
              ))}
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
};

export default Digest;
