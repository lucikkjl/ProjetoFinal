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
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idProduct: {              
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'idProduct'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        
    }
});

return orderItems;

}
