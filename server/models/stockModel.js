import mongoose from 'mongoose';

const stockSchema = mongoose.Schema(
  {
    symbol: {
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
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
