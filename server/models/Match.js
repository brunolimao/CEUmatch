const sequelize = require('./index.js');
const {DataTypes} = require('sequelize');
const User = require("./User.js");

const Match = sequelize.define("Matches", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    matchDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    matchCourt: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    matchSport: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, { timestamps: false });

Match.belongsTo(User, { as: 'owner', foreignKey: 'userId' })

Match.sync({alter: false, force: false})
.then(() => {
  console.log('Match table was (re)created');
})
.catch((err) => console.log(err));

module.exports = Match;