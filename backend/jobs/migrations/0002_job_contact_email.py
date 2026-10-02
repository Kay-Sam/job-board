from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("jobs", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="job",
            name="contact_email",
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]