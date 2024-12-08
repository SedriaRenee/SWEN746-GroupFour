import React from "react";
import { Box, Typography } from "@mui/material";
import { AiOutlineBuild, AiOutlineWarning } from "react-icons/ai";
import Header from "../components/Header"; // Assuming you have a Header component
import FooterBar from "../components/FooterBar"; // Assuming you have a FooterBar component
import { useTheme } from "../context/ThemeContext"; // Import useTheme from ThemeContext

const ChannelsPage = () => {
  const { themeMode } = useTheme(); // Get the theme mode (dark or light)

  return (
    <Box sx={{ backgroundColor: themeMode === "dark" ? "#333" : "#fff", minHeight: "100vh" }}>
      <Header /> {/* Add header component */}
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 100px)", // Adjust for header/footer
          padding: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Channels Page is Under Construction
        </Typography>
        <Box sx={{ fontSize: "5rem", display: "flex", justifyContent: "center" }}>
          <AiOutlineBuild style={{ margin: "0 10px" }} />
          <AiOutlineWarning style={{ margin: "0 10px" }} />
        </Box>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          We're working hard to bring this page to life. Please check back soon!
        </Typography>
      </Box>

      <FooterBar currentPage="channels" /> {/* Add Footer */}
    </Box>
  );
};

export default ChannelsPage;
