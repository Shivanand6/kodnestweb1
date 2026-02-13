import { useMemo, useState } from "react";
import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import FilterBar, { Filters } from "@/components/FilterBar";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
};

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const { isSaved, toggleSave } = useSavedJobs();

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location))).sort(),
    []
  );

  const filtered = useMemo(() => {
    let result = [...jobs];

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw)
      );
    }
    if (filters.location !== "all")
      result = result.filter((j) => j.location === filters.location);
    if (filters.mode !== "all")
      result = result.filter((j) => j.mode === filters.mode);
    if (filters.experience !== "all")
      result = result.filter((j) => j.experience === filters.experience);
    if (filters.source !== "all")
      result = result.filter((j) => j.source === filters.source);

    result.sort((a, b) =>
      filters.sort === "latest"
        ? a.postedDaysAgo - b.postedDaysAgo
        : b.postedDaysAgo - a.postedDaysAgo
    );

    return result;
  }, [filters]);

  return (
    <div className="flex-1 px-s4 py-s4">
      <h1 className="mb-s1">Dashboard</h1>
      <p className="text-muted-foreground mb-s3">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
      </p>

      <FilterBar filters={filters} onChange={setFilters} locations={locations} />

      <div className="mt-s3 grid gap-s2 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSave}
            onView={setViewJob}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-s5 text-center">
          <h3 className="text-muted-foreground">No matching jobs</h3>
          <p className="text-sm text-muted-foreground mt-s1">
            Try adjusting your filters to see more results.
          </p>
        </div>
      )}

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

export default Dashboard;
