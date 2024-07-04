import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../utils/authFunction";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Please fill all the fields");
    } else {
      try {
        await loginUser(email, password);
        setRedirect(true);
      } catch (err) {
        console.error("Error: ", err);
        alert("Login failed!");
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Box>
    </Container>
  );
}

export default Login;
