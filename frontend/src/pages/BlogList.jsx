import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { Container, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const author = useRecoilValue(userAtom);

  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};

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
    <Container sx={{ marginBottom: 10, marginTop: 4 }}>
      <Grid container spacing={4}>
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
