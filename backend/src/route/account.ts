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
import {
  isMBTIValid,
  isPhoneNumberValid,
  isRealNameValid,
  isUsernameValid,
} from "../middleware/validator";
import { loginLimit, registerLimit } from "../middleware/rateLimit";
const router: Router = Router();

router.post(
  "/register",
  body("email").isEmail(),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  registerLimit,
  isUsernameValid,
  isRealNameValid,
  midWareRegister,
  register
);
router
  .route("/login")
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  .post(loginLimit, postLogin)
  .put(isLoggedIn, refreshUserToken)
  .delete(isLoggedIn, logout);

router
  .route("/account")
  .get(isLoggedIn, getAccount)
  .put(
    isLoggedIn,
    isUsernameValid,
    isRealNameValid,
    isMBTIValid,
    isPhoneNumberValid,
    editAccount
  )
  .delete(isLoggedIn, deleteAccount);

router.put("/password", isLoggedIn, changePassword);

export { router };
