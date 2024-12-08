from django.test import TestCase
from django.urls import reverse

from ..models import Event, Post , Comment, User

class TestViews(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')

    def test_signup_view(self):
        response = self.client.get(reverse('signup'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'signup.html')

    def test_login_view(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'login.html')

    def test_logout_view(self):
        self.client.login(username='testuser', password='password123')
        response = self.client.get(reverse('logout'))
        self.assertRedirects(response, reverse('login'))  

    def test_feed_view(self):
        # Login first
        self.client.login(username='testuser', password='password123')
        response = self.client.get(reverse('feed'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'feed.html')

    def test_create_post_view(self):
        # Login first
        self.client.login(username='testuser', password='password123')
        response = self.client.get(reverse('post_create'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'post_create.html')


    ###For the next Sprint
    # def test_event_list_view(self):
    #     # Assuming an Event model exists
    #     Event.objects.create(title="Test Event", description="Test description", date="2024-11-01 12:00:00", location="Test Location")
    #     response = self.client.get(reverse('event_list'))
    #     self.assertEqual(response.status_code, 200)
    #     self.assertContains(response, "Test Event")

    # def test_create_group_event_view(self):
    #     # Login first
    #     self.client.login(username='testuser', password='password123')
    #     response = self.client.get(reverse('create_group_event'))
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'create_group_event.html')

    # def test_profile_view(self):
    #     # Assuming the user has a profile page
    #     response = self.client.get(reverse('user_profile', kwargs={'username': 'testuser'}))
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'user_profile.html')

    # def test_guest_profile_view(self):
    #     response = self.client.get(reverse('guest_profile', kwargs={'username': 'testuser'}))
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'guest_profile.html')

    # def test_search_users_view(self):
    #     response = self.client.get(reverse('search_users'))
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'search_users.html')

    # def test_post_detail_view(self):
    #     # Assuming a post exists
    #     post = Post.objects.create(title="Test Post", content="Test Content", author=self.user)
    #     response = self.client.get(reverse('post_detail', kwargs={'post_id': post.id}))
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'post_detail.html')

    # def test_comment_create_view(self):
    #     # Assuming a post exists to comment on
    #     post = Post.objects.create(title="Test Post", content="Test Content", author=self.user)
    #     response = self.client.post(reverse('comment_create', kwargs={'pk': post.id}), {'content': 'Test comment'})
    #     self.assertRedirects(response, reverse('post_detail', kwargs={'post_id': post.id}))

    # def test_comment_delete_view(self):
    #     # Assuming a comment exists
    #     post = Post.objects.create(title="Test Post", content="Test Content", author=self.user)
    #     comment = Comment.objects.create(post=post, content="Test Comment", author=self.user)
    #     response = self.client.delete(reverse('comment_delete', kwargs={'pk': comment.id}))
    #     self.assertEqual(response.status_code, 204)  # 204 No Content for delete

    # def test_like_view(self):
    #     # Assuming a post exists
    #     post = Post.objects.create(title="Test Post", content="Test Content", author=self.user)
    #     response = self.client.post(reverse('like', kwargs={'pk': post.id}))
    #     self.assertRedirects(response, reverse('post_detail', kwargs={'post_id': post.id}))

    # def test_password_change_view(self):
    #     self.client.login(username='testuser', password='password123')
    #     response = self.client.get(reverse('password_change'))
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'password_change.html')
