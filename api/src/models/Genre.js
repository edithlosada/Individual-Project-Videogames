const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('genre', {
    // id:{
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoincremet: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {timestamps: false});
};
