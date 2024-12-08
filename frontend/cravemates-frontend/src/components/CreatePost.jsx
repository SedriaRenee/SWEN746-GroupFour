import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "../context/ThemeContext"; // Import useTheme to access the theme

const CreatePost = () => {
  const [content, setContent] = useState("");  // State for post content
  const [isSubmitting, setIsSubmitting] = useState(false);  // State for managing submission
  const { themeMode } = useTheme();  // Get current theme mode (light/dark)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;

    setIsSubmitting(true);

    // Normally, here you'd send the post to the server via an API call
    fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post submitted:", data);
        setContent("");  // Clear content after submission
        setIsSubmitting(false);  // Reset submitting state
      })
      .catch((error) => {
        console.error("Error submitting post:", error);
        setIsSubmitting(false);  // Reset submitting state on error
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        backgroundColor: themeMode === "light" ? "white" : "#333",  // Adjust based on theme
        boxShadow: 3,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: themeMode === "light" ? "black" : "white" }}>
        Create a Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you crave?"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          disabled={isSubmitting}
          sx={{
            backgroundColor: themeMode === "light" ? "white" : "#555",  // Input background based on theme
            color: themeMode === "light" ? "black" : "white", // Text color
            "& .MuiOutlinedInput-root": {
              color: themeMode === "light" ? "black" : "white", // Input text color
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Post"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;

