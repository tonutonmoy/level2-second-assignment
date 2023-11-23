import express from "express";
import { userController } from "../controller/userController";
import { orderController } from "../controller/orderController";

const router = express.Router();

router.post("/", userController.createUserAPI);
router.get("/", userController.getUserAPI);
router.get("/:userId", userController.getSingleUserAPI);
router.put("/:userId", userController.updateSingleUserAPI);
router.delete("/:userId", userController.deleteSingleUserAPI);
router.put("/:userId/orders", orderController.createOrderApi);
router.get("/:userId/orders", orderController.getOrderApi);
router.get("/:userId/orders/total-price", orderController.getTotalPriceApi);

export const allRoutes = router;
