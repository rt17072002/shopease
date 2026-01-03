import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// export const placeOrder = async (req, res) => {
//     try {
//         const orderData = req.body;
//         res.json(orderData);
//     } catch (error) {
//         console.error("Error updating order status:", error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// }

export const placeOrder = async (req, res) => {
  try {
    const { user, cart } = req.body;

    // Basic validation
    if (!user || !cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderItems = cart.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    const newOrder = new Order({
      customer: user.name,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      items: totalItems,
      total: totalAmount,
      orderItems,
      status: "Pending",
      payment: "Pending",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: "Order ID or status missing",
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Status updated!",
            data: updatedOrder,
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
