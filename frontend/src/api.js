import axios from "axios";
const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });
export const getJobs = (params) => api.get("/jobs/", { params });
export const getJob = (id) => api.get(`/jobs/${id}/`);
export const createJob = (data) => api.post("/jobs/", data);
export const updateJob = (id, data) => api.put(`/jobs/${id}/`, data);
export const deleteJob = (id) => api.delete(`/jobs/${id}/`);
export default api;
