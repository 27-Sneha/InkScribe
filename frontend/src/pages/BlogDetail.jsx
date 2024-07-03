import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Badge,
  Container,
  Button,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const BlogDetail = () => {
  const [claps, setClaps] = useState(0);
  const [blog, setBlog] = useState(null);

  const location = useLocation();
  const { id } = location.state || {};

  const navigate = useNavigate();

  const handleClap = () => {
    setClaps(claps + 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      } else {
        alert("Blog deleted!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {blog ? (
        <Box>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {blog.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "#b7d0e1",
                  color: "#194569",
                  marginRight: 1,
                  width: 50,
                  height: 50,
                }}
              >
                {blog.author.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                variant="h6"
                color="textPrimary"
                sx={{ marginRight: 2 }}
              >
                {blog.author}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatDate(blog.createdAt)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="primary" onClick={handleClap}>
                <Badge badgeContent={claps} sx={{ color: "#728495" }}>
                  <ThumbUpAltIcon fontSize="medium" />
                </Badge>
              </IconButton>
              <IconButton sx={{ color: "#000000" }} onClick={handleDelete}>
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: "100%",
              height: "500px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          />
          <Typography variant="body1" paragraph>
            {parse(blog.content)}
          </Typography>
        </Box>
      ) : (
        <p>loading..</p>
      )}
    </Container>
  );
};

export default BlogDetail;
