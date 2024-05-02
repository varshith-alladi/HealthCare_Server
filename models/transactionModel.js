const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    accountholder: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    accountnumber: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
});

const Transaction = mongoose.model('transactions', transactionSchema);
module.exports = Transaction;