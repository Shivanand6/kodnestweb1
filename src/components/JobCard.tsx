import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onView: (job: Job) => void;
}

const sourceBadgeStyle: Record<string, string> = {
  LinkedIn: "border-[hsl(210,80%,40%)] text-[hsl(210,80%,40%)] bg-[hsl(210,80%,96%)]",
  Naukri: "border-[hsl(260,50%,50%)] text-[hsl(260,50%,50%)] bg-[hsl(260,50%,96%)]",
  Indeed: "border-[hsl(210,15%,45%)] text-[hsl(210,15%,45%)] bg-[hsl(210,15%,96%)]",
};

function postedLabel(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

const JobCard = ({ job, isSaved, onToggleSave, onView }: JobCardProps) => {
  return (
    <Card className="transition-colors duration-[180ms] hover:border-foreground/20">
      <CardContent className="p-s3 flex flex-col gap-s2">
        {/* Header row */}
        <div className="flex items-start justify-between gap-s2">
          <div className="min-w-0 flex-1">
            <h3 className="text-base leading-snug">{job.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
          </div>
          <Badge variant="outline" className={`shrink-0 text-xs ${sourceBadgeStyle[job.source] || ""}`}>
            {job.source}
          </Badge>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-s3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {job.location} · {job.mode}
          </span>
          <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
          <span className="font-medium text-foreground">{job.salaryRange}</span>
        </div>

        {/* Footer row */}
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
              {isSaved ? <BookmarkCheck className="h-4 w-4 mr-1" /> : <Bookmark className="h-4 w-4 mr-1" />}
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
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
