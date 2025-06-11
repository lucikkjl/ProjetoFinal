const db = require("../models");

//create main model

const User = db.user;

//main work

// create a user

const addUser = async (req, res) => {

  let info = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(info);
  res.status(200).send(user);
  console.log(user.get({ plain: true }));

};

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

module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
};
