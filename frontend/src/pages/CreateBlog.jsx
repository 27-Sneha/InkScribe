import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const author = localStorage.getItem("user");

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Details: ", { title, summary, content, image, author });

    try {
      const response = await fetch("http://localhost:5000/create", {
        method: "POST",
        body: JSON.stringify({
          title,
          summary,
          category,
          content,
          image,
          author,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSnackbarMessage("Blog created successfully!");
        setSnackbarOpen(true);
        navigate("/");
      } else {
        setSnackbarMessage("Failed to create blog");
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Error: ", err);
      alert("Error creating blog. Please try again.");
    }

    setTitle("");
    setSummary("");
    setCategory("");
    setContent("");
    setImage(null);
  };

  return (
    <Container maxWidth="md" sx={{ mb: 5 }}>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
        Create Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={title}
          sx={{ backgroundColor: "#F7FAFD" }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Summary"
          fullWidth
          multiline
          rows={2}
          margin="dense"
          value={summary}
          sx={{ backgroundColor: "#F7FAFD" }}
          onChange={(e) => setSummary(e.target.value)}
        />
        <FormControl fullWidth style={{ marginTop: 8, marginBottom: 5 }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            fullWidth
            labelId="category"
            id="category"
            value={category}
            sx={{ backgroundColor: "#F7FAFD" }}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
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
          fullWidth
          margin="dense"
          value={image}
          sx={{ backgroundColor: "#F7FAFD" }}
          onChange={(e) => setImage(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={content}
          modules={modules}
          formats={formats}
          onChange={(value) => setContent(value)}
          placeholder="Write something amazing..."
          style={{
            marginBottom: "20px",
            marginTop: "10px",
            backgroundColor: "#F7FAFD",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginBottom: 3,
            bgcolor: "#c8d7f6",
            color: "black",
            "&:hover": {
              bgcolor: "#c8d7f6",
            },
          }}
        >
          Create
        </Button>
      </form>
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

export default CreateBlog;
