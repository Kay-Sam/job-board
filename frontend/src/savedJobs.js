import { useEffect, useState } from "react";

const STORAGE_KEY = "mini-job-board:saved-jobs";
const CHANGE_EVENT = "mini-job-board:saved-jobs-change";

function readSavedJobs() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value)
      ? value.filter((job) => job && job.id != null)
      : [];
  } catch {
    return [];
  }
}

export function toggleSavedJob(job) {
  const savedJobs = readSavedJobs();
  const isAlreadySaved = savedJobs.some(
    (savedJob) => String(savedJob.id) === String(job.id),
  );
  const updatedJobs = isAlreadySaved
    ? savedJobs.filter((savedJob) => String(savedJob.id) !== String(job.id))
    : [...savedJobs, job];

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState(readSavedJobs);

  useEffect(() => {
    const refresh = () => setSavedJobs(readSavedJobs());
    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return savedJobs;
}
