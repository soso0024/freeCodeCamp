from django.shortcuts import render, redirect

from item.models import Category, Item

from .forms import SingnupForm


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
    )  # This is the view that will be rendered when the user visits the site. It will render the index.html file in the core directory.


def contact(request):
    return render(request, "core/contact.html")


def signup(request):
    if request.method == "POST":
        form = SingnupForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect("/login/")
    else:
        form = SingnupForm()

    return render(request, "core/signup.html", {"form": form})
