import React from "react";
import { Container, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledContainer = styled(Container)({
  marginTop: "50px",
  textAlign: "center",
});

const AboutUs = () => {
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to InkScribe! We are passionate writers and tech enthusiasts
        dedicated to bringing you insightful content on a variety of topics
        ranging from technology to sports and everything in between.
      </Typography>
      <Typography variant="body1" paragraph>
        Our goal is to provide you with engaging and informative articles that
        cater to your interests and keep you informed about the latest trends
        and developments in the world around us.
      </Typography>
      <Typography variant="body1">
        Feel free to explore our blog and connect with us through our social
        media channels. Thank you for visiting InkScribe!
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
          Back to Home
        </Link>
      </Typography>
    </StyledContainer>
  );
};

export default AboutUs;
