const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      // type: DataTypes.INTEGER,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
      
      // allowNull: false,
      // autoIncrement: true,
      // primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    launch_date:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { timestamps: false });
};
