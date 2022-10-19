from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('<int:pk>/', views.view_post, name="view-post"),
    path('new/', views.new_post, name="new-post"),
    path('edit/<int:pk>/', views.edit_post, name="edit-post"),
    path('delete/<int:pk>/', views.delete_post, name="delete-post"),
    path('favorite/<int:pk>/', views.favorite_post, name="favorite-post")
]