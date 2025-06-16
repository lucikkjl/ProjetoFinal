const db = require("../models");
const User = db.user
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET

//add user

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    console.log(user.get({ plain: true }));
    res.status(201).json({
      user: user.get({ plain: true })
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ error: error.message });
  }
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send("Invalid Credentials!");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid Credentials!");
    }

    const token = jwt.sign({ idUser: user.idUser }, process.env.JWT_SECRET, {
       expiresIn: '1h' }
    );

    res.json({token })

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//middleware to verify jwt token

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Acess Denied" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

//protected route to get user info

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ where: { idUser: req.user.idUser } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.get({ plain: true }));
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// get all users

const getAllUsers = async (req, res) => {

    let users = await User.findAll({});
    res.status(200).send(users);
    users.forEach(u => console.log(u.get({ plain: true })));

}

//get single user by id

const getOneUser = async (req, res) => {

    let id = req.params.id;
    let user = await User.findOne({ where: { idUser: id } });
    res.status(200).send(user);
    if (user) console.log(user.get({ plain: true }));

}

//update user

const updateUser = async (req, res) => {

    let id = req.params.id;
    const user = await User.update(req.body, {where: { idUser: id }});
    res.status(200).send(user);
}

//delete user

const deleteUser = async (req, res) => {

    let id = req.params.id;
    await User.destroy({ where: { idUser: id } });
    res.status(200).send("User deleted successfully");
}

// 1:N

const getUserOrders = async (req, res) => {

  try {
    const users = await db.user.findAll({
      include: [{
        model: db.order,
        as: 'orders'
      }]
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
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
    getUserOrders
}
