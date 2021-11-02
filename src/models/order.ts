import { Optional, Sequelize, DataTypes as DTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ORDER_STATUS, ORDER_TYPE } from '../utils/constants';

interface OrderAttributes {
  id: number;
  userId: number;
  type: ORDER_TYPE;
  status: ORDER_STATUS;
  totalPrice: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  
  public id!: number;
  public userId!: number;
  public type!: ORDER_TYPE;
  public status!: ORDER_STATUS;
  public totalPrice!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: typeof DTypes): typeof Order => Order.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Order'
});
