import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobs } from '../api'
import JobCard from '../components/JobCard'
import Loading from '../components/Loading'
export default function JobsPage() {
  const [jobs, setJobs] = useState([]), [search, setSearch] = useState(''), [jobType, setJobType] = useState(''), [loading, setLoading] = useState(true), [error, setError] = useState('')
  useEffect(() => { const timer = setTimeout(async () => { setLoading(true); setError(''); try { const { data } = await getJobs({ search: search || undefined, job_type: jobType || undefined }); setJobs(data) } catch { setError('Could not load jobs. Ensure the Django server is running.') } finally { setLoading(false) } }, 250); return () => clearTimeout(timer) }, [search, jobType])
  return <section><div className="page-title"><div><h1>Open jobs</h1><p>Find your next opportunity.</p></div><Link className="button" to="/jobs/new">Create job</Link></div><div className="filters"><input aria-label="Search jobs" placeholder="Search title, company, or location" value={search} onChange={e => setSearch(e.target.value)} /><select aria-label="Filter by job type" value={jobType} onChange={e => setJobType(e.target.value)}><option value="">All job types</option><option value="full_time">Full time</option><option value="part_time">Part time</option><option value="contract">Contract</option><option value="internship">Internship</option><option value="remote">Remote</option></select></div>{loading ? <Loading /> : error ? <p className="state error">{error}</p> : jobs.length ? <div className="job-grid">{jobs.map(job => <JobCard key={job.id} job={job} />)}</div> : <p className="state">No jobs found.</p>}</section>
}
