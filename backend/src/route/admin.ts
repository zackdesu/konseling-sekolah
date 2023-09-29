import { Router } from "express";
import { getAllUsers, beCounselor, beAdmin } from "../controller/admin";
import { isLoggedIn } from "../middleware/account";
import { isAdmin } from "../middleware/admin";

export const router: Router = Router();

router
  .route("/admin")
  .get(isLoggedIn, isAdmin, getAllUsers)
  .post(isLoggedIn, isAdmin, beCounselor)
  .put(isLoggedIn, isAdmin, beAdmin);
