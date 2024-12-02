import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch user profile
        axios.get('/api/profile').then((response) => setProfile(response.data));
        // Fetch posts
        axios.get('/api/posts').then((response) => setPosts(response.data));
    }, []);

    return (
        <div className="profile">
            <div className="profile-header">
                <img src={profile.profile_picture} alt="Profile" />
                <h2>{profile.username}</h2>
                <p>{profile.bio}</p>
            </div>
            <div className="posts">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <p>{post.content}</p>
                        {post.image && <img src={post.image} alt="Post media" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
