from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('entry/<str:uuid>/', views.view_post, name="view-post"),
    path('new/', views.new_post, name="new-post"),
    path('edit/<str:uuid>/', views.edit_post, name="edit-post"),
    path('delete/<str:uuid>/', views.delete_post, name="delete-post"),
    path('favorite/<str:uuid>/', views.favorite_post, name="favorite-post")
]