import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// export const addProduct = async (req, res) => {
//     try {
//         const { name, price, category, description, stock, sales } = req.body;
//         const imageFile = req.file;
//         if (!name || !price || !category || !description || !stock || !imageFile) {
//             return res.json({ success: false, message: "Data missing" });
//         }

//         let imageUrl = cloudinary.uploader.upload(imageFile.path).then((result) => {
//             return result.secure_url;
//         }).catch((error) => {
//             console.error("Cloudinary upload error:", error);
//             throw new Error("Image upload failed");
//         });

//         const newProduct = new Product({
//             name,
//             price,
//             category,
//             description,
//             stock,
//             sales,
//             image: await imageUrl,
//         });

//         await newProduct.save();

//         res.status(201).json({ success: true, data: newProduct, message: "Product added successfully" });

//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// }

export const addProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock, sales = 0 } = req.body;
    const imageFile = req.file;

    // Image IS required for CREATE
    if (!name || !price || !category || !description || !stock || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Required data missing",
      });
    }

    // ✅ Use await properly, no .then circus
    const uploadResult = await cloudinary.uploader.upload(
      imageFile.path
    );

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      stock,
      sales,
      image: uploadResult.secure_url,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const removeProduct = async (req, res) => {
    try {
        const productId = req.body.id;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateProduct = async (req, res) => {
  try {
    const { productId, name, price, category, description, stock } = req.body;
    const imageFile = req.file;

    if (!productId || !name || !price || !category || !description || !stock) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const updatedData = {
      name,
      price,
      category,
      description,
      stock,
    };

    // ✅ Upload image ONLY if a new file is provided
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(
        imageFile.path
      );
      updatedData.image = uploadResult.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// export const updateProduct = async (req, res) => {
//     try {
//         const { productId, name, price, category, description, stock } = req.body;
//         const image = req.file;
//         if (!name || !price || !category || !description || !stock || !image) {
//             return res.json({ success: false, message: "Data missing" });
//         }

//         let imageUrl = cloudinary.uploader.upload(imageFile.path).then((result) => {
//             return result.secure_url;
//         }).catch((error) => {
//             console.error("Cloudinary upload error:", error);
//             throw new Error("Image upload failed");
//         });

//         const updatedData = {
//             name,
//             price,
//             category,
//             description,
//             stock,
//             image: await imageUrl,
//         };

//         const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
        
//         res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully" });
//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// }

// export const updateStock = async (req, res) => {
//     try {
//         const { productId, newStock } = req.body;
//         await Product.findByIdAndUpdate(productId, { stock: newStock });
//         res.status(200).json({ success: true, message: "Stock updated successfully" });
//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// }
