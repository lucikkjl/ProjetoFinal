module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("order", {
        idOrder: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Order;

};
