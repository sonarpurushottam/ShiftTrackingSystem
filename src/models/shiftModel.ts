import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import Employee from "./employeeModel";
import Timesheet from "./timesheetModel";

class Shift extends Model {
  public id!: string;
  public employeeId!: string;
  public startTime!: Date;
  public endTime!: Date | null;
  public actualHours!: number;
  Employee: any;

  static associate(models: any) {
    Shift.belongsTo(models.Employee, { foreignKey: "employeeId" });
    Shift.hasMany(models.Timesheet, { foreignKey: "shiftId" });
  }
}

Shift.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Shift",
  }
);

export default Shift;
