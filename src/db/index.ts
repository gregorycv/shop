import { DataTypes } from 'sequelize';
import { Sequelize, Options } from 'sequelize';
import { UserModel, OrderModel, OrderItemModel, ProductModel, ProductTypeModel } from '../models';

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
const User = UserModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const OrderItem = OrderItemModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const ProductType = ProductTypeModel(sequelize, DataTypes);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

ProductType.hasMany(Product);
Product.belongsTo(ProductType);

export const db = {
  sequelize,
  Sequelize,
  User,
  Order,
  OrderItem,
  Product,
  ProductType
};

