import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "", // fixed typo here
  });
  const [img, setImg] = useState(null);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validation = () => {
    let error = {};
    if (!user.first_name) {
      error.first_name = "First name field cant be empty";
    }
    if (!user.last_name) {
      error.last_name = "Last name field cant be empty";
    }
    if (!user.email) {
      error.email = "Email field cant be empty";
    }
    if (!user.password) {
      // fixed typo here
      error.password = "Password field cant be empty";
    }
    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "first_name") {
      if (value.length === 0) {
        setUser({ ...user, first_name: "" });
        setError({ ...error, first_name: "This field cant be empty" }); // fix here
      } else {
        setUser({ ...user, first_name: value });
        setError({ ...error, first_name: "" }); // fix here
      }
    }
    if (name === "last_name") {
      if (value.length === 0) {
        setUser({ ...user, last_name: "" });
        setError({ ...error, last_name: "This field cant be empty" }); // fix here
      } else {
        setUser({ ...user, last_name: value });
        setError({ ...error, last_name: "" }); // fix here
      }
    }
    if (name === "email") {
      if (value.length === 0) {
        setUser({ ...user, email: "" });
        setError({ ...error, email: "This field cant be empty" }); // fix here
      } else {
        setUser({ ...user, email: value });
        setError({ ...error, email: "" }); // fix here
      }
    }
    if (name === "password") {
      // fixed typo here
      if (value.length === 0) {
        setUser({ ...user, password: "" });
        setError({ ...error, password: "This field cant be empty" }); // fix here
      } else {
        setUser({ ...user, password: value });
        setError({ ...error, password: "" }); // fix here
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation();
    setError(validationErrors);

    // prevent submit if validation errors
    if (Object.keys(validationErrors).length > 0) {
      setMessage("Please fill all required fields correctly.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password); // fixed typo

    if (img) {
      formData.append("image", img);
    }

    try {
      const response = await axios.post(
        "https://wtsacademy.dedicateddevelopers.us/api/user/signup",
        formData
      );

      if (response.status === 201) {
        setMessage(response.data.message || "user is registered");
        localStorage.setItem("first_name", user.first_name);
        localStorage.setItem("password", user.password);
        localStorage.setItem("email", user.email);
        navigate("/login");
        setUser({ first_name: "", last_name: "", email: "", password: "" });
        setImg(null);
        setError({});
      } else {
        setMessage("Something went wrong,   Try again later!");
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong,   Try again later!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      localStorage.setItem("img", fileUrl);

      setUser((prev) => ({
        ...prev,
        img: file,
      }));
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
        <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
          <CardContent sx={{ px: 5, py: 6 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Create Your Account
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={user.first_name}
                    onChange={postUserData}
                    error={!!error?.first_name}
                    helperText={error?.first_name}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={user.last_name}
                    onChange={postUserData}
                    error={!!error?.last_name}
                    helperText={error?.last_name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={postUserData}
                    error={!!error?.email}
                    helperText={error?.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={postUserData}
                    error={!!error?.password}
                    helperText={error?.password}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    sx={{ textAlign: "left" }}
                  >
                    Upload Profile Picture
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Box textAlign="center" mt={2}>
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
                        "Submit"
                      )}
                    </Button>

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
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
