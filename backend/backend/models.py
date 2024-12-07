from django.db import models
# from django.contrib.auth.models import User

# Create your models here.

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

class User(models.Model):
    fullname = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phoneNumber = models.DecimalField(max_digits=13, decimal_places=0)
    bio = models.TextField()
    newsfeed = models.ForeignKey(Newsfeed, on_delete=models.CASCADE)
    tags = models.CharField(max_length=100)
    hostStatus = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True) 

    def __str__(self):
        return self.username

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
        return self.rental

    
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