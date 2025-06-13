module.exports = (sequelize, DataTypes) => {

const orderItems = sequelize.define('orderItems', {
    idOrderItem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    orderId: {                
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',  
            key: 'idOrder'
        }
    },
    productId: {              
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


// order (cart) has many products
//produtcs belongs to many orders