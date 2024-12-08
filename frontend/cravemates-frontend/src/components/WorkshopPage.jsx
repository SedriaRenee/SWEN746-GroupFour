import React, { useState, useEffect } from "react";
import { Box, Typography, Container, List, ListItem, Card, CardContent, CardMedia } from "@mui/material";
import { AiOutlineBuild, AiOutlineWarning } from "react-icons/ai";
import Header from "../components/Header"; // Assuming you have a Header component
import FooterBar from "../components/FooterBar"; // Assuming you have a FooterBar component
import { useTheme } from "../context/ThemeContext"; // Import useTheme from ThemeContext

const WorkshopsPage = () => {
  const { themeMode } = useTheme(); // Use the theme mode from the context
  const [workshops, setWorkshops] = useState([]);

  // Fetch workshops from the Django backend
  useEffect(() => {
    const fetchWorkshops = async () => {
      const response = await fetch("/workshops/");  // Adjust URL if using an API endpoint
      const data = await response.json();
      setWorkshops(data);
    };

    fetchWorkshops();
  }, []);

  return (
    <Box sx={{ backgroundColor: themeMode === "dark" ? "#333" : "#fff" }}>
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
          Workshops Page is Under Construction
        </Typography>
        <Box sx={{ fontSize: "5rem", display: "flex", justifyContent: "center" }}>
          <AiOutlineBuild style={{ margin: "0 10px" }} />
          <AiOutlineWarning style={{ margin: "0 10px" }} />
        </Box>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          We're working hard to bring this page to life. Please check back soon!
        </Typography>
      </Box>

      <FooterBar currentPage="workshops" /> {/* Add Footer, set current page as 'workshops' */}
    </Box>
  );
};

export default WorkshopsPage;
