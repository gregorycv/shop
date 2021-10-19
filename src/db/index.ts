import { DataTypes } from 'sequelize';
import { Sequelize, Options } from 'sequelize';
import { User, Order, OrderItem, Product } from '../models';

const config: Options = {
  host: 'localhost',
  username: 'postgres',
  password: '123',
  database: 'testdb',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const sequelize = new Sequelize(config);
const UserModel = User(sequelize, DataTypes);
const OrderModel = Order(sequelize, DataTypes);
const OrderItemModel = OrderItem(sequelize, DataTypes);
const ProductModel = Product(sequelize, DataTypes);

UserModel.hasMany(OrderModel);
OrderModel.belongsTo(UserModel);

OrderModel.hasMany(OrderItemModel);
OrderItemModel.belongsTo(OrderModel);

ProductModel.hasMany(OrderItemModel);
OrderItemModel.belongsTo(ProductModel);

export const db = {
  sequelize,
  Sequelize,
  User: UserModel,
  Order: OrderModel,
  OrderItem: OrderItemModel,
  Product: ProductModel,
};

