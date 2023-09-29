const sequelize = require('./index.js');
const {DataTypes} = require('sequelize');
const User = require("./User.js");
const Match = require("./Match.js");

const UserSolicitations = sequelize.define("UserSolicitations", {
  matchOwner: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }

}, { timestamps: false });

User.belongsToMany(Match, { through: 'UserSolicitations' });
Match.belongsToMany(User, { through: 'UserSolicitations' });

UserSolicitations.sync({alter: false, force: false})
.then(() => {
  console.log('UserSolicitations table was (re)created');
})
.catch((err) => console.log(err));

module.exports = UserSolicitations;