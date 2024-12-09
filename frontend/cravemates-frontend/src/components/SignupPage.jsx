import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff, WbSunny, Brightness3 } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const { themeMode, toggleTheme } = useTheme(); // Get theme state from context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when typing
  };

  const handleMouseDownPassword = () => setShowPassword(true);
  const handleMouseUpPassword = () => setShowPassword(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
  
    // Log form data before sending
    console.log("Form data being sent:", formData);
  
    try {
      const response = await axios.post("http://localhost:8000/signup/", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phoneNumber: formData.phoneNumber,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
  
      if (response.status === 201) {
        navigate("/profile/edit");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err.response);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
  sx={{
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: { xs: 2, sm: 4 },
    background: themeMode === "light" ? "linear-gradient(to bottom right, #dd6031, #eabe7c)": "#333",
  }}
>
  {/* Crave-Mates Heading */}
  <Typography
    variant="h3"
    align="center"
    sx={{
      color: themeMode === "light" ? "#fff" : "#eabe7c",
      marginBottom: 4,
      fontWeight: "bold",
    }}
  >
    Crave-Mates
  </Typography>

  {/* Signup Box */}
  <Stack
    spacing={3}
    sx={{
      width: "100%",
      maxWidth: "400px",
      padding: 4,
      borderRadius: 2,
      boxShadow: 3,
      backgroundColor: themeMode === "light" ? "#fff" : "#444",
      marginTop: { xs: 2, sm: 4 }, // Add some top margin
    }}
  >
    {/* Theme Toggle Button */}
    <Box sx={{ position: "absolute", top: 16, right: 16 }}>
      <IconButton onClick={toggleTheme} color="primary">
        {themeMode === "light" ? <Brightness3 /> : <WbSunny />}
      </IconButton>
    </Box>

    <Typography variant="h6" align="center" sx={{ marginBottom: 3 }}>
      Sign Up
    </Typography>

    <form onSubmit={handleSubmit}>
      {/* Form Fields */}
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <TextField
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <TextField
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="username">Username</FormLabel>
        <TextField
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                onMouseLeave={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
      </FormControl>

      {error && (
        <Typography color="error" align="center" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>

    <Divider>or</Divider>
    <Box sx={{ textAlign: "center" }}>
      <Typography>
        Already have an account?{" "}
        <Link href="/login" sx={{ color: "primary.main" }}>
          Login
        </Link>
      </Typography>
    </Box>
  </Stack>
</Box>
    </ThemeProvider>
  );
};

export default SignupPage;
