from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.db.models import Q

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


@login_required(login_url='/accounts/login')
def search_posts(request):
    context = get_base_context(request)
    search_text = request.GET.get('q')
    search_results = Entry.objects.filter(
        Q(title__icontains=search_text) | Q(body__icontains=search_text)
    )
    context['search_text'] = search_text
    context['entries'] = search_results
    return render(request, 'notebook/posts_search.html', context)


def get_base_context(request):
    favorites = Entry.objects.filter(favorite=True, user=request.user).order_by('title')
    recently_viewed = Entry.objects.filter(favorite=False, user=request.user).order_by('-recently_viewed')
    return {
        'favorites': favorites,
        'recently_viewed': recently_viewed[:5],
    }


def get_id_from_uuid(uuid):
    entry = Entry.objects.get(uuid=uuid)
    return entry.id