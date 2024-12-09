import React from "react";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineAppstore,
  AiOutlineCalendar,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const FooterBar = ({ currentPage, username }) => {
  const { themeMode } = useTheme(); // Get current theme mode

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: themeMode === "light" ? "white" : "#333", // Adjust background color based on theme
        boxShadow: 2,
        padding: 1,
        zIndex: 1000,
      }}>
      {/* Home link */}
      <Tooltip title='Home'>
        <IconButton
          component={Link}
          to='/'
          sx={{
            color: currentPage === "home" ? "primary.main" : "text.secondary",
          }}>
          <AiOutlineHome size={24} />
        </IconButton>
      </Tooltip>

      {/* Profile link */}
      <Tooltip title='Profile'>
        <IconButton
          component={Link}
          to={`/profile/${username}`}
          sx={{
            color:
              currentPage === "profile" ? "primary.main" : "text.secondary",
          }}>
          <AiOutlineUser size={24} />
        </IconButton>
      </Tooltip>

      {/* Events link */}
      <Tooltip title='Events'>
        <IconButton
          component={Link}
          to='/events'
          sx={{
            color: currentPage === "events" ? "primary.main" : "text.secondary",
          }}>
          <AiOutlineCalendar size={24} />
        </IconButton>
      </Tooltip>

      {/* Channels link */}
      <Tooltip title='Channels'>
        <IconButton
          component={Link}
          to='/channels'
          sx={{
            color:
              currentPage === "channels" ? "primary.main" : "text.secondary",
          }}>
          <AiOutlineAppstore size={24} />
        </IconButton>
      </Tooltip>

      {/* Groups link */}
      <Tooltip title='Groups'>
        <IconButton
          component={Link}
          to='/groups'
          sx={{
            color: currentPage === "groups" ? "primary.main" : "text.secondary",
          }}>
          <AiOutlineTeam size={24} />
        </IconButton>
      </Tooltip>

      {/* Rentals link */}
      <Tooltip title='Rentals'>
        <IconButton
          component={Link}
          to='/rentals'
          sx={{
            color:
              currentPage === "rentals" ? "primary.main" : "text.secondary",
          }}>
          <AiOutlineShoppingCart size={24} />
        </IconButton>
      </Tooltip>

      {/* Workshops link */}
      <Tooltip title='Workshops'>
        <IconButton
          component={Link}
          to='/workshops'
          sx={{
            color:
              currentPage === "workshops" ? "primary.main" : "text.secondary",
          }}>
          <AiOutlineAppstore size={24} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FooterBar;
