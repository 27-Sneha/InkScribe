import React from "react";
import { Grid, Box, Typography, styled, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../src/blog.png";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#334464",
        height: "40px",
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        marginTop: 5,
      }}
    >
      <StyledToolbar>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          item
          sx={{ mb: 3 }}
        >
          <Grid>
            <Typography variant="body2" align="center" sx={{ color: "white" }}>
              © {new Date().getFullYear()} InkScribe. All rights reserved.
            </Typography>
          </Grid>
          <Grid item sx={{ ml: 2 }}>
            <Link to="/">
              <img
                src={logo}
                height="20px"
                margin="50px"
                style={{ marginRight: "8px" }}
                alt=""
              />
            </Link>
          </Grid>
        </Grid>
      </StyledToolbar>
    </Box>
  );
};

export default Footer;
