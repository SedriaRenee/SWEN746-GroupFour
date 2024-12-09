import React, { useState, useEffect } from "react";
import { Box, Typography, Container, List, ListItem } from "@mui/material";
import { AiOutlineBuild, AiOutlineWarning } from "react-icons/ai";
import Header from "../components/Header"; // Assuming you have a Header component
import FooterBar from "../components/FooterBar"; // Assuming you have a FooterBar component
import { useTheme } from "../context/ThemeContext"; // Import useTheme from ThemeContext

const RentalsPage = () => {
  const { themeMode } = useTheme(); // Use the theme mode from the context
  const [rentals, setRentals] = useState([]);

  // Fetch rentals from the Django backend
  useEffect(() => {
    const fetchRentals = async () => {
      const response = await fetch("/rentals/"); // Adjust URL if using an API endpoint
      const data = await response.json();
      setRentals(data);
    };

    fetchRentals();
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
        }}>
        <Typography variant='h4' gutterBottom>
          Rentals Page is Under Construction
        </Typography>
        <Box
          sx={{ fontSize: "5rem", display: "flex", justifyContent: "center" }}>
          <AiOutlineBuild style={{ margin: "0 10px" }} />
          <AiOutlineWarning style={{ margin: "0 10px" }} />
        </Box>
        <Typography variant='body1' sx={{ marginTop: 2 }}>
          We're working hard to bring this page to life. Please check back soon!
        </Typography>
      </Box>
      <FooterBar currentPage='rentals' />{" "}
      {/* Add Footer, set current page as 'rentals' */}
    </Box>
  );
};

export default RentalsPage;
