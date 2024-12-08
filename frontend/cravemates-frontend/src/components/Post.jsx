import React from "react";
import ProfilePicture from "./ProfilePicture";
import { Card, CardHeader, CardContent, CardActions, Button, Typography } from "@mui/material";
import { useTheme } from "../context/ThemeContext";  // Import useTheme

const Post = ({ post }) => {
  const { themeMode } = useTheme();  // Get current theme mode (light/dark)

  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: themeMode === "light" ? "white" : "#333",  // Card background based on theme
        color: themeMode === "light" ? "black" : "white",  // Text color based on theme
        boxShadow: themeMode === "light" ? 1 : 3,  // Shadow effect based on theme
      }}
    >
      <CardHeader
        avatar={<ProfilePicture src={post.user.profile_picture} size={40} />}
        title={post.user.username}
        subheader={new Date(post.created_at).toLocaleString()}
        sx={{
          color: themeMode === "light" ? "black" : "white",  // Text color in CardHeader
        }}
      />
      <CardContent>
        <Typography
          variant="body1"
          color={themeMode === "light" ? "textSecondary" : "textPrimary"}  // Text color for content based on theme
        >
          {post.content}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          size="small"
          color="primary"
          sx={{
            color: themeMode === "light" ? "primary.main" : "primary.dark",  // Button color based on theme
          }}
        >
          Like {post.likes_count}
        </Button>
        <Button
          size="small"
          color="primary"
          sx={{
            color: themeMode === "light" ? "primary.main" : "primary.dark",  // Button color based on theme
          }}
        >
          Comment
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;

