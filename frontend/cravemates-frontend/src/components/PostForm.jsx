import { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', content);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('/api/posts/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Post created:', response.data);
            setContent('');
            setImage(null);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Post</button>
        </form>
    );
};

export default PostForm;
