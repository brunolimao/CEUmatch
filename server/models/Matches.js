module.exports = (sequelize, DataTypes) => {

    const Matches = sequelize.define("Matches", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        matchDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        matchTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        matchCourt: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        matchOwner: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        matchParticipants: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    });

    return Matches;
}