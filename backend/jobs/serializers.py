from rest_framework import serializers
from .models import Job
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["id", "title", "company", "location", "job_type", "description", "salary", "is_active", "created_at"]
        read_only_fields = ["id", "created_at"]
    def validate_salary(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Salary cannot be negative.")
        return value
