
from django.contrib.auth.hashers import make_password

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    phoneNumber = models.DecimalField(max_digits=13, decimal_places=0)
    bio = models.TextField(blank=True)

    tags = models.JSONField(default=list, blank=True)
    hostStatus = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    years_at_rit = models.DecimalField(max_digits=2, decimal_places=0, default=0)
    age = models.DecimalField(max_digits=3, decimal_places=0, default=0)

    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",  # Avoid clashes with auth.User
        blank=True,
        help_text="The groups this user belongs to.",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_set",  # Avoid clashes with auth.User
        blank=True,
        help_text="Specific permissions for this user.",
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def save(self, *args, **kwargs):
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class Group(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Newsfeed(models.Model):
    pass

class groupOwnership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class groupMembership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class channelOwnership(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class channelMembership(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Posting(models.Model):
    text = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

class privateMessage(models.Model):
    fromUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_message')
    toUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_message')
    message = models.TextField()

class Rental(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    host = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Event(models.Model):
    title = models.CharField(max_length=100, default='Untitled Event')
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=100)
    host_type = models.CharField(max_length=50, default="Host")  # e.g., "Host", "Organization"
    food_type = models.CharField(max_length=50, default="Unknown")  # e.g., "Thai", "American"
    allergy_friendly = models.CharField(max_length=100, default="None")  # e.g., "Peanut-free, Soy-free"
    preferences = models.CharField(max_length=100, default="Any")  # e.g., "Female only"
    group_type = models.CharField(max_length=100, blank=True, null=True)  # e.g., "Restaurant Hop"

    def __str__(self):
        return self.title

class rentalReservation(models.Model):
    rental = models.ForeignKey(Rental, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    timeslot = models.DateTimeField()

    def __str__(self):
        return f"{self.rental.name} reserved for {self.event.title} at {self.timeslot}"

    
class eventMembership(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)



##New ones that need to be created
class Post(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='posts/', blank=True, null=True)  

    def __str__(self):
        return f"{self.user.username} - {self.content}"

class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.content}"

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return f"{self.user.username} liked {self.post.content}"
    


    

class Workshop(models.Model):
    name = models.CharField(max_length=100)
    time = models.DateTimeField()
    tags = models.CharField(max_length=100)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    eventChannel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    photos = models.ImageField(upload_to='workshop_photos/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name