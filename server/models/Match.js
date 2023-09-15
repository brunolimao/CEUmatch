const sequelize = require('./index.js');
const {DataTypes} = require('sequelize');
const User = require("./User.js")

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

    matchParticipants: {
        type: DataTypes.STRING,
        allowNull: true,
    },

});

Match.belongsTo(User)
User.hasMany(Match,{
    foreignKey: "matchOwner"
})

Match.sync({alter: false, force: false})
.then(() => {
  console.log('Match table was (re)created');
})
.catch((err) => console.log(err));

module.exports = Match;