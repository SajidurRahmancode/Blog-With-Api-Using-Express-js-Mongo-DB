import express from 'express';
import { CreateCommentController } from '../controllers/CommentController.js';
import { verifyToken  } from './../middlewares/AuthVerification.js';
import { register,login,logout } from '../controllers/UserController.js';
import { createblog,readblog,editblog,deleteblog,ReadBlogWithCommentController } from '../controllers/BlogController.js';

const router =express.Router();

router.use(express.json({ limit: "5mb" }));
router.use(express.urlencoded({ extended: true, limit: "5mb" }));


router.post("/createcomment",CreateCommentController);
router.get("/ReadBlogComment/:blogID",ReadBlogWithCommentController);



router.post("/register/",register);
router.post("/login/",login);
router.post("/logout/",logout);
router.post("/create-blog", verifyToken, createblog);
router.get("/read-blog", verifyToken, readblog);
router.put("/edit-blog", verifyToken, editblog);
router.delete("/delete-blog", verifyToken, deleteblog);

export default router;