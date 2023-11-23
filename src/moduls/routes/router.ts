import express from "express";
import { userController } from "../controller/userController";

const router = express.Router();

router.post("/", userController.createUserAPI);
router.get("/", userController.getUserAPI);
router.get("/:userId", userController.getSingleUserAPI);
router.put("/:userId", userController.updateSingleUserAPI);
router.delete("/:userId", userController.deleteSingleUserAPI);

export const allRoutes = router;
