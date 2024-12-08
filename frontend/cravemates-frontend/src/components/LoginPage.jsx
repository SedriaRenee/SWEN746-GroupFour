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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { WbSunny, Brightness3 } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [dialogError, setDialogError] = useState("");
  const { themeMode, toggleTheme } = useTheme(); // Get theme state from context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
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
      const response = await axios.post("http://localhost:8000/forgot-password", { email });
      
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
          justifyContent: "center",
          alignItems: "center",
          background: themeMode === "light" ? "#f7f7f7" : "#333",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: themeMode === "light" ? "#fff" : "#444",
          }}
        >
          {/* Theme Toggle Button at the top */}
          <Box sx={{ position: "absolute", top: 16, right: 16 }}>
            <IconButton onClick={toggleTheme} color="primary">
              {themeMode === "light" ? <Brightness3 /> : <WbSunny />}
            </IconButton>
          </Box>

          <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
            Cravemates
          </Typography>
          <Typography variant="h6" align="center" sx={{ marginBottom: 3 }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError(""); // Clear error when typing
                    }}
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                fullWidth
                color={error ? "error" : "primary"}
                helperText={error ? error : ""}
              />
            </FormControl>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop: 2 }}
                disabled={loading}
                >
                {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Divider>or</Divider>
          <Box sx={{ textAlign: "center" }}>
            <Typography>
              Don't have an account?{" "}
              <Link href="/signup" sx={{ color: "primary.main" }}>
                Sign up
              </Link>
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              <Link
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setOpenDialog(true)}
              >
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
                label="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                type="email"
                required
                color={dialogError ? "error" : "primary"}
                helperText={dialogError ? dialogError : ""}
              />
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
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
