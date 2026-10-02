import axios from "axios";
const apiBaseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"
  : import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("Set VITE_API_BASE_URL in the production environment.");
}

export const adminUrl =
  import.meta.env.VITE_ADMIN_URL ||
  `${apiBaseUrl.replace(/\/api\/?$/, "")}/admin/`;

const api = axios.create({
  baseURL: apiBaseUrl,
});
export const getJobs = (params) => api.get("/jobs/", { params });
export const getJob = (id) => api.get(`/jobs/${id}/`);
export const createJob = (data) => api.post("/jobs/", data);
export const updateJob = (id, data) => api.put(`/jobs/${id}/`, data);
export const deleteJob = (id) => api.delete(`/jobs/${id}/`);
export default api;
