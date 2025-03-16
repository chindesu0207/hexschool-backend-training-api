import { Router } from "express";
import { validateData, validateUUID } from "../../middleware/validateData";
import creditPackageSchema from "../../schema/creditPackageSchema";
import { isAuth } from "../../middleware/isAuth";
import {
  createCreditPackage,
  deleteCreditPackage,
  getCreditPackages,
  purchaseCreditPackage,
} from "../../controllers/creditPackageController";

const router = Router();

router.get("/", getCreditPackages);
router.post(
  "/",
  validateData(creditPackageSchema, "body"),
  createCreditPackage,
);
router.delete("/:creditPackageId", validateUUID, deleteCreditPackage);

router.post("/:creditPackageId", isAuth, validateUUID, purchaseCreditPackage);

export default router;
