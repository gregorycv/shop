import { Optional, Sequelize, DataTypes as DTypes } from 'sequelize';
import { Model } from 'sequelize';

interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
}

export interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public amount!: number;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: typeof DTypes): typeof OrderItem => OrderItem.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  orderId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  productId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'OrderItem'
});
