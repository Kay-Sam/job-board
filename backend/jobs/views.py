from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from .models import Job
from .serializers import JobSerializer
class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    filter_backends = [SearchFilter]
    search_fields = ["title", "company", "location"]
    def get_queryset(self):
        queryset = Job.objects.all()
        if self.action != "list":
            return queryset
        job_type = self.request.query_params.get("job_type")
        if job_type:
            queryset = queryset.filter(job_type=job_type)
        active = self.request.query_params.get("is_active")
        if active is None:
            return queryset.filter(is_active=True)
        if active.lower() in ("true", "1"):
            return queryset.filter(is_active=True)
        if active.lower() in ("false", "0"):
            return queryset.filter(is_active=False)
        return queryset
