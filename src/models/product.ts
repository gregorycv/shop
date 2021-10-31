import { Optional, Sequelize, DataTypes as DTypes } from 'sequelize';
import { Model } from 'sequelize';

interface ProductAttributes {
  id: number;
  name: string;
  product_type_id: number;
  description: string;
  price: number;
  distributionType: 'piece' | 'g'
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public product_type_id!: number;
  public description!: string;
  public price!: number;
  public distributionType!: 'piece' | 'g';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: typeof DTypes): typeof Product => Product.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_type_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  distributionType: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Product'
});
