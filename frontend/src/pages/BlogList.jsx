import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { Container, Grid, Snackbar, SnackbarContent } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const author = localStorage.getItem("user");

  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let filter = {};
        if (category) {
          filter = { category };
        } else if (author) {
          filter = { author };
        } else if (category && author) {
          filter = { category, author };
        }
        const response = await fetch(
          `http://localhost:5000/blogs?filter=${JSON.stringify(filter)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        if (data.length === 0) {
          setSnackbarMessage("No Blogs found!");
          setSnackbarOpen(true);
          navigate("/");
        }
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [category]);

  return (
    <Container sx={{ marginBottom: 10, marginTop: 4 }}>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item key={blog._id} xs={12} sm={6} md={4}>
            <Blog blog={blog} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
    </Container>
  );
};

export default BlogList;
