import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createJob, getJob, updateJob } from "../api";
import JobForm from "../components/JobForm";
import Loading from "../components/Loading";
export default function JobFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null),
    [loading, setLoading] = useState(Boolean(id)),
    [submitting, setSubmitting] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    if (id)
      getJob(id)
        .then((r) => setJob(r.data))
        .catch(() => setError("This job could not be found."))
        .finally(() => setLoading(false));
  }, [id]);
  const save = async (data) => {
    setSubmitting(true);
    try {
      const response = id ? await updateJob(id, data) : await createJob(data);
      navigate(`/jobs/${response.data.id}`);
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return <Loading>Loading job...</Loading>;
  if (error) return <p className="state error">{error}</p>;
  return (
    <section className="form-page">
      <Link className="text-link" to={id ? `/jobs/${id}` : "/jobs"}>
        ← Cancel
      </Link>
      <h1>{id ? "Edit job" : "Create a job"}</h1>
      <JobForm job={job} onSubmit={save} submitting={submitting} />
    </section>
  );
}
