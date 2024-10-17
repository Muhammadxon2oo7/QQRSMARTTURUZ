from django.contrib import admin

# Register your models here.

from .models import Category, Article, User, TourismPlace, TourismPlaceImage, Reclama, Comment, Rating, Like, Cart, CartItem

# Category uchun Admin panelini sozlash
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'max_articles_per_category')  # Admin ro'yxatida ko'rsatiladigan ustunlar
    search_fields = ('name', 'max_articles_per_category')  # Qidiruv maydoniga asoslangan ustunlar

# Article uchun Admin panelini sozlash
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'text', 'img')  # Ko'rsatiladigan ustunlar
    list_filter = ('category',)  # Filtr qo'yish uchun ustunlar
    search_fields = ('title', 'text')  # Qidiruv qilish uchun ustunlar
    raw_id_fields = ('category',)  # Kategoriyani tanlash uchun raw id ishlatish

# Accounts uchun Admin panelini sozlash
class AccountsAdmin(admin.ModelAdmin):
    list_display = ('email', 'accounts_type', 'gender')
    list_filter = ('accounts_type', 'gender')
    search_fields = ('email',)


# Inline modeli - TourismPlace admin interfeysida bir nechta rasmni qo'shish imkonini beradi
class TourismPlaceImageInline(admin.TabularInline):
    model = TourismPlaceImage
    extra = 1  # Bo'sh rasm kiritish maydonlari soni (kerak bo'lsa, ko'paytirishingiz mumkin)


class TourismPlaceAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'duration', 'places_count') 
    inlines = [TourismPlaceImageInline]  


class ReclamaAdmin(admin.ModelAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'text', 'place', 'created_at',)
    list_filter = ('user', 'text', 'place', 'created_at',)
    search_fields = ('user', 'text', 'place', 'created_at',)

class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'place', 'stars',)
    list_filter = ('user', 'place', 'stars',)
    search_fields = ('user', 'place', 'stars',)

class LikeAdmin(admin.ModelAdmin):
    list_display = ('article', 'user', 'liked',)
    list_filter = ('article', 'user', 'liked',)
    search_fields = ('article', 'user', 'liked',)
    


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0 

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'id',  'created_at', 'duration', 'places_count', 'views', 'phone_number')
    list_filter = ('user', 'created_at', 'phone_number')
    search_fields = ('user__username', 'id', 'user', 'phone_number')  
    inlines = [CartItemInline]

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'id',  'article', 'added_at')
    list_filter = ('added_at', 'cart',)
    search_fields = ('id', 'cart__user__username', 'article__title')

# Modellarni admin saytiga ro'yxatdan o'tkazish
admin.site.register(TourismPlace, TourismPlaceAdmin)
admin.site.register(TourismPlaceImage)
admin.site.register(Comment, CommentAdmin)

# Modellarni admin paneliga qo'shish
admin.site.register(Category, CategoryAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(User, AccountsAdmin)
admin.site.register(Reclama, ReclamaAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(Like, LikeAdmin)
