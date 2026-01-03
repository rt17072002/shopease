import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cartRouter from "./routes/cartRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;
await connectDB();
await connectCloudinary();

app.use(cors());
app.use(express.json());    

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});