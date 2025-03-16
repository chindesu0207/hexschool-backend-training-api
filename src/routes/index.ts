import express from "express";
import creditPackageRoutes from "./user/creditPackageRoutes";
import coachSkillRoutes from "./user/coachSkillRoutes";
import userRoutes from "./user/userRoutes";
import coachAdminRoutes from "./admin/coachRoutes";
import coachRoutes from "./user/coachRoutes";
import courseAdminRoutes from "./admin/courseRoutes";
import courseRoutes from "./user/courseRoutes";

const router = express.Router();

router.use("/credit-package", creditPackageRoutes);
router.use("/coaches/skill", coachSkillRoutes);
router.use("/users", userRoutes);
router.use("/coaches", coachRoutes);
router.use("/course", courseRoutes);

router.use("/admin/coaches/courses", courseAdminRoutes);
router.use("/admin/coaches", coachAdminRoutes);

export default router;
