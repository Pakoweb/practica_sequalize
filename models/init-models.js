import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _adri17 from  "./adri17.js";

export default function initModels(sequelize) {
  const adri17 = _adri17.init(sequelize, DataTypes);


  return {
    adri17,
  };
}
