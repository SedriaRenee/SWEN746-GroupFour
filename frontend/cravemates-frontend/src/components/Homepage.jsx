import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import Header from '../components/Header';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        const fetchPosts = async () => {
            const response = await axios.get('/api/posts/');
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    return (
        <div className="homepage">
            <Sidebar />
            <main>
                <Header />
                <PostForm />
                <div className="newsfeed">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomePage;
