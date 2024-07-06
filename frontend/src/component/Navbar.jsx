import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  List,
  Box,
  Typography,
  styled,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Snackbar,
  SnackbarContent,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authFunction";
import logo from "../../src/images/blog.png";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const categories = [
  "sport",
  "health",
  "political",
  "finance",
  "technology",
  "entertainment",
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const { logoutUser } = useAuth();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    window.location.reload();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (category) => {
    setAnchorEl(null);
    if (category) {
      navigate("/", { state: { category } });
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setSnackbarMessage("Logout successful!");
      setSnackbarOpen(true);
    } catch (error) {
      alert("Error logging out");
      console.error(error);
    }
  };

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        backgroundColor: "#334464",
        height: "70px",
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={logo}
              height="30px"
              margin="50px"
              style={{ marginRight: "8px" }}
              alt=""
            />
            InkScribe
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 2 }}>
          <List sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <IconButton
              size="small"
              edge="end"
              aria-label="categories"
              aria-haspopup="true"
              onClick={() => handleNavigation("/")}
              color="inherit"
              sx={{ ml: 2, color: "white" }}
            >
              Home
            </IconButton>
            <IconButton
              size="small"
              edge="end"
              aria-label="categories"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
              sx={{ ml: 2, color: "white" }}
            >
              Categories
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleClose(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => handleClose(category)}
                >
                  {category}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              size="small"
              edge="end"
              aria-label="categories"
              aria-haspopup="true"
              onClick={() => handleNavigation("/about")}
              color="inherit"
              sx={{ ml: 2, color: "white" }}
            >
              About
            </IconButton>
          </List>
        </Box>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNavigation("/create")}
              sx={{
                textTransform: "none",
                bgcolor: "#E0E0E0",
                color: "black",
                "&:hover": {
                  bgcolor: "#E0E0E0",
                },
              }}
            >
              Create Blog
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ textTransform: "none", ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/login")}
              sx={{ textTransform: "none", ml: 2, fontSize: "17px" }}
            >
              Login
            </Button>
          </Box>
        )}
      </StyledToolbar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "#cfe0f0",
            fontWeight: "bold",
            color: "black",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </AppBar>
  );
};

export default Navbar;
