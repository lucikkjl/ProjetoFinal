const db = require("../models");

//create main model

const Order = db.orders;

//main work

// create a order

const addOrder = async (req, res) => {

  let info = {
    userId: req.body.userId,
  };

  const order = await Order.create(info);
  res.status(200).send(order);
  console.log(order);

};

// get all orders

const getAllOrders = async (req, res) => {

    let orders = await Order.findAll({});
    res.status(200).send(orders);
}

//get single order by id

const getOneOrder = async (req, res) => {

    let id = req.params.id;
    let order = await Order.findOne({ where: { id: id } });
    res.status(200).send(order);
}

//update order 

const updateOrder = async (req, res) => {

    let id = req.params.id;
    const order = await Order.update(req.body, {where: { id: id }});
    res.status(200).send(order);
}

//delete order

const deleteOrder = async (req, res) => {

    let id = req.params.id;
    await Order.destroy({ where: { idOrder: id } });
    res.status(200).send("Order deleted successfully");
}

module.exports = {
    addOrder,
    getAllOrders,
    getOneOrder,
    updateOrder,
    deleteOrder
};