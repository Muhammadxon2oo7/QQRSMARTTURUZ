from modeltranslation.translator import register, TranslationOptions
from .models import Article, Category,  TourismPlace


@register(Article)
class ArticleTranslationOptions(TranslationOptions):
    fields = ('title', 'text')


@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(TourismPlace)
class TourismPlaceTranslationOptions(TranslationOptions):
    fields = ('title', 'text')



