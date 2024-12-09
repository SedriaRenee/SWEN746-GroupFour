import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  CssBaseline,
  FormControl,
  FormLabel,
  Link,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { WbSunny, Brightness3 } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [dialogError, setDialogError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });
      if (response.status === 200) navigate("/");
      else setError("Invalid credentials. Please try again.");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/forgot-password",
        { email }
      );
      if (response.status === 200) {
        alert("Password reset link sent to your email.");
        setOpenDialog(false);
      } else {
        setDialogError("Error occurred. Please try again later.");
      }
    } catch (err) {
      setDialogError("An error occurred. Please try again later.");
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
          alignItems: "center",
          justifyContent: "center",
          background:
            themeMode === "light"
              ? "linear-gradient(to bottom right, #dd6031, #eabe7c)"
              : "#333",
        }}>
        {/* Logo or Title */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "16px",
            marginBottom: "20px",
          }}>
          <Typography
            variant='h4'
            sx={{
              color: themeMode === "light" ? "#fff" : "#eabe7c",
              fontWeight: 700,
            }}>
            Crave-Mates
          </Typography>
        </Box>

        <Stack
          spacing={3}
          sx={{
            width: "90%",
            maxWidth: "400px",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: themeMode === "light" ? "#fff" : "#444",
            margin: "0 auto",
            [theme.breakpoints.up("sm")]: {
              maxWidth: "360px",
            },
            [theme.breakpoints.up("md")]: {
              maxWidth: "400px",
            },
          }}>
          {/* Theme Toggle Button */}
          <Box sx={{ position: "absolute", top: 16, right: 16 }}>
            <IconButton onClick={toggleTheme} color='primary'>
              {themeMode === "light" ? <Brightness3 /> : <WbSunny />}
            </IconButton>
          </Box>

          {/* Form Header */}
          <Typography variant='h4' align='center'>
            Login
          </Typography>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin='normal'>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <TextField
                id='username'
                name='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                variant='outlined'
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth margin='normal'>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant='outlined'
                fullWidth
                error={!!error}
                helperText={error || ""}
              />
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ marginTop: 2 }}
              disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Divider>or</Divider>

          {/* Links */}
          <Box sx={{ textAlign: "center" }}>
            <Typography>
              Don't have an account?{" "}
              <Link href='/signup' sx={{ color: "primary.main" }}>
                Sign up
              </Link>
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              <Link
                onClick={() => setOpenDialog(true)}
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}>
                Forgot password?
              </Link>
            </Typography>
          </Box>
        </Stack>

        {/* Forgot Password Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <form onSubmit={handleForgotPasswordSubmit}>
              <TextField
                label='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant='outlined'
                margin='normal'
                type='email'
                required
                error={!!dialogError}
                helperText={dialogError || ""}
              />
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary'>
                  Send Reset Link
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
