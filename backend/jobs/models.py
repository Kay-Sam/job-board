from django.core.validators import MinValueValidator, RegexValidator
from django.db import models

class Job(models.Model):
    class JobType(models.TextChoices):
        FULL_TIME = "full_time", "Full time"
        PART_TIME = "part_time", "Part time"
        CONTRACT = "contract", "Contract"
        INTERNSHIP = "internship", "Internship"
        REMOTE = "remote", "Remote"
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    contact_email = models.EmailField(blank=True)
    currency_code = models.CharField(
        max_length=3,
        blank=True,
        validators=[RegexValidator(r"^[A-Z]{3}$", "Enter a 3-letter uppercase currency code, such as NGN, USD, or EUR.")],
        help_text="Optional 3-letter ISO 4217 currency code. Enter a code here; no code change is needed to add currencies.",
    )
    job_type = models.CharField(max_length=20, choices=JobType.choices)
    description = models.TextField()
    salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, validators=[MinValueValidator(0)])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-created_at"]
    def __str__(self):
        return f"{self.title} at {self.company}"
