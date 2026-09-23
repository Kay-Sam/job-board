from django.db import migrations, models
import django.core.validators
class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [migrations.CreateModel(name="Job", fields=[("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")), ("title", models.CharField(max_length=200)), ("company", models.CharField(max_length=200)), ("location", models.CharField(max_length=200)), ("job_type", models.CharField(choices=[("full_time", "Full time"), ("part_time", "Part time"), ("contract", "Contract"), ("internship", "Internship"), ("remote", "Remote")], max_length=20)), ("description", models.TextField()), ("salary", models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True, validators=[django.core.validators.MinValueValidator(0)])), ("is_active", models.BooleanField(default=True)), ("created_at", models.DateTimeField(auto_now_add=True))], options={"ordering": ["-created_at"]})]
