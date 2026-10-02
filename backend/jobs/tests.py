from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Job

class JobApiTests(APITestCase):
    def setUp(self):
        self.staff = get_user_model().objects.create_user(username="staff", password="test-password", is_staff=True)
        self.client.force_authenticate(user=self.staff)

    def payload(self, **overrides):
        data = {"title": "Django Developer", "company": "Acme", "location": "Lagos", "job_type": "full_time", "description": "Build APIs.", "salary": "50000.00", "currency_code": "NGN", "is_active": True}
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

    def test_contact_email_is_returned(self):
        response = self.client.post("/api/jobs/", self.payload(contact_email="hr@example.com"), format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["contact_email"], "hr@example.com")

    def test_invalid_contact_email_is_rejected(self):
        response = self.client.post("/api/jobs/", self.payload(contact_email="not-an-email"), format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("contact_email", response.data)

    def test_currency_code_is_returned(self):
        response = self.client.post("/api/jobs/", self.payload(currency_code="EUR"), format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["currency_code"], "EUR")

    def test_currency_code_must_be_three_uppercase_letters(self):
        response = self.client.post("/api/jobs/", self.payload(currency_code="nzdollar"), format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("currency_code", response.data)

    def test_anonymous_user_can_list_and_retrieve_jobs(self):
        job = self.create_job()
        self.client.force_authenticate(user=None)
        self.assertEqual(self.client.get("/api/jobs/").status_code, status.HTTP_200_OK)
        self.assertEqual(self.client.get(f"/api/jobs/{job.id}/").status_code, status.HTTP_200_OK)

    def test_anonymous_user_cannot_write_jobs(self):
        self.client.force_authenticate(user=None)
        self.assertEqual(self.client.post("/api/jobs/", self.payload(), format="json").status_code, status.HTTP_403_FORBIDDEN)
        job = self.create_job()
        self.assertEqual(self.client.patch(f"/api/jobs/{job.id}/", {"title": "Changed"}, format="json").status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(self.client.delete(f"/api/jobs/{job.id}/").status_code, status.HTTP_403_FORBIDDEN)

    def test_authenticated_non_staff_user_cannot_write_jobs(self):
        user = get_user_model().objects.create_user(username="visitor", password="test-password")
        self.client.force_authenticate(user=user)
        self.assertEqual(self.client.post("/api/jobs/", self.payload(), format="json").status_code, status.HTTP_403_FORBIDDEN)

    def test_public_user_cannot_view_inactive_job(self):
        job = self.create_job()
        job.is_active = False
        job.save(update_fields=["is_active"])
        self.client.force_authenticate(user=None)
        self.assertEqual(self.client.get("/api/jobs/").data, [])
        self.assertEqual(self.client.get(f"/api/jobs/{job.id}/").status_code, status.HTTP_404_NOT_FOUND)
