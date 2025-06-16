module.exports = (sequelize, DataTypes) => {

const orderItems = sequelize.define('orderItems', {
    idOrderItem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idOrder: {                
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',  
            key: 'idOrder'
        }
    },
    idProduct: {              
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'idProduct'
        }
    }
});

return orderItems;

}
