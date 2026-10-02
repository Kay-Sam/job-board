import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("jobs", "0002_job_contact_email"),
    ]

    operations = [
        migrations.AddField(
            model_name="job",
            name="currency_code",
            field=models.CharField(
                blank=True,
                help_text="Optional 3-letter ISO 4217 currency code. Enter a code here; no code change is needed to add currencies.",
                max_length=3,
                validators=[
                    django.core.validators.RegexValidator(
                        "^[A-Z]{3}$",
                        "Enter a 3-letter uppercase currency code, such as NGN, USD, or EUR.",
                    )
                ],
            ),
        ),
    ]
