# Generated by Django 4.2.20 on 2025-04-18 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0002_author_remove_book_description_book_cover_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="book",
            name="url",
            field=models.URLField(default=""),
            preserve_default=False,
        ),
    ]
