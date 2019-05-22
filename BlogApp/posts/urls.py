from rest_framework import routers
from .api import PostViewSet, UserPostViewSet

router = routers.DefaultRouter()
router.register('posts', PostViewSet, 'posts')
router.register('user/posts', UserPostViewSet, 'user_posts')

urlpatterns = router.urls