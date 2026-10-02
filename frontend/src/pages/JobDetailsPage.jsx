import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJob } from "../api";
import Loading from "../components/Loading";
import { formatSalary } from "../formatCurrency";
import { toggleSavedJob, useSavedJobs } from "../savedJobs";
const labels = {
  full_time: "Full time",
  part_time: "Part time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};
export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null),
    [error, setError] = useState(""),
    [shareMessage, setShareMessage] = useState("");
  const savedJobs = useSavedJobs();
  useEffect(() => {
    getJob(id)
      .then((r) => setJob(r.data))
      .catch(() => setError("This job could not be found."));
  }, [id]);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: job.title,
          text: `${job.title} at ${job.company}`,
          url,
        });
        setShareMessage("Job shared.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareMessage("Job link copied.");
      } else {
        window.prompt("Copy this job link:", url);
      }
    } catch (shareError) {
      if (shareError.name !== "AbortError")
        setShareMessage("Could not share this job link.");
    }
  };
  if (error) return <p className="state error">{error}</p>;
  if (!job) return <Loading>Loading job...</Loading>;
  const isSaved = savedJobs.some(
    (savedJob) => String(savedJob.id) === String(job.id),
  );
  return (
    <article className="details">
      <Link className="text-link" to="/jobs">
        ← Back to jobs
      </Link>
      <div className="details-head">
        <div>
          <h1>{job.title}</h1>
          <p className="company">{job.company}</p>
        </div>
        <span className={job.is_active ? "badge active" : "badge"}>
          {job.is_active ? "Active" : "Inactive"}
        </span>
      </div>
      <dl>
        <div>
          <dt>Location</dt>
          <dd>{job.location}</dd>
        </div>
        <div>
          <dt>Job type</dt>
          <dd>{labels[job.job_type]}</dd>
        </div>
        <div>
          <dt>Salary</dt>
          <dd>{formatSalary(job.salary, job.currency_code)}</dd>
        </div>
        <div>
          <dt>Posted</dt>
          <dd>{new Date(job.created_at).toLocaleDateString()}</dd>
        </div>
      </dl>
      <h2>Description</h2>
      <p className="description">{job.description}</p>
      {job.contact_email && (
        <a
          className="button contact-button"
          href={`mailto:${job.contact_email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
        >
          Contact HR / Apply by email
        </a>
      )}
      {job.contact_email && (
        <p className="contact-note">
          This opens your email app; applications are not submitted or tracked
          on this site.
        </p>
      )}
      <div className="actions">
        <button
          className={`button save-button${isSaved ? " is-saved" : ""}`}
          onClick={() => toggleSavedJob(job)}
          aria-pressed={isSaved}
        >
          {isSaved ? "♥ Saved" : "♡ Save job"}
        </button>
        <button className="button" onClick={share}>
          Share job
        </button>
        <span className="share-message" aria-live="polite">
          {shareMessage}
        </span>
      </div>
    </article>
  );
}
