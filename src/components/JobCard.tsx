import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Eye,
} from "lucide-react";

interface JobCardProps {
  job: Job & { matchScore?: number };
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onView: (job: Job) => void;
}

const STATUS_KEY = "jobTrackerStatus";
const STATUS_LOG_KEY = "jobTrackerStatusLog";

const statusColors: Record<string, string> = {
  "Not Applied": "bg-gray-200 text-gray-700",
  Applied: "bg-blue-500 text-white",
  Rejected: "bg-red-500 text-white",
  Selected: "bg-green-500 text-white",
};

function postedLabel(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

const JobCard = ({
  job,
  isSaved,
  onToggleSave,
  onView,
}: JobCardProps) => {
  const [status, setStatus] = useState("Not Applied");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STATUS_KEY) || "{}");
    if (stored[job.id]) setStatus(stored[job.id]);
  }, [job.id]);

  const updateStatus = (newStatus: string) => {
    const stored = JSON.parse(localStorage.getItem(STATUS_KEY) || "{}");
    stored[job.id] = newStatus;
    localStorage.setItem(STATUS_KEY, JSON.stringify(stored));

    const log = JSON.parse(localStorage.getItem(STATUS_LOG_KEY) || "[]");
    log.unshift({
      jobId: job.id,
      title: job.title,
      company: job.company,
      status: newStatus,
      date: new Date().toISOString(),
    });
    localStorage.setItem(STATUS_LOG_KEY, JSON.stringify(log));

    setStatus(newStatus);

    alert(`Status updated: ${newStatus}`);
  };

  return (
    <Card className="transition-colors duration-[180ms] hover:border-foreground/20">
      <CardContent className="p-s3 flex flex-col gap-s2">
        <div className="flex items-start justify-between gap-s2">
          <div className="min-w-0 flex-1">
            <h3 className="text-base leading-snug">{job.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {job.company}
            </p>
          </div>

          <Badge className={`text-xs ${statusColors[status]}`}>
            {status}
          </Badge>
        </div>

        {job.matchScore !== undefined && (
          <Badge className="text-xs bg-primary text-white w-fit">
            Match: {job.matchScore}%
          </Badge>
        )}

        <div className="flex flex-wrap items-center gap-x-s3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {job.location} · {job.mode}
          </span>
          <span>
            {job.experience === "Fresher"
              ? "Fresher"
              : `${job.experience} yrs`}
          </span>
        </div>

        <div className="flex gap-1 flex-wrap">
          {["Not Applied", "Applied", "Rejected", "Selected"].map(
            (s) => (
              <Button
                key={s}
                size="sm"
                variant={status === s ? "default" : "outline"}
                onClick={() => updateStatus(s)}
              >
                {s}
              </Button>
            )
          )}
        </div>

        <div className="flex items-center justify-between pt-s1 border-t border-border">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {postedLabel(job.postedDaysAgo)}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => onView(job)}>
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleSave(job.id)}
              className={isSaved ? "text-primary" : ""}
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4 mr-1" />
              ) : (
                <Bookmark className="h-4 w-4 mr-1" />
              )}
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-1" /> Apply
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
