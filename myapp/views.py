from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User

from django.http import JsonResponse
# import
from django.core.mail import send_mail
from django.views import View
from .models import User, TemporaryAccountData, TourismPlace, Reclama, Category, Comment, Rating, Like, Article, Cart, CartItem
from django.contrib import messages
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def home(request):
    query = request.GET.get('query', '')
    if query:
        
        places = TourismPlace.objects.filter(
            Q(title__icontains=query) | Q(text__icontains=query)
        )
    else:
        places = TourismPlace.objects.all()

    news = Reclama.objects.all()
    categories = Category.objects.all()
    cart_items = []
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
        cart_items = CartItem.objects.filter(cart=cart)
    return render(request, 'index.html', {"places": places, "news": news, 'categories': categories, 'cart_items': cart_items})

def articles_by_category(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    articles = category.articles.all()
    user_likes = Like.objects.filter(user=request.user, liked=True).values_list('article_id', flat=True) if request.user.is_authenticated else []
    return render(request, 'pages/M_one.html', {'articles': articles, 'category': category, 'user_likes': user_likes})

from django.utils import timezone

from django.http import HttpResponseRedirect

def rate_place(request, place_id):
    place = get_object_or_404(TourismPlace, id=place_id)
    if request.method == 'POST' and request.user.is_authenticated:
        stars = request.POST.get('rate')
        Rating.objects.update_or_create(
            user=request.user, place=place,
            defaults={'stars': stars}
        )
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    return HttpResponseRedirect('/login/')

@csrf_exempt
def like_article(request, article_id):
    if request.method == 'POST':
        article = get_object_or_404(Article, id=article_id)
        like, created = Like.objects.get_or_create(user=request.user, article=article)

        if not created:
            like.liked = not like.liked
            like.save()

        return JsonResponse({'liked': like.liked})

    return JsonResponse({'error': 'Yaroqsiz so‘rov'}, status=400)



@csrf_exempt
def add_to_cart(request, article_id):
    if request.method == 'POST':
        article = get_object_or_404(Article, id=article_id)

        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
            category = article.category
            category_article_count = CartItem.objects.filter(cart=cart, article__category=category).count()
            max_articles_per_category = category.max_articles_per_category

            if category_article_count >= max_articles_per_category:
                return JsonResponse({'status': 'error', 'message': f"Bu kategoriyadan {max_articles_per_category} ta mahsulotdan ko'p qo'sha olmaysiz."})
            
            cart_item_exists = CartItem.objects.filter(cart=cart, article=article).exists()
            if not cart_item_exists:
                CartItem.objects.create(cart=cart, article=article)
                return JsonResponse({'status': 'success', 'message': "Mahsulot savatchaga qo'shildi."})
            else:
                return JsonResponse({'status': 'info', 'message': "Bu mahsulot allaqachon savatchada mavjud."})
        
        return JsonResponse({'status': 'error', 'message': "Iltimos, avval tizimga kiring."})
    
    return JsonResponse({'status': 'error', 'message': "Yaroqsiz so'rov."})

def remove_from_cart(request, article_id):
    article = get_object_or_404(Article, id=article_id)

    if request.user.is_authenticated:
        cart = get_object_or_404(Cart, user=request.user)
        CartItem.objects.filter(cart=cart, article=article).delete()
    else:
        return redirect('login')
    return redirect('cart_view') 

def cart_view(request):
    cart_items = []
    total_price = 0 
    images = []

    if request.user.is_authenticated:
        cart = get_object_or_404(Cart, user=request.user)
        cart_items = CartItem.objects.filter(cart=cart)

        for item in cart_items:
            total_price += item.article.price

        for item in cart_items:
            images.append(item.article.img.url)

        cart_data = {
            'duration': cart.duration,
            'places_count': cart.places_count,
            'views': cart.views,
            'phone_number': cart.phone_number,
            'total_price': total_price
        }

        return render(request, 'pages/cart.html', {
            'cart_items': cart_items,
            'images': images,
            'cart_data': cart_data
        })
    else:
        return redirect('login')

@csrf_exempt
def turinfo(request, place_id):
    places = get_object_or_404(TourismPlace, id=place_id)
    stars = range(5, 0, -1)
    places.views += 1
    places.save() 
    comments = places.comments.filter(parent=None)[::-1] 
    comments_with_stars = []

    for comment in comments:
        user_rating = Rating.objects.filter(user=comment.user, place=places).first()
        if user_rating:
            stars_list = list(range(user_rating.stars))
            comments_with_stars.append((comment.id, stars_list))
        else:
            comments_with_stars.append((comment.id, [])) 

    if request.method == 'GET' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        comments_data = []

        # Asosiy sharhlar va javoblarni iteratsiya qilish
        for comment in comments:
            comment_data = {
                'id': comment.id,
                'user': comment.user.first_name,
                'text': comment.text,
                'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'stars': [len(stars) for cid, stars in comments_with_stars if cid == comment.id],
                'replies': []
            }

            # Javoblarni qo'shish
            for reply in comment.replies.all():
                reply_data = {
                    'id': reply.id,
                    'user': reply.user.first_name,
                    'text': reply.text,
                    'created_at': reply.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                }
                comment_data['replies'].insert(0, reply_data)

            comments_data.append(comment_data)

        return JsonResponse({
            'success': True,
            'comments': comments_data[::-1],
            'current_user': request.user.first_name if request.user.is_authenticated else None
        })


    if request.method == 'POST':
        text = request.POST.get('comment')
        parent_id = request.POST.get('parent_id', None)
        if request.user.is_authenticated and text:
            user_rating = Rating.objects.filter(user=request.user, place=places).first()
            stars_count = user_rating.stars if user_rating else 0
            new_comment = Comment.objects.create(
                place=places,
                user=request.user,
                text=text,
                created_at=timezone.now(),
                parent_id=parent_id if parent_id != '' else None,
            )
            return JsonResponse({
                'success': True,
                'comment': {
                    'id': new_comment.id,
                    'user': new_comment.user.first_name,
                    'text': new_comment.text,
                    'created_at': new_comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                    'stars': stars_count,
                    'parent_id': parent_id,
                },
                'current_user': request.user.first_name,
            })
        else:
            return JsonResponse({'success': False}, status=400)

    return render(request, 'pages/turinfo.html', {
        'places': places, 
        'comments': comments, 
        'stars': stars, 
        'comments_with_stars': comments_with_stars
    })

from django.contrib.auth import get_user_model
User = get_user_model()

from django.contrib.auth import login, logout, authenticate
from django.conf import settings
from django.utils.crypto import get_random_string


import random

reset_code = {}

def password_reset(request):
    if request.method == "POST":
        email = request.POST['email']
        try:
            user = User.objects.get(email=email)
            print(user)
            code = random.randint(1000, 9999)
            reset_code["tiklash_kodi"] = code 
            send_mail(
                'Parolni tiklash kodi',
                f'Parolni tiklash uchun kodingiz: {code}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
            request.session['reset_email'] = email
            return redirect('password_reset_confirm')
        except User.DoesNotExist:
            
            return render(request, 'registerPage/password_reset_confirm.html', {'error': 'Bu email ro‘yxatdan o‘tmagan!'})
    return render(request, 'registerPage/password_reset.html')

def password_reset_confirm(request):
    if request.method == "POST":
        # Retrieve the email from session
        email = request.session.get('reset_email')
        if not email:
            return render(request, 'registerPage/password_reset_confirm.html', {'error': 'Email sessiyada topilmadi. Parolni tiklash jarayonini qaytadan boshlang.'})
        
        code = request.POST.get('code')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        if reset_code.get("tiklash_kodi") == int(code):
            if password == confirm_password:
                user = User.objects.get(email=email)
                user.set_password(password)
                user.save()
                return redirect('login')
            else:
                return render(request, 'registerPage/password_reset_confirm.html', {'error': 'Parollar mos kelmadi'})
        else:
            return render(request, 'registerPage/password_reset_confirm.html', {'error': 'Tiklash kodi noto‘g‘ri.'})
    return render(request, 'registerPage/password_reset_confirm.html')

from django.utils import timezone
from datetime import timedelta

def clean_up_temporary_accounts():
    expiration_time = timezone.now() - timedelta(minutes=2)  # 2 daqiqalik amal qilish muddati
    TemporaryAccountData.objects.filter(created_at__lt=expiration_time, is_verified=False).delete()


class RegisterView(View):
    def get(self, request, *args, **kwargs):
        clean_up_temporary_accounts() 
        return render(request, 'registerPage/register.html')
    def post(self, request, *args, **kwargs):
        clean_up_temporary_accounts()
        first_name = request.POST.get('first_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        accounts_type = request.POST.get('accounts_type')
        gender = request.POST.get('gender')

        if TemporaryAccountData.objects.filter(email=email).exists():
            return render(request, 'registerPage/register.html', {
                'error': 'Bu email bilan allaqachon ro\'yxatdan o\'tilgan.'
            })

        verification_code = get_random_string(length=6, allowed_chars='1234567890')

        temp_account = TemporaryAccountData.objects.create(
            first_name=first_name,
            email=email,
            password=password,  
            accounts_type=accounts_type,
            gender=gender,
            verification_code=verification_code,
            is_verified=False
        )

        send_mail(
            subject="Tasdiqlash kodi",
            message=f"Xurmatli {first_name}, ro'yxatdan muvaffaqiyatli o'tdingiz. Tasdiqlash kodingiz: {verification_code}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )

        request.session['email'] = email
        return redirect('verify_email')

class VerifyEmailView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'registerPage/verify_email.html')
    
    def post(self, request, *args, **kwargs):
        email = request.session.get('email')
        verification_code_input = request.POST.get('verification_code')

        try:
            temp_account = TemporaryAccountData.objects.get(email=email, verification_code=verification_code_input)
            if temp_account:
                user = User.objects.create_user(
                    first_name=temp_account.first_name,
                    email=temp_account.email,
                    password=temp_account.password,
                    accounts_type=temp_account.accounts_type,
                    gender=temp_account.gender,
                )
                temp_account.is_verified = True
                temp_account.save()
                request.session.pop('email', None)
                return redirect('login')

        except TemporaryAccountData.DoesNotExist:
            return render(request, 'registerPage/verify_email.html', {'error': 'Tasdiqlash kodi noto‘g‘ri.'})

        return render(request, 'registerPage/verify_email.html')

class LoginView(View):
    def get(self, request):
        return render(request, 'registerPage/login.html')

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            return render(request, 'registerPage/login.html', {
                'error': 'Iltimos, to\'g\'ri foydalanuvchi nomi va parolni kiriting. Ikkala maydon ham katta-kichik harf sezgir.'
            })

class LogoutView(View):
        def get(self, request):
            logout(request)
            return redirect('index.html')
