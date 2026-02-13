import { useMemo, useState } from "react";
import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import { Bookmark } from "lucide-react";

const Saved = () => {
  const { savedIds, isSaved, toggleSave } = useSavedJobs();
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const savedJobs = useMemo(
    () => jobs.filter((j) => savedIds.includes(j.id)),
    [savedIds]
  );

  if (savedJobs.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
        <Bookmark className="h-10 w-10 text-muted-foreground/50 mb-s3" />
        <h2>No saved jobs</h2>
        <p className="mt-s1 text-muted-foreground">
          Jobs you bookmark will appear here for quick access.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-s4 py-s4">
      <h1 className="mb-s1">Saved Jobs</h1>
      <p className="text-muted-foreground mb-s3">
        {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
      </p>

      <div className="grid gap-s2 md:grid-cols-2 xl:grid-cols-3">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSave}
            onView={setViewJob}
          />
        ))}
      </div>

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(open) => {
          if (!open) setViewJob(null);
        }}
      />
    </div>
  );
};

export default Saved;
