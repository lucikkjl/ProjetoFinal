const db = require("../models");

const Order = db.order;
const Product = db.product;

const addOrder = async (req, res) => {
  try {
    let info = {
      idUser: req.body.idUser,
    };

    const order = await Order.create(info);
    res.status(201).send(order);
    console.log(order.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.findAll({});
    res.status(200).send(orders);
    orders.forEach(o => console.log(o.get({ plain: true })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getOneOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let order = await Order.findOne({ where: { idOrder: id } });
    res.status(200).send(order);
    if (order) console.log(order.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    let id = req.params.id;
    const order = await Order.update(req.body, { where: { idOrder: id } });
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    let id = req.params.id;
    await Order.destroy({ where: { idOrder: id } });
    res.status(200).send("Order deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllOrdersWithProducts = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Product,
        as: 'products',
        through: { attributes: [] }
      }
    });
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getOrderWithProductsAndUser = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await db.order.findOne({
      where: { idOrder: id },
      include: [
        { model: db.product, as: 'products', through: { attributes: [] } },
        { model: db.user, as: 'user' }
      ]
    });
    if (!order) return res.status(404).send({ message: 'Order not found' });
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
  getAllOrdersWithProducts,
  getOrderWithProductsAndUser
};
