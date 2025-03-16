import { Router } from "express";
import { validateData } from "../../middleware/validateData";
import {
  editProfileSchema,
  loginSchema,
  userSchema,
} from "../../schema/userSchema";
import {
  getProfile,
  signin,
  signup,
  updateProfile,
} from "../../controllers/userController";
import { isAuth } from "../../middleware/isAuth";

const router = Router();

router.post("/signup", validateData(userSchema, "body"), signup);
router.post("/login", validateData(loginSchema, "body"), signin);
router.get("/profile", isAuth, getProfile);
router.put(
  "/profile",
  isAuth,
  validateData(editProfileSchema, "body"),
  updateProfile,
);

export default router;
