const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const User = require("./models/user");
const Blog = require("./models/blog");
const connectDB = require("./connection");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

connectDB();

app.post("/create", upload.single("image"), async (req, res) => {
  const { title, summary, category, content, image, author } = req.body;
  console.log("Body", req.body);

  try {
    const newBlog = await Blog.create({
      title,
      summary,
      category,
      content,
      image,
      author,
    });
    res.status(201).json(newBlog);
  } catch (err) {
    console.log("ERROR");
    res.status(400).json({ message: err.message });
  }
});

app.get("/blogs", async (req, res) => {
  const { filter } = req.query;
  try {
    const blogs = await Blog.find(JSON.parse(filter));
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, image, category } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(id, {
      title,
      content,
      image,
      category,
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ title, content, image, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
