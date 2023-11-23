"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const orderController_1 = require("../controller/orderController");
const router = express_1.default.Router();
router.post("/", userController_1.userController.createUserAPI);
router.get("/", userController_1.userController.getUserAPI);
router.get("/:userId", userController_1.userController.getSingleUserAPI);
router.put("/:userId", userController_1.userController.updateSingleUserAPI);
router.delete("/:userId", userController_1.userController.deleteSingleUserAPI);
router.put("/:userId/orders", orderController_1.orderController.createOrderApi);
router.get("/:userId/orders", orderController_1.orderController.getOrderApi);
router.get("/:userId/orders/total-price", orderController_1.orderController.getTotalPriceApi);
exports.allRoutes = router;
