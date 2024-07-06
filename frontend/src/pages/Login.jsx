import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../utils/authFunction";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { loginUser } = useAuth();

  const paperStyle = {
    padding: 25,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };

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
    <div className="bg">
      <Container maxWidth="sm">
        <Paper elevation={10} style={paperStyle}>
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar sx={{ bgcolor: "#334464", mb: 1 }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h4" gutterBottom>
                  Login
                </Typography>
              </Grid>
            </Grid>
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
                sx={{
                  mt: 2,
                  bgcolor: "#334464",
                  color: "white",
                  "&:hover": {
                    bgcolor: "#334464",
                  },
                }}
              >
                Login
              </Button>
            </form>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
