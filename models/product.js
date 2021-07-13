const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
        default: () => Date.now() + 7*24*60*60*1000
    },
    editedAt: {
        type: Date,
        required: false,
        default: () => Date.now() + 7*24*60*60*1000
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema, 'products');
