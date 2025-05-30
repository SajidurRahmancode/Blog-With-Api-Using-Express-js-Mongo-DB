import express from 'express';
import { CreateBlogController } from '../controllers/BlogController.js';
import { CreateCommentController } from '../controllers/CommentController.js';

const router =express.Router();

router.use(express.json({ limit: "5mb" }));
router.use(express.urlencoded({ extended: true, limit: "5mb" }));

router.post("/createblog",CreateBlogController);
router.post("/createcomment",CreateCommentController);

export default router;