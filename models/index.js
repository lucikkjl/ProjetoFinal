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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./userModel.js')(sequelize, DataTypes);
db.category = require('./categoryModel.js')(sequelize, DataTypes);
db.product = require('./productModel.js')(sequelize, DataTypes);
db.order = require('./orderModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Yes re-sync done!');
});

module.exports = db;