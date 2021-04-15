import { Document, Model, model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: Number,
      required: true
    },
    image: {
      type: String
    }
  }
);

const Product: Model<IProduct> = model('Product', ProductSchema);

export default Product;
