import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customer: { type: String, required: true, },

    // ✅ total number of items (keep this)
    items: { type: Number, required: true, },
    total: { type: Number, required: true, },
    status: { type: String, default: "Pending", },
    payment: { type: String, default:false, }, // was boolean-ish, now meaningful},
    date: { type: Date, default: Date.now, },
    user:{
        address:String,
        email:String,
        name:String,
        phone:Number,
    },

    // ✅ actual cart snapshot (NEW)
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: String,
            price: Number,
            image: String,
            quantity: Number,
        },
    ],
});


const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;