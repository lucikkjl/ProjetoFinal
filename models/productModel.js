module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        idProduct: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        idCategory: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })

    return Product;

}
