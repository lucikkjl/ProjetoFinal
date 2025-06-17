const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const userData = user.get({ plain: true });
    delete userData.password;
    console.log(userData);
    res.status(201).json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send("Invalid Credentials!");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(400).send("Invalid Credentials!");

    const token = jwt.sign({ idUser: user.idUser }, secret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(401).json({ message: "Invalid Token" });
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { idUser: req.user.idUser },
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(users);
    users.forEach((u) => console.log(u.get({ plain: true })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOne({
      where: { idUser: id },
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(user);
    if (user) console.log(user.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    if (req.body.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
    }
    const [updatedRowsCount] = await User.update(req.body, {
      where: { idUser: id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findOne({
      where: { idUser: id },
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    await User.destroy({ where: { idUser: id } });
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const users = await db.user.findAll({
      include: [{ model: db.order, as: "orders" }],
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  loginUser,
  verifyToken,
  getUserInfo,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getUserOrders,
};
