import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MapPin, ExternalLink } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailModal = ({ job, open, onOpenChange }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl">{job.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {job.company} · {job.location} · {job.mode}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-s3 mt-s2">
          <div className="flex items-center gap-s2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{job.location} · {job.mode}</span>
          </div>

          <div className="text-sm">
            <span className="font-medium">Experience:</span>{" "}
            <span className="text-muted-foreground">
              {job.experience === "Fresher" ? "Fresher" : `${job.experience} years`}
            </span>
          </div>

          <div className="text-sm">
            <span className="font-medium">Salary:</span>{" "}
            <span className="text-muted-foreground">{job.salaryRange}</span>
          </div>

          <div>
            <span className="text-sm font-medium">Skills</span>
            <div className="flex flex-wrap gap-1 mt-s1">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm font-medium">Description</span>
            <p className="mt-s1 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {job.description}
            </p>
          </div>

          <Button asChild className="mt-s1">
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" /> Apply Now
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
