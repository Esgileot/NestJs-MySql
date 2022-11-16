const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_username,
    process.env.db_password, {
    dialect: 'mysql'
});

const UserModel = sequelize.define("user", {
    rank: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
    },
}, {
    timestamps: false,
});

sequelize.sync({ force: true })

export { UserModel }

