import { Optional, Sequelize, DataTypes as DTypes } from 'sequelize';
import { Model } from 'sequelize';

interface ProductTypeAttributes {
  id: number;
  name: string;
}

interface ProductTypeCreationAttributes extends Optional<ProductTypeAttributes, 'id'> {}

class ProductType extends Model<ProductTypeAttributes, ProductTypeCreationAttributes> implements ProductTypeAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize, DataTypes: typeof DTypes): typeof ProductType =>
  ProductType.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductType',
    }
  );
