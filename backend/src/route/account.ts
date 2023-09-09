import { Router } from "express";
import {
  register,
  postLogin,
  getLogin,
  refreshUserToken,
  logout,
} from "../controller/account";
import { body } from "express-validator";
import { isLoggedIn, midWareRegister } from "../middleware/account";
import { isRealNameValid, isUsernameValid } from "../middleware/validator";
const router: Router = Router();

router.post(
  "/register",
  body("email").isEmail(),
  isUsernameValid,
  isRealNameValid,
  midWareRegister,
  register
);
router
  .route("/login")
  .post(postLogin)
  .get(isLoggedIn, getLogin)
  .put(refreshUserToken)
  .delete(logout);
export { router };
