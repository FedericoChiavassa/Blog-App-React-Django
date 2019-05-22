from posts.models import Post
from rest_framework import viewsets, permissions, pagination, response
from .serializers import PostSerializer 
from .permissions import IsAuthorOrReadOnly
import math

# Set Pagination Size
class CustomSizePagination(pagination.PageNumberPagination):
    page_size = 3

    def get_paginated_response(self, data):
        return response.Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'totpages': math.ceil(self.page.paginator.count / 3),
            'results': data
        })


# Post Viewset
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly
    ]
    serializer_class = PostSerializer
    pagination_class = CustomSizePagination

# UserPost Viewset
class UserPostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly
    ]

    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts.all().order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

