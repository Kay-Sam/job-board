from django.contrib import admin
from .models import Job
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "location", "job_type", "salary", "currency_code", "is_active", "created_at")
    list_filter = ("job_type", "is_active")
    search_fields = ("title", "company", "location", "contact_email")
    ordering = ("-created_at",)
