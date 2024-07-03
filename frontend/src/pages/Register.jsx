import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { registerUser } from "../utils/authFunction";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(name, email, password);
      setRedirect(true);
      // navigate("/");
    } catch (err) {
      console.error("Error: ", err);
      alert("Registration failed!");
    }

    // try {
    //   const response = await fetch("http://localhost:5000/register", {
    //     method: "POST",
    //     body: JSON.stringify({ name, email, password }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   console.log(response);
    //   if (response.ok) {
    //     localStorage.setItem("userEmail", email);
    //     alert("User registered successfully!");
    //     setRedirect(true);
    //   } else {
    //     alert("Registration failed!");
    //   }
    // } catch (err) {
    //   console.error("Error: ", err);
    //   alert("Registration failed!");
    // }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth
            margin="normal"
          />
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
            Register
          </Button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Box>
    </Container>
  );
}

export default Register;
