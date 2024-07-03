import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { loginUser } from "../utils/authFunction";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  // const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      setRedirect(true);
    } catch (err) {
      console.error("Error: ", err);
      alert("Login failed!");
    }

    // try {
    //   await loginUser(email, password);
    //   alert("Login successful!");
    //   setRedirect(true);
    // } catch (err) {
    //   console.error("Error: ", err);
    //   alert("Invalid Credentials");
    // }
    // try {
    //   const response = await fetch("http://localhost:5000/login", {
    //     method: "POST",
    //     body: JSON.stringify({ email, password }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   console.log(response);
    //   if (response.ok) {
    //     localStorage.setItem("userEmail", email);
    //     alert("Login successful!");
    //     setRedirect(true);
    //   } else {
    //     alert("Invalid Credentials");
    //   }
    // } catch (err) {
    //   console.error("Error: ", err);
    //   alert("Login failed!");
    // }
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
