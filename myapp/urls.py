# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import PostViewSet

# router = DefaultRouter()
# router.register(r'posts', PostViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

from django.conf import settings
from django.conf.urls.static import static

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('index.html', views.home, name='index'),  
    path('profile/', views.profile, name='profile'),
    path('search/', views.home, name='search'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login', views.LoginView.as_view(), name='login'),
    path('password_reset/', views.password_reset, name='password_reset'),
    path('password_reset_confirm/', views.password_reset_confirm, name='password_reset_confirm'),
    path('register/verify_email', views.VerifyEmailView.as_view(), name='verify_email'),
    path('logout', views.LogoutView.as_view(), name='logout'), 
    path('category/<int:category_id>/', views.articles_by_category, name='articles_by_category'),
    path('turinfo/<int:place_id>/', views.turinfo, name='turinfo'),
    path('rate_place/<int:place_id>/', views.rate_place, name='rate_place'),
    path('like/<int:article_id>/', views.like_article, name='like_article'),
    path('add_to_cart/<int:article_id>/', views.add_to_cart, name='add_to_cart'),
    path('remove-from-cart/<int:article_id>/', views.remove_from_cart, name='remove_from_cart'),  
    path('cart/', views.cart_view, name='cart_view'),
    path('profile/', views.profile_view, name='profile'),
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
