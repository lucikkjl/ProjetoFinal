const db = require("../models");

const OrderItem = db.orderItems;

const addOrderItem = async (req, res) => {

  let info = {
    orderId: req.body.orderId,
    productId: req.body.productId,
  };

  const item = await OrderItem.create(info);
  res.status(200).send(item);
  console.log(item.get({ plain: true }));

};

const getAllOrderItems = async (req, res) => {

  let items = await OrderItem.findAll({});
  res.status(200).send(items);
  items.forEach(i => console.log(i.get({ plain: true })));

};

const getOneOrderItem = async (req, res) => {

  let id = req.params.id;
  let item = await OrderItem.findOne({ where: { idOrderItem: id } });
  res.status(200).send(item);
  if (item) console.log(item.get({ plain: true }));

};

const updateOrderItem = async (req, res) => {

  let id = req.params.id;
  const item = await OrderItem.update(req.body, { where: { idOrderItem: id } });
  res.status(200).send(item);

};

const deleteOrderItem = async (req, res) => {

  let id = req.params.id;
  await OrderItem.destroy({ where: { idOrderItem: id } });
  res.status(200).send("OrderItem deleted successfully");

};

module.exports = {
  addOrderItem,
  getAllOrderItems,
  getOneOrderItem,
  updateOrderItem,
  deleteOrderItem
};
