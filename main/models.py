from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='authors/', blank=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=200)
    cover = models.ImageField(upload_to='books/', blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    reviews = models.IntegerField()
    published_date = models.DateField()
    url = models.URLField()

    def __str__(self):
        return self.title
