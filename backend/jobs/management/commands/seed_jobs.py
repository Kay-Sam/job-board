from django.core.management.base import BaseCommand
from jobs.models import Job

class Command(BaseCommand):
    help = "Create example job listings without duplicating them."
    def handle(self, *args, **options):
        jobs = [("Django Backend Developer", "Acme Technologies", "Lagos, Nigeria", "full_time", "Build reliable APIs with Django and Django REST Framework.", "120000.00"), ("React Frontend Developer", "Bright Labs", "Remote", "remote", "Create accessible, polished React interfaces.", "110000.00"), ("Junior Full Stack Developer", "Launchpad", "Abuja, Nigeria", "full_time", "Support product features across our Django and React stack.", "75000.00"), ("UI/UX Design Intern", "Studio North", "Lagos, Nigeria", "internship", "Help research and design straightforward product experiences.", None), ("Python Developer", "DataWorks", "Ibadan, Nigeria", "contract", "Develop Python integrations and automation tools.", "90000.00")]
        for title, company, location, job_type, description, salary in jobs:
            _, created = Job.objects.get_or_create(title=title, defaults={"company": company, "location": location, "job_type": job_type, "description": description, "salary": salary})
            self.stdout.write(self.style.SUCCESS(f"{'Created' if created else 'Exists'}: {title}"))
