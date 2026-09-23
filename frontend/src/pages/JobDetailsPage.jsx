import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteJob, getJob } from "../api";
import Loading from "../components/Loading";
const labels = {
  full_time: "Full time",
  part_time: "Part time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};
export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    getJob(id)
      .then((r) => setJob(r.data))
      .catch(() => setError("This job could not be found."));
  }, [id]);
  const remove = async () => {
    if (!window.confirm("Delete this job listing? This cannot be undone."))
      return;
    try {
      await deleteJob(id);
      navigate("/jobs");
    } catch {
      setError("Unable to delete this job.");
    }
  };
  if (error) return <p className="state error">{error}</p>;
  if (!job) return <Loading>Loading job...</Loading>;
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
          <dd>
            {job.salary ? Number(job.salary).toLocaleString() : "Not specified"}
          </dd>
        </div>
        <div>
          <dt>Posted</dt>
          <dd>{new Date(job.created_at).toLocaleDateString()}</dd>
        </div>
      </dl>
      <h2>Description</h2>
      <p className="description">{job.description}</p>
      <div className="actions">
        <Link className="button" to={`/jobs/${id}/edit`}>
          Edit
        </Link>
        <button className="button danger" onClick={remove}>
          Delete
        </button>
      </div>
    </article>
  );
}
