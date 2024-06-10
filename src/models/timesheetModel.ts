import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";

class Timesheet extends Model {
  public id!: string;
  public employeeId!: string;
  public shiftId!: string;
  public projectName!: string;
  public taskName!: string;
  public fromDate!: Date;
  public toDate!: Date;
  shift: any;
  employee: any;

  static associate(models: any) {
    Timesheet.belongsTo(models.Employee, { foreignKey: "employeeId" });
    Timesheet.belongsTo(models.Shift, { foreignKey: "shiftId" });
  }
}

Timesheet.init(
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
    shiftId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Timesheet",
  }
);

export default Timesheet;
