from django.test import TestCase
from django.db.utils import IntegrityError
from ..models import Newsfeed, User, Group, Channel, Post, Comment, Like, Workshop, Rental, Event, rentalReservation, eventMembership

class UserModelTest(TestCase):
    def setUp(self):
        """Create a User instance for testing."""
        newsfeed = Newsfeed.objects.create()
        
        self.user = User.objects.create(
            fullname="Sedria Renee",
            username="sedriarenee",
            email="sedriarenee@gmail.com",
            phoneNumber="1234567890",
            bio="Hi I'm Sedria.",
            tags="test, dolphins",
            hostStatus=True,
            newsfeed=newsfeed
        )

    def test_user_creation(self):
        """Test if the user is created successfully."""
        user = User.objects.get(username="sedriarenee")
        self.assertEqual(user.fullname, "Sedria Renee")
        self.assertEqual(user.email, "sedriarenee@gmail.com")
        self.assertTrue(user.hostStatus)

    def test_user_str_method(self):
        """Test the string representation of the User."""
        self.assertEqual(str(self.user), "sedriarenee")

class GroupModelTest(TestCase):
    def setUp(self):
        
        self.group = Group.objects.create(name="Test Group")

    def test_group_creation(self):
        """Test if the group is created successfully."""
        group = Group.objects.get(name="Test Group")
        self.assertEqual(group.name, "Test Group")

class PostModelTest(TestCase):

    
    def setUp(self):

        newsfeed = Newsfeed.objects.create()
       
        self.user = User.objects.create(
            fullname="Sedria Renee",
            username="sedriarenee",
            email="sedriarenee@gmail.com",
            phoneNumber="1234567890",
            bio="Hi I'm Sedria.",
            tags="test, dolphins",
            hostStatus=True,
            newsfeed=newsfeed
        )
        self.post = Post.objects.create(content="Good morning All.", user=self.user)

    def test_post_creation(self):
        """Test if the post is created successfully."""
        post = Post.objects.get(content="Good morning All.")
        self.assertEqual(post.user.username, "sedriarenee")
        self.assertEqual(post.content, "Good morning All.")

    def test_post_str_method(self):
        """Test the string representation of the Post."""
        self.assertEqual(str(self.post), "sedriarenee - Good morning All.")

class CommentModelTest(TestCase):
    def setUp(self):
      
        newsfeed = Newsfeed.objects.create()
        
        self.user = User.objects.create(
            fullname="Sedria Renee",
            username="sedriarenee",
            email="sedriarenee@gmail.com",
            phoneNumber="1234567890",
            bio="Hi I'm Sedria.",
            tags="test, dolphins",
            hostStatus=True,
            newsfeed=newsfeed
        )
        self.post = Post.objects.create(content="Good morning All.", user=self.user)
        self.comment = Comment.objects.create(content="Good morning to you too.", user=self.user, post=self.post)

    def test_comment_creation(self):
       
        comment = Comment.objects.get(content="Good morning to you too.")
        self.assertEqual(comment.user.username, "sedriarenee")
        self.assertEqual(comment.post.content, "Good morning All.")
        self.assertEqual(comment.content, "Good morning to you too.")

    def test_comment_str_method(self):
        """Test the string representation of the Comment."""
        self.assertEqual(str(self.comment), "sedriarenee - Good morning to you too.")

class LikeModelTest(TestCase):
    def setUp(self):
        
        newsfeed = Newsfeed.objects.create()
       
        self.user = User.objects.create(
            fullname="Sedria Renee",
            username="sedriarenee",
            email="sedriarenee@gmail.com",
            phoneNumber="1234567890",
            bio="Hi I'm Sedria.",
            tags="test, dolphins",
            hostStatus=True,
            newsfeed=newsfeed
        )
        
        self.post = Post.objects.create(content="Good morning All.", user=self.user)
        self.like = Like.objects.create(user=self.user, post=self.post)

    def test_like_creation(self):
        """Test if the like is created successfully."""
        like = Like.objects.get(user=self.user)
        self.assertEqual(like.user.username, "sedriarenee")
        self.assertEqual(like.post.content, "Good morning All.")

    def test_like_str_method(self):
       
        self.assertEqual(str(self.like), "sedriarenee liked Good morning All.")

class WorkshopModelTest(TestCase):
    def setUp(self):
        
        newsfeed = Newsfeed.objects.create()
        self.user = User.objects.create(
            fullname="Sedria Renee",
            username="sedriarenee",
            email="sedriarenee@gmail.com",
            phoneNumber="1234567890",
            bio="Hi I'm Sedria.",
            tags="test, dolphins",
            hostStatus=True,
            newsfeed=newsfeed
        )
      
        self.channel = Channel.objects.create(name="Test Channel")
        self.workshop = Workshop.objects.create(
            name="Test Workshop",
            time="2024-12-01T12:00:00Z",
            tags="test, workshop",
            host=self.user,
            description="This is a test workshop.",
            eventChannel=self.channel
        )

    def test_workshop_creation(self):
        """Test if the workshop is created successfully."""
        workshop = Workshop.objects.get(name="Test Workshop")
        self.assertEqual(workshop.host.username, "sedriarenee")
        self.assertEqual(workshop.name, "Test Workshop")
        self.assertEqual(workshop.eventChannel.name, "Test Channel")
