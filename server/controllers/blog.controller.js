import mongoose from "mongoose";
import Blog from "../models/Blog.model.js";

export const createBlog = async (req, res, next) => {
  const { title, content, topic, image, ref, location } = req.body;
  const userId = req.userId;

  try {
    let blog = new Blog({
      title,
      content,
      topic,
      image,
      ref,
      location,
    });
    await blog.save();
    return res
      .status(200)
      .json({ success: true, message: "Blog saved successfully...!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const editBlog = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });
    }
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found...!" });
    }

    const updateBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Blog updated", data: updateBlog });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getSingleBlogById = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });
    }
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found...!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog found", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    return res
      .status(200)
      .json({ sucess: true, message: "Blogs founf", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBlogByTopic = async (req, res, next) => {
  const t = req.params.topic;

  try {
    const blogs = await Blog.find({ topic: new RegExp(t, "i") });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No blogs found with topic: ${t}`,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs found", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBlogsByQueryTopic = async (req, res, next) => {
  const t = req.query.topic;
  try {
    const blogs = await Blog.find({ topic: new RegExp(t, "i") });
    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: `No blogs with topic: ${t}` });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blogs found", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Wrong ID" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found...!" });
    }

    await Blog.findByIdAndDelete(blogId);

    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully...!" });
  } catch (error) {
    return  res.status(500).json({success: false, message: "Server error...!"})
  }
};
