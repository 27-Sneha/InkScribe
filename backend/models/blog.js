const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const blogModel = model("Blog", blogSchema);
module.exports = blogModel;
