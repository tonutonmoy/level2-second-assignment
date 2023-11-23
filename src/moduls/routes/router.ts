import express from "express";
import { userController } from "../controller/userController";

const router = express.Router();

router.post("/", userController.createUserAPI);
router.get("/", userController.getUserAPI);
router.get("/:userId", userController.getSingleUserAPI);

export const allRoutes = router;
