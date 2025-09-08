import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router.post("/", orderController.createOrder);   
router.get("/me", orderController.getMyOrders);
router.get("/:id", orderController.getOrderById); 

export default router;
