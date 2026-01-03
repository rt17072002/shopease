import express from 'express';
import { addProduct, getAllProducts, removeProduct, updateProduct } from '../controllers/productsController.js';
import upload from '../middlewares/multer.js';

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.delete("/remove", removeProduct);
productRouter.put("/update", upload.single("image"), updateProduct);

export default productRouter;