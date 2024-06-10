import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/config";
import Employee from "./employeeModel";

interface ClaimAttributes {
  id: string;
  key: string;
  value: string;
  employeeId: string;
}

interface ClaimCreationAttributes extends Optional<ClaimAttributes, "id"> {}

class Claim
  extends Model<ClaimAttributes, ClaimCreationAttributes>
  implements ClaimAttributes
{
  public id!: string;
  public key!: string;
  public value!: string;
  public employeeId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Claim.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Claim",
  }
);

Claim.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(Claim, { foreignKey: "employeeId" });

export default Claim;
