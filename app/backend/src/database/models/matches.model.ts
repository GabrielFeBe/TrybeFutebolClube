import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import db from '.';
import Teams from './teams.model';

const sequelize = db;

class Matches extends Model<InferAttributes<Matches>, InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId:ForeignKey<Teams['id']>;;
  declare homeTeamGoals:number;
  declare awayTeamId: ForeignKey<Teams['id']>;
  declare awayTeamGoals:number;
  declare inProgress:boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

Teams.belongsTo(Matches, { foreignKey: 'homeTeamId', as: 'homeTeamName' });
Teams.belongsTo(Matches, { foreignKey: 'awayTeamId', as: 'awayTeamName' });

export default Matches;
