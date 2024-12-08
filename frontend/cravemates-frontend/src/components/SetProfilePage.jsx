import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext"; // Import the theme context
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const SetProfilePage = () => {
  const [formData, setFormData] = useState({
    bio: "",
    tags: "",
    profile_picture: null,
    years_at_RIT: "",
    age: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const { themeMode } = useTheme(); // Access the current theme mode

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare form data to be sent
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) { // Ensure the value is not null or undefined
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const response = await fetch("http://localhost:8000/profile/edit/", {
        method: "PUT",
        body: formDataToSend,
      });
  
      if (response.ok) {
        navigate("/"); // Redirect after successful submission
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error during fetch:", error);
    }
  };  

  const theme = createTheme({
    palette: {
      mode: themeMode, // Use the current theme mode
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Set Up Your Profile
        </Typography>
        {errorMessage && (
          <Typography variant="body2" color="error" align="center">
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
            <Box>
              <TextField
                fullWidth
                label="About Me"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                multiline
                rows={4}
                variant="outlined"
                color={themeMode === "light" ? "primary" : "secondary"}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                helperText="(Optional)"
                variant="outlined"
                color={themeMode === "light" ? "primary" : "secondary"}
                title="Enter any food allergies or dietary preferences (e.g., gluten-free, vegetarian, vegan)."
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Years at RIT"
                name="years_at_RIT"
                value={formData.years_at_RIT}
                onChange={handleChange}
                required
                variant="outlined"
                color={themeMode === "light" ? "primary" : "secondary"}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                variant="outlined"
                color={themeMode === "light" ? "primary" : "secondary"}
              />
            </Box>

            {/* Profile Picture Upload Field */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Upload Profile Picture
              </Typography>
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </Box>
          </Box>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default SetProfilePage;
