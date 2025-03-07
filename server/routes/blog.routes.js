import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogByTopic,
  getBlogsByQueryTopic,
  getSingleBlogById,
} from "../controllers/blog.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// http://localhost:8000/api/v1/blog/createblog
router.post("/createblog", authenticate, createBlog);
router.put("/editblog/:id", authenticate, editBlog);
router.get("/singleblog/:id", getSingleBlogById);
router.get("/allblogs", getAllBlogs);
router.delete("/deleteblog/:id", authenticate, restrict(["admin"]), deleteBlog);
router.get("/blogbytopic/:topic", getBlogByTopic);
// http://localhost:8000/api/v1/blog/blogsbyquery/?topic=js
router.get("/blogsbyquery", getBlogsByQueryTopic);

export default router;
