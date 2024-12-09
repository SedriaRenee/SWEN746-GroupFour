import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Avatar, Paper, Divider, useTheme } from '@mui/material';
import Header from '../components/Header'; 
import FooterBar from '../components/FooterBar'; 

const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [feed, setFeed] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);

    const theme = useTheme(); // Access the current theme
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        setLoading(true);

        // Fetch user profile and feed
        Promise.all([
            axios.get(`/profile/${username}/`),
            axios.get(`/feed/`)
        ])
        .then(([profileRes, feedRes]) => {
            console.log("Feed data:", feedRes.data);
            setProfile(profileRes.data.profile);
            if (Array.isArray(feedRes.data)) {
                setFeed(feedRes.data);
            } else {
                console.error("Feed data is not an array:", feedRes.data);
                setFeed([]); // Fallback to empty array
            }
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    }, [username]);

    const handlePostChange = (e) => {
        setNewPost(e.target.value);
    };

    const handlePostSubmit = () => {
        if (newPost.trim()) {
            axios.post('/posts/', { content: newPost })
                .then((response) => {
                    setFeed([response.data, ...feed]); // Update the feed directly
                    setNewPost('');
                })
                .catch((error) => console.error("Error creating post:", error));
        }
    };

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the desired path
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const profilePicture = profile?.profile_picture || 'http://localhost:8000/static/default_avatar.jpg';
    const usernameDisplay = profile?.username || 'Crave-Mates User'; // Fallback username if not found

    return (
        <Box sx={{ backgroundColor: theme.palette.background.default }}>
            <Header /> {/* Add header component */}
            
            <Box sx={{ padding: 2, minHeight: '100vh', backgroundColor: theme.palette.background.paper }}>
                <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                    <Avatar
                        alt={usernameDisplay}
                        src={profilePicture}
                        sx={{ width: 100, height: 100, margin: '0 auto' }}
                    />
                    <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>
                        {usernameDisplay}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1, color: theme.palette.text.secondary }}>
                        {profile?.bio || "Welcome to CraveMates. Click 'Edit Profile' to update bio and profile picture."}
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{ marginTop: 2 }}
                        onClick={() => handleNavigation(`/profile/edit/${username}`)} // Redirect to edit profile
                    >
                        Edit Profile
                    </Button>
                </Box>

                {/* Profile Tabs */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                    <Button variant="text" onClick={() => handleNavigation(`/groups/${username}`)}>Groups</Button>
                    <Button variant="text" onClick={() => handleNavigation(`/likes/${username}`)}>Likes</Button>
                    <Button variant="text" onClick={() => handleNavigation(`/channels/${username}`)}>Channels</Button>
                </Box>

                {/* Create Post Section */}
                <Box sx={{ marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={newPost}
                        onChange={handlePostChange}
                        placeholder="What do you crave?"
                        variant="outlined"
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: theme.palette.background.paper,
                            }
                        }}
                    />
                    <Button onClick={handlePostSubmit} variant="contained" sx={{ marginTop: 2 }}>
                        Post
                    </Button>
                </Box>

                {/* Display the user's feed */}
                <Box  sx={{
                    marginBottom: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', 
                    textAlign: 'center', 
    }}>
                    <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Feed</Typography>
                    {Array.isArray(feed) && feed.length > 0 ? (
                        feed.map((post) => (
                            <Paper key={post.id} sx={{ padding: 2, marginBottom: 2, backgroundColor: theme.palette.background.paper }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                        alt={post.user.username}
                                        src={post.user.profile_picture || '/static/default_avatar.jpg'}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                    <Typography variant="body1" sx={{ marginLeft: 2, color: theme.palette.text.primary }}>
                                        {post.user.username}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginLeft: 2, color: 'gray' }}>
                                        {new Date(post.created_at).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ marginTop: 2, color: theme.palette.text.primary }}>
                                    {post.content}
                                </Typography>
                                {post.image && <img src={post.image} alt="Post media" style={{ width: '100%', marginTop: 2 }} />}
                                <Divider sx={{ marginTop: 2 }} />
                                <Typography variant="body2" sx={{ marginTop: 1, color: 'gray' }}>
                                    {post.likes_count} Likes
                                </Typography>
                            </Paper>
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                Welcome to your feed, {usernameDisplay}!
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Your feed is currently empty.</Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            <FooterBar currentPage="profile" /> {/* Add Footer */}
        </Box>
    );
};

export default Profile;
