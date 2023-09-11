import { Router } from "express";
import { createPost, deletePost, editPost, getPosts } from "../controller/post";
import { isLoggedIn } from "../middleware/account";

const router: Router = Router();

router.route("/post").post(isLoggedIn, createPost).get(isLoggedIn, getPosts);
router
  .route("/post/:id")
  .put(isLoggedIn, editPost)
  .delete(isLoggedIn, deletePost);

export { router };
