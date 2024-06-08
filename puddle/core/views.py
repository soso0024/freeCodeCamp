from django.shortcuts import render

from item.models import Category, Item


# Create your views here.
def index(request):
    items = Item.objects.filter(is_sold=False)[0:6]
    categories = Category.objects.all()

    return render(
        request,
        "core/index.html",
        {
            "categories": categories,
            "items": items,
        },
    )  # This is the view that will be rendered when the user visits the site. It will render the index.html file in the core directory. This file will be created in the next step.


def contact(request):
    return render(request, "core/contact.html")
