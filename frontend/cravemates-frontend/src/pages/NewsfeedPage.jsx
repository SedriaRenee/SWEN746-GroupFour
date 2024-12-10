import React from "react";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import Newsfeed from "../components/Newsfeed";
import FooterBar from "../components/FooterBar";
import { Box, Container } from "@mui/material";

const NewsfeedPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header with theme toggle */}
      <Header />

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, paddingY: 3 }}>
        <Box sx={{ marginBottom: 3 }}>
          <CreatePost />
        </Box>
        <Newsfeed />
      </Container>

      {/* Footer */}
      <FooterBar currentPage="home" />
    </Box>
  );
};

export default NewsfeedPage;

