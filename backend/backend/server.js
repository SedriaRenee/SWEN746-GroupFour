// backend/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for frontend to access the backend
app.use(cors());

// Serve static files from the 'STATIC' directory
app.use('/static', express.static(path.join(__dirname, 'STATIC')));

// Define other backend routes as needed
app.get('/profile/:username', (req, res) => {
    // Example response: could be from a database
    const profileData = {
        username: req.params.username,
        profile_picture: '/static/default_avatar.jpg',  // This should be relative to /static
        bio: "This is a sample bio."
    };
    res.json(profileData);
});

// Start server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
