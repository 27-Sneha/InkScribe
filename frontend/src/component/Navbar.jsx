import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  List,
  Box,
  Typography,
  styled,
  IconButton,
  Button,
  Icon,
  Menu,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/authFunction";
import logo from "../../src/blog.png";

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
  const navigate = useNavigate();

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
      alert("Logout successful!");
      navigate("/login");
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
            onClick={() => handleLogout}
            sx={{ textTransform: "none", ml: 2 }}
          >
            Logout
          </Button>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
