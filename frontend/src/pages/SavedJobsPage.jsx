import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import { useSavedJobs } from "../savedJobs";

export default function SavedJobsPage() {
  const savedJobs = useSavedJobs();

  return (
    <section>
      <div className="page-title">
        <div>
                  <h1>Saved jobs</h1>
                  <p>View your saved job listings here.</p>
        </div>
      </div>
      {savedJobs.length ? (
        <div className="job-grid">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="state empty-saved">
          <p>You haven’t saved any jobs yet.</p>
          <Link className="button" to="/jobs">
            Browse jobs
          </Link>
        </div>
      )}
    </section>
  );
}
