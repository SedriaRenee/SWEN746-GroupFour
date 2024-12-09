import React from "react";
import { AiOutlineSearch, AiOutlineMessage } from "react-icons/ai"; // Removed AiOutlinePlus import
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { WbSunny, Brightness3 } from "@mui/icons-material"; // Import icons for theme toggle
import { useTheme } from "../context/ThemeContext";  // Import useTheme

const Header = () => {
  const { themeMode, toggleTheme } = useTheme();  // Get current theme mode (light/dark) and toggle function

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: themeMode === "light" ? "primary.main" : "#333",  // Adjust background based on theme
        color: themeMode === "light" ? "black" : "white",  // Adjust text color based on theme
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: themeMode === "light" ? "black" : "white",  // Title color based on theme
            }}
          >
            Crave-Mates
          </Typography>
        </Box>

        {/* Group icons and theme toggle button */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <IconButton color="inherit" sx={{ display: "flex", alignItems: "center" }}>
            <AiOutlineSearch size={24} color={themeMode === "light" ? "black" : "white"} />  {/* Adjust icon color */}
          </IconButton>
          <IconButton color="inherit" sx={{ display: "flex", alignItems: "center" }}>
            <AiOutlineMessage size={24} color={themeMode === "light" ? "black" : "white"} />  {/* Adjust icon color */}
          </IconButton>
          
          {/* Theme Toggle Button (Far right) */}
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === "light" ? <Brightness3 /> : <WbSunny />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
