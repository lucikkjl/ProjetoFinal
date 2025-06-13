const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

const db = {}

db.Sequelize = Sequelize; //classe principal do sequelize, construtor/objeto da biblioteca 
                          //permite criar conexões, definir modelos
db.sequelize = sequelize; // conexão ativa com o seu banco, executa as queries, sincroniza modelos

db.user = require('./userModel.js')(sequelize, DataTypes);
db.category = require('./categoryModel.js')(sequelize, DataTypes);
db.product = require('./productModel.js')(sequelize, DataTypes);
db.order = require('./orderModel.js')(sequelize, DataTypes);
db.orderItems = require('./orderItems.js')(sequelize, DataTypes);

db.sequelize.sync({ force: true })
    .then(() => {
        console.log('Banco recriado, tabelas apagadas e criadas novamente');
});

// N:N order and product
db.order.belongsToMany(db.product, {
  through: db.orderItems,
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products'
});

db.product.belongsToMany(db.order, {
  through: db.orderItems,
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders'
});

// 1:N user e order

db.user.hasMany(db.order, {
    foreignKey: 'userId',
    as: 'orders'
})

db.order.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user'
})

// 1:N category e product

db.category.hasMany(db.product, {
  foreignKey: 'categoryId',
  as: 'products'
});

db.product.belongsTo(db.category, {
  foreignKey: 'categoryId',
  as: 'category'
});


module.exports = db;