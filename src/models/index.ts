import sequelize from "../config/config";
import Employee from "./employeeModel";
import Shift from "./shiftModel";
import Timesheet from "./timesheetModel";
import Claim from "./claimsModel";

const models = {
  Employee: Employee,
  Shift: Shift,
  Timesheet: Timesheet,
  Claim: Claim,
};

Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

const initModels = () => {
  Employee.sync();
  Shift.sync();
  Timesheet.sync();
  Claim.sync();
};

export { sequelize, initModels, Employee, Shift, Timesheet, Claim };
