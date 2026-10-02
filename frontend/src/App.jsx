import { Link, Navigate, Route, Routes } from "react-router-dom";
import { adminUrl } from "./api";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
export default function App() {
  return (
    <>
      <header>
        <Link to="/jobs" className="brand">
          Mini Job Board
        </Link>
        <a
          href={adminUrl}
          className="button small"
          target="_blank"
          rel="noreferrer"
        >
          Staff admin
        </a>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<JobsPage />} />
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
