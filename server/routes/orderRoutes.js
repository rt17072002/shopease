import express from 'express';
import { getAllOrders, placeOrder, updateStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/",getAllOrders);
orderRouter.put("/update-status",updateStatus);
orderRouter.post("/place",placeOrder);

export default orderRouter;