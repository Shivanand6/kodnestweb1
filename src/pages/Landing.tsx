import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <h1 className="text-4xl md:text-5xl leading-tight max-w-xl text-balance">
        Stop Missing The Right Jobs.
      </h1>
      <p className="mt-s3 text-lg text-muted-foreground max-w-md">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Button asChild size="lg" className="mt-s4">
        <Link to="/settings">
          Start Tracking
          <ArrowRight className="ml-1" />
        </Link>
      </Button>
    </div>
  );
};

export default Landing;
