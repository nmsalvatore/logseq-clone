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
def view_post(request, uuid):
    context = get_base_context(request)
    pk = get_id_from_uuid(uuid)
    entry = Entry.objects.get(id=pk, user=request.user)
    entry.save()
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
        return redirect('view-post', uuid=form.instance.uuid)

    context['form'] = form
    return render(request, 'notebook/post_new.html', context)


@login_required(login_url='/accounts/login/')
def edit_post(request, uuid):
    context = get_base_context(request)
    pk = get_id_from_uuid(uuid)
    entry = Entry.objects.get(id=pk)
    form = EntryForm(instance=entry)

    if request.method == 'POST':
        form = EntryForm(request.POST, instance=entry)
        form.save()
        return redirect('view-post', entry.uuid)

    context['form'] = form
    context['entry'] = entry
    return render(request, 'notebook/post_new.html', context)


@login_required(login_url='/accounts/login/')
def delete_post(request, uuid):
    context = get_base_context(request)
    pk = get_id_from_uuid(uuid)
    entry = Entry.objects.get(id=pk)

    if request.method == 'POST':
        entry.delete()
        return redirect('home')

    context['entry'] = entry
    return render(request, 'notebook/post_delete.html', context)


@login_required(login_url='/accounts/login/')
def favorite_post(request, uuid):
    pk = get_id_from_uuid(uuid)
    entry = Entry.objects.get(id=pk)
    entry.favorite = not entry.favorite
    entry.save()
    return redirect('view-post', entry.uuid)


def get_base_context(request):
    favorites = Entry.objects.filter(favorite=True, user=request.user).order_by('title')
    recently_viewed = Entry.objects.filter(favorite=False, user=request.user)
    return {
        'favorites': favorites,
        'entries': recently_viewed,
    }


def get_id_from_uuid(uuid):
    entry = Entry.objects.get(uuid=uuid)
    return entry.id