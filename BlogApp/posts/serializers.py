from rest_framework import serializers
from accounts.serializers import UserSerializer
from posts.models import Post

# Post Serializer
class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(required=False)

    class Meta:
        model = Post
        fields = '__all__'