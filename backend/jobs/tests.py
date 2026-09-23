from rest_framework import status
from rest_framework.test import APITestCase
from .models import Job

class JobApiTests(APITestCase):
    def payload(self, **overrides):
        data = {"title": "Django Developer", "company": "Acme", "location": "Lagos", "job_type": "full_time", "description": "Build APIs.", "salary": "50000.00", "is_active": True}
        data.update(overrides)
        return data
    def create_job(self): return Job.objects.create(**self.payload())
    def test_create_job(self):
        response = self.client.post("/api/jobs/", self.payload(), format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED); self.assertEqual(Job.objects.count(), 1)
    def test_list_jobs(self):
        self.create_job(); response = self.client.get("/api/jobs/")
        self.assertEqual(response.status_code, status.HTTP_200_OK); self.assertEqual(len(response.data), 1)
    def test_retrieve_job(self):
        job = self.create_job(); response = self.client.get(f"/api/jobs/{job.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK); self.assertEqual(response.data["title"], job.title)
    def test_update_job(self):
        job = self.create_job(); response = self.client.patch(f"/api/jobs/{job.id}/", {"title": "Senior Django Developer"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK); job.refresh_from_db(); self.assertEqual(job.title, "Senior Django Developer")
    def test_delete_job(self):
        job = self.create_job(); response = self.client.delete(f"/api/jobs/{job.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT); self.assertFalse(Job.objects.filter(pk=job.pk).exists())
    def test_invalid_job_type(self):
        response = self.client.post("/api/jobs/", self.payload(job_type="temporary"), format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST); self.assertIn("job_type", response.data)
    def test_negative_salary(self):
        response = self.client.post("/api/jobs/", self.payload(salary="-1.00"), format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST); self.assertIn("salary", response.data)
