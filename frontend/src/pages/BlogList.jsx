import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { Container, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const query = category ? `?category=${category}` : "";
        const response = await fetch(`http://localhost:5000/blogs${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        if (data.length === 0) {
          alert("No blogs found for this category");
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
    <Container>
      <Grid container spacing={4} sx={{ marginTop: 3 }}>
        {blogs.map((blog) => (
          <Grid item key={blog._id} xs={12} sm={6} md={4}>
            <Blog blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogList;
