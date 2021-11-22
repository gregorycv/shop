import { db } from '../db';
import { CreateOrderDto, CartItem, PricedCartItem } from '../interfaces/order';
import { Order } from '../models/order';

class OrderService {
  public async placeOrder(orderData: CreateOrderDto): Promise<Order> {
    const { userId, type, items } = orderData;
    const transaction = await db.sequelize.transaction();

    try {
      const pricedCartItems = await this.addProductPricesToCartItems(items);
      const newOrder = await db.Order.create(
        {
          userId,
          type,
          totalPrice: this.calculateTotalOrderPrice(pricedCartItems),
        },
        { transaction }
      );

      // TODO: extract to OrderItemsService!!!!
      const orderItems = pricedCartItems.map(pricedCartItem => ({ ...pricedCartItem, orderId: newOrder.id }));
      await db.OrderItem.bulkCreate(orderItems, { transaction });

      await transaction.commit();
      return newOrder;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error in placeOrderTransaction');
    }
  }

  private calculateTotalOrderPrice(pricedCartItems: PricedCartItem[]): number {
    return pricedCartItems.reduce((sum, { amount, price }) => (sum += amount * price), 0);
  }

  private async addProductPricesToCartItems(cartItems: CartItem[]): Promise<PricedCartItem[]> {
    const productIds = cartItems.map(({ productId }) => productId);
    const productPrices = await db.Product.findAll({
      attributes: ['id', 'price'],
      where: {
        id: productIds,
      },
    });

    if (productPrices.length !== productIds.length)
      throw new Error('Error in getProductPrices; some products were not found');

    const pricedCartItems = cartItems.map(cartItem => ({
      ...cartItem,
      price: productPrices.find(({ id }) => cartItem.productId === id)?.price || 0,
    }));

    return pricedCartItems;
  }
}

export default OrderService;
