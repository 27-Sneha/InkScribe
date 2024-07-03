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
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

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

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json(user).send("Register successful!");
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }

    res.send("Login successful!");
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/create", upload.single("image"), async (req, res) => {
  const { title, summary, category, content, image, email } = req.body;
  console.log("Body", req.body);
  console.log(email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const newBlog = await Blog.create({
      title,
      summary,
      category,
      content,
      image,
      author: user.name,
    });
    res.status(201).json(newBlog);
  } catch (err) {
    console.log("ERROR");
    res.status(400).json({ message: err.message });
  }
});

app.get("/blogs", async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};

  try {
    const blogs = await Blog.find(filter);
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
