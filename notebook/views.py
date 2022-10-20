from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from notebook.forms import EntryForm
from notebook.models import Entry


@login_required(login_url='/accounts/login/')
def home(request):
    try:
        context = get_base_context(request)
        entry = Entry.objects.filter(user=request.user).first()
        context['entry'] = entry
        return render(request, 'notebook/post_detail.html', context)
    except:
        return redirect('new-post')


@login_required(login_url='/accounts/login/')
def view_post(request, pk):
    context = get_base_context(request)
    entry = Entry.objects.get(id=pk, user=request.user)
    context['entry'] = entry
    return render(request, 'notebook/post_detail.html', context)


@login_required(login_url='/accounts/login/')
def new_post(request):
    context = get_base_context(request)
    form = EntryForm()

    if request.method == 'POST':
        form = EntryForm(request.POST)
        form.instance.user = request.user
        form.save()
        return redirect('view-post', pk=form.instance.id)

    context['form'] = form
    return render(request, 'notebook/post_new.html', context)


@login_required(login_url='/accounts/login/')
def edit_post(request, pk):
    context = get_base_context(request)
    entry = Entry.objects.get(id=pk)
    form = EntryForm(instance=entry)

    if request.method == 'POST':
        form = EntryForm(request.POST, instance=entry)
        form.save()
        return redirect('view-post', entry.id)

    context['form'] = form
    context['entry'] = entry
    return render(request, 'notebook/post_new.html', context)


@login_required(login_url='/accounts/login/')
def delete_post(request, pk):
    context = get_base_context(request)
    entry = Entry.objects.get(id=pk)

    if request.method == 'POST':
        entry.delete()
        return redirect('home')

    context['entry'] = entry
    return render(request, 'notebook/post_delete.html', context)


@login_required(login_url='/accounts/login/')
def favorite_post(request, pk):
    entry = Entry.objects.get(id=pk)
    entry.favorite = not entry.favorite
    entry.save()
    return redirect('view-post', entry.id)


def get_base_context(request):
    return {
        'favorites': Entry.objects.filter(favorite=True, user=request.user),
        'entries': Entry.objects.filter(user=request.user),
    }