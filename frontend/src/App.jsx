import { Link, Navigate, Route, Routes } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobFormPage from "./pages/JobFormPage";
export default function App() {
  return (
    <>
      <header>
        <Link to="/jobs" className="brand">
          Mini Job Board
        </Link>
        <Link to="/jobs/new" className="button small">
          Post a job
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/new" element={<JobFormPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/jobs/:id/edit" element={<JobFormPage />} />
        </Routes>
      </main>
    </>
  );
}
