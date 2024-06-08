from django.contrib import admin

from .models import (
    Category,
    Item,
)  # .models means that we are importing the models.py file from the current directory.

admin.site.register(Category)
admin.site.register(Item)
