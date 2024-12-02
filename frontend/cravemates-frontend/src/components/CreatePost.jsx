import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        formData.append('image', image);

        axios.post('/api/post/create/', formData)
            .then(response => {
               
            })
            .catch(error => {
                console.error("There was an error posting!", error);
            });
    };

    return (
        <form onSubmit={handlePostSubmit}>
            <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="What's on your mind?"
            />
            <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
            />
            <button type="submit">Post</button>
        </form>
    );
}

export default CreatePost;
