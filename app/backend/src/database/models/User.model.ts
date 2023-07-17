import { CreationOptional, DataTypes,
  InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from './index';

const sequelize = db;

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare username:string;
  declare password: string;
  declare role:string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: false,
  underscored: true,
});

// UserModel.hasMany(Posts, { foreignKey: 'userId', as: 'posts' })

export default User;
