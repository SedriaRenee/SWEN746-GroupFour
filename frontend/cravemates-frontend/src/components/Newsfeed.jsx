import React, { useEffect, useState } from "react";
import Post from "./Post";
import { CircularProgress, Box, Typography, Card, CardContent, CardHeader } from "@mui/material";

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      {posts.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No posts available.
        </Typography>
      ) : (
        posts.map((post) => (
          <Card key={post.id} sx={{ marginBottom: 2 }}>
            <CardHeader title={post.user} subheader={post.timestamp} />
            <CardContent>
              <Post post={post} />
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Newsfeed;
