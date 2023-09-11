import { Router } from "express";
import {
  register,
  postLogin,
  refreshUserToken,
  logout,
  getAccount,
  editAccount,
  changePassword,
  deleteAccount,
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
  .put(isLoggedIn, refreshUserToken)
  .delete(isLoggedIn, logout);

router
  .route("/account")
  .get(isLoggedIn, getAccount)
  .put(isLoggedIn, editAccount)
  .delete(isLoggedIn, deleteAccount);

router.put("/password", isLoggedIn, changePassword);

export { router };
