import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Badge,
  Container,
  Button,
  Modal,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const BlogDetail = () => {
  const [claps, setClaps] = useState(0);
  const [blog, setBlog] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const user = useRecoilValue(userAtom);

  const location = useLocation();
  const { id } = location.state || {};

  const navigate = useNavigate();

  const handleClap = () => {
    setClaps(claps + 1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleEdit = () => {
    setTitle(blog.title);
    setContent(blog.content);
    setCategory(blog.category);
    setImage(blog.image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, image, category }),
      });
      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      const updatedBlog = await response.json();
      console.log("updateeeeee: ", updatedBlog);
      alert("Blog updated successfully!");
      setBlog(updatedBlog);
      handleClose();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

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
    <Container maxWidth="md" sx={{ mt: 4, mb: 10 }}>
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
                {blog.author ? blog.author.charAt(0).toUpperCase() : ""}
              </Avatar>
              <Typography
                variant="h6"
                color="textPrimary"
                sx={{ marginRight: 2, textTransform: "capitalize" }}
              >
                {blog.author}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatDate(blog.createdAt)}
              </Typography>
            </Box>

            {user ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton color="primary" onClick={handleClap}>
                  <Badge badgeContent={claps} sx={{ color: "#728495" }}>
                    <ThumbUpAltIcon fontSize="medium" />
                  </Badge>
                </IconButton>
                <IconButton sx={{ color: "#1261A0" }} onClick={handleEdit}>
                  <EditIcon fontSize="medium" />
                </IconButton>
                <IconButton sx={{ color: "#D11A2A" }} onClick={handleDelete}>
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton color="primary" onClick={handleClap}>
                  <Badge badgeContent={claps} sx={{ color: "#728495" }}>
                    <ThumbUpAltIcon fontSize="medium" />
                  </Badge>
                </IconButton>
              </Box>
            )}
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
            {blog.content ? parse(blog.content) : "hello"}
          </Typography>
        </Box>
      ) : (
        <p>loading..</p>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Blog
          </Typography>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="sport">Sport</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="political">Political</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{ mt: 2, backgroundColor: "#334464" }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default BlogDetail;
