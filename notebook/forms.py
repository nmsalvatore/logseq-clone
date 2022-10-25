from django import forms
from django.forms import ModelForm
from .models import Entry

class EntryForm(ModelForm):
    class Meta:
        model = Entry
        fields = ['title','body', 'favorite']
        widgets = {
            'title': forms.TextInput(attrs={
                'placeholder': 'New entry', 
                'autofocus': True,
                'autocomplete': 'off'
            }),
            'body': forms.Textarea(attrs={
                'placeholder': "What's on your mind?",
                'autocomplete': 'off',
                'rows': 1
            }),
        }