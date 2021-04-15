import { IUser } from './user';
import { IProduct } from './product';
import { Document, Model, model, Schema } from "mongoose";

export interface IOrder extends Document {
  user: IUser['_id'];
  orderItems: Array<{
    name: string;
    qty: number;
    image: string;
    price: number;
    product: IProduct['_id'];
  }>,
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  },
  totalPrice: number
}

const OrderSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        }
      }
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    }
  });

const Order: Model<IOrder> = model('Order', OrderSchema);

export default Order;
