from django.shortcuts import render, redirect

from notebook.forms import EntryForm
from notebook.models import Entry

def home(request):
    context = get_base_context()
    context['entry'] = Entry.objects.first()
    return render(request, 'notebook/post_detail.html', context)


def view_post(request, pk):
    context = get_base_context()
    entry = Entry.objects.get(id=pk)
    context['entry'] = entry
    return render(request, 'notebook/post_detail.html', context)


def new_post(request):
    context = get_base_context()
    form = EntryForm()

    if request.method == 'POST':
        form = EntryForm(request.POST)
        form.instance.author = request.user
        form.save()
        return redirect('view-post', pk=form.instance.id)

    context['form'] = form
    return render(request, 'notebook/post_new.html', context)


def edit_post(request, pk):
    context = get_base_context()
    entry = Entry.objects.get(id=pk)
    form = EntryForm(instance=entry)

    if request.method == 'POST':
        form = EntryForm(request.POST, instance=entry)
        form.save()
        return redirect('view-post', entry.id)

    context['form'] = form
    context['entry'] = entry
    return render(request, 'notebook/post_new.html', context)


def delete_post(request, pk):
    entry = Entry.objects.get(id=pk)
    entry.delete()
    return redirect('home')


def get_base_context():
    return {
        'favorites': Entry.objects.filter(favorite=True),
        'entries': Entry.objects.all(),    
    }