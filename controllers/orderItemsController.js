const db = require("../models");

const OrderItem = db.orderItems;

const addOrderItem = async (req, res) => {
  try {
    let info = {
      idOrder: req.body.idOrder,
      idProduct: req.body.idProduct,
    };

    const item = await OrderItem.create(info);
    res.status(201).send(item);
    console.log(item.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllOrderItems = async (req, res) => {
  try {
    let items = await OrderItem.findAll({});
    res.status(200).send(items);
    items.forEach(i => console.log(i.get({ plain: true })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getOneOrderItem = async (req, res) => {
  try {
    let id = req.params.id;
    let item = await OrderItem.findOne({ where: { idOrderItem: id } });
    res.status(200).send(item);
    if (item) console.log(item.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    let id = req.params.id;
    const item = await OrderItem.update(req.body, { where: { idOrderItem: id } });
    res.status(200).send(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    let id = req.params.id;
    await OrderItem.destroy({ where: { idOrderItem: id } });
    res.status(200).send("OrderItem deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addOrderItem,
  getAllOrderItems,
  getOneOrderItem,
  updateOrderItem,
  deleteOrderItem
};
