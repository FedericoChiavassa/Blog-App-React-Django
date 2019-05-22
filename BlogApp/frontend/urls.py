from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    # path('login', views.index),
    # path('register', views.index),
    # path('posts', views.index),
    # path('posts/create-post', views.index),
    # re_path(r'^posts/(?:[0-9]/edit)?$', views.index),
    # re_path(r'^posts/(?:[0-9]/)?$', views.index),
    # re_path(r'^posts/(?:page[0-9]/)?$', views.index),
    # path('about', views.index),
    # path('dashboard', views.index),
    re_path(r'^.*/$', views.index)
]