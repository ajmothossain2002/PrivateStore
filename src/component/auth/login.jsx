import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
export default function Login({ setIsLoggedIn }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validation = () => {
    let error = {};
    if (!user.email) {
      error.email = "Email field can't be empty";
    }
    if (!user.password) {
      error.password = "Password field can't be empty";
    }
    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "email") {
      if (value.length === 0) {
        setUser({ ...user, email: "" });
        setError({ ...error, email: "Email address is required" });
      } else {
        setUser({ ...user, email: value });
        setError({ ...error, email: "" });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setUser({ ...user, password: "" });
        setError({ ...error, password: "Password is required" });
      } else {
        setUser({ ...user, password: value });
        setError({ ...error, password: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validation);

    setLoading(true);
    let data = {
      email: user.email,
      password: user.password,
    };
    try {
      const response = await axios.post(
        "https://wtsacademy.dedicateddevelopers.us/api/user/signin",
        data
      );
      if (response.status === 200) {
        setMessage(response.data.message || "User is logged in successfully");
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        navigate("/");
        setUser({ email: "", password: "" });
        setError({});
      } else {
        setMessage("Something went wrong try again later");
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        setMessage(`Error:${err.response.data.message}`);
      } else {
        setMessage("There must be some network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 3 }}>
          <Grid container>
            {/* Left side */}
            <Grid item xs={12} md={6}>
              <CardContent sx={{ px: 4, py: 5 }}>
                <Box textAlign="center">
                  <Avatar
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                    alt="logo"
                  />
                  <Typography variant="h5" gutterBottom>
                    We are The Lotus Team
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Please login to your account
                  </Typography>

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={postUserData}
                    error={!!error?.email}
                    helperText={error?.email}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={postUserData}
                    error={!!error?.password}
                    helperText={error?.password}
                    margin="normal"
                  />

                  <Box textAlign="center" sx={{ mt: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      fullWidth
                      size="large"
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Login"
                      )}
                    </Button>

                    <Button  variant="text" sx={{ mt: 2 }}>
                      Forgot password?
                    </Button>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={4}
                  >
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      Don't have an account?
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => navigate("/register")}
                    >
                      Create new
                    </Button>
                  </Box>

                  {message && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 2 }}
                      color={
                        message.toLowerCase().includes("success")
                          ? "green"
                          : "error"
                      }
                    >
                      {message}
                    </Typography>
                  )}
                </form>
              </CardContent>
            </Grid>

            {/* Right side */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background:
                  "linear-gradient(to bottom right, #6a11cb, #2575fc)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom>
                 You are logging in a private store
                </Typography>
                <Typography variant="body2">
               only registered persons are allowed
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}
