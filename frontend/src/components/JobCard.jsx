import { Link } from "react-router-dom";
import { formatSalary } from "../formatCurrency";
import { toggleSavedJob, useSavedJobs } from "../savedJobs";
const labels = {
  full_time: "Full time",
  part_time: "Part time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};
export default function JobCard({ job }) {
  const savedJobs = useSavedJobs();
  const isSaved = savedJobs.some(
    (savedJob) => String(savedJob.id) === String(job.id),
  );

  return (
    <article className="job-card">
      <div>
        <h2>{job.title}</h2>
        <p className="company">{job.company}</p>
      </div>
      <span className={job.is_active ? "badge active" : "badge"}>
        {job.is_active ? "Active" : "Inactive"}
      </span>
      <p>
        {job.location} · {labels[job.job_type] || job.job_type}
      </p>
      {job.salary !== null && job.salary !== "" && (
        <p className="salary">
          Salary: {formatSalary(job.salary, job.currency_code)}
        </p>
      )}
      <div className="job-card-actions">
        <Link className="text-link" to={`/jobs/${job.id}`}>
          View job →
        </Link>
        <button
          aria-pressed={isSaved}
          className={`save-button${isSaved ? " is-saved" : ""}`}
          onClick={() => toggleSavedJob(job)}
          type="button"
        >
          {isSaved ? "♥ Saved" : "♡ Save job"}
        </button>
      </div>
    </article>
  );
}
