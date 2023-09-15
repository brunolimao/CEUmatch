const sequelize = require('./index.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define("Users", {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

User.sync({alter: false, force: false})
.then(() => {
  console.log('User table was (re)created');
})
.catch((err) => console.log(err));

module.exports = User;