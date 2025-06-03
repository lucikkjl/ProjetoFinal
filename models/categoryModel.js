module.exports = (sequelize, DataTypes) => {
    
    const Category = sequelize.define("category", {
        idCategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Category;

}
