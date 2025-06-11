const db = require("../models");

//create main model

const Category = db.category;

//main work

// create a category

const addCategory = async (req, res) => {

  let info = {
    name: req.body.name,
  };

  const category = await Category.create(info);
  res.status(200).send(category);
  console.log(category.get({ plain: true }));

};

// get all categories

const getAllCategories = async (req, res) => {

    let categories = await Category.findAll({});
    res.status(200).send(categories);
    categories.forEach(c => console.log(c.get({ plain: true })));

}

//get single category by id

const getOneCategory = async (req, res) => {

    let id = req.params.id;
    let category = await Category.findOne({ where: { idCategory: id } });
    res.status(200).send(category);
    if (category) console.log(category.get({ plain: true }));

}

//update category

const updateCategory = async (req, res) => {

    let id = req.params.id;
    const category = await Category.update(req.body, {where: { idCategory: id }});
    res.status(200).send(category);

}

//delete category

const deleteCategory = async (req, res) => {

    let id = req.params.id;
    await Category.destroy({ where: { idCategory: id } });
    res.status(200).send("Category deleted successfully");
}

module.exports = {
    addCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory
};
