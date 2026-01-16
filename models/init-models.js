import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _log4 from  "./log4.js";

export default function initModels(sequelize) {
  const log4 = _log4.init(sequelize, DataTypes);


  return {
    log4,
  };
}
