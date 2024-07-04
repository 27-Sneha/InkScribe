import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
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

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const author = useRecoilValue(userAtom);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("category", category);
    formData.set("content", content);
    formData.set("image", image);
    formData.set("author", author);

    console.log("Details: ", { title, summary, content, image, author });

    try {
      const response = await fetch("http://localhost:5000/create", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Blog created successfully!");
        navigate("/");
      } else {
        alert("Failed to create blog");
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
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
        Create Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Summary"
          fullWidth
          multiline
          rows={2}
          margin="dense"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <FormControl fullWidth style={{ marginTop: 8, marginBottom: 5 }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            fullWidth
            labelId="category"
            id="category"
            value={category}
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
            backgroundColor: "white",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginBottom: 3, backgroundColor: "#c8d7f6", color: "black" }}
        >
          Create
        </Button>
      </form>
    </Container>
  );
};

export default CreateForm;
