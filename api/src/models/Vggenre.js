const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('vggenre', {}, {timestamps: false});
};
