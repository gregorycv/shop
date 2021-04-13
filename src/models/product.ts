import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    id: String,
    name: String,
    price: Number,
  },
);

const Product = model('Product', ProductSchema);

export default Product;
