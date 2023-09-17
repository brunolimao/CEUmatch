const sequelize = require('./index.js');
const User = require("./User.js");
const Match = require("./Match.js");

const MatchParticipants = sequelize.define("MatchParticipants", {}, { timestamps: false });

User.belongsToMany(Match, { through: 'MatchParticipants' });
Match.belongsToMany(User, { through: 'MatchParticipants' });

MatchParticipants.sync({alter: false, force: false})
.then(() => {
  console.log('MatchParticipants table was (re)created');
})
.catch((err) => console.log(err));

module.exports = MatchParticipants;