import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;

    if (!cartId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing cart data",
      });
    }

    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      cart = new Cart({
        cartId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        item => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
