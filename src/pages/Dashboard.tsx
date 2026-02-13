import { Inbox } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <Inbox className="h-10 w-10 text-muted-foreground/50 mb-s3" />
      <h2>No jobs yet</h2>
      <p className="mt-s1 text-muted-foreground">
        In the next step, you will load a realistic dataset.
      </p>
    </div>
  );
};

export default Dashboard;
