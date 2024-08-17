const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    products: {
      type:[
        {productID:{
          type:mongoose.Types.ObjectId,
          ref:'products'
        },
           amount:Number,
           priceForSingle:Number
        }],
      of: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
