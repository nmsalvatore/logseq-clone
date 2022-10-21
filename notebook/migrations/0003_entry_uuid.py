# Generated by Django 4.1.2 on 2022-10-21 13:13

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('notebook', '0002_alter_entry_options_entry_recently_viewed'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
