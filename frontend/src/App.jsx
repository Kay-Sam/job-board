import { Link, Navigate, Route, Routes } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import SavedJobsPage from "./pages/SavedJobsPage";
import { useSavedJobs } from "./savedJobs";
export default function App() {
  const savedJobs = useSavedJobs();

  return (
    <>
      <header>
        <Link to="/jobs" className="brand">
          Mini Job Board
        </Link>
        <nav aria-label="Main navigation" className="header-nav">
          <Link className="header-link" to="/saved">
            Saved jobs ({savedJobs.length})
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/saved" element={<SavedJobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/jobs/new" element={<Navigate to="/jobs" replace />} />
          <Route
            path="/jobs/:id/edit"
            element={<Navigate to="/jobs" replace />}
          />
        </Routes>
      </main>
    </>
  );
}
