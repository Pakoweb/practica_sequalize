import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class log4 extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    log: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'log4',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

////npx sequelize-auto -h localhost -d api_rest_db -u root -x "" -p 3306 --dialect mysql -o "./models" -l esm -t proveedores
