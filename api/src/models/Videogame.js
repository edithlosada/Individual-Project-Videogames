const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('videogame', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    released:{ //Fecha de lanzamiento
      type: DataTypes.STRING,
    },
    img_url:{
      type: DataTypes.TEXT,
    },
    rating:{
      type: DataTypes.FLOAT,
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    // genres:{
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    // },
  }, {timestamps: false});
};
