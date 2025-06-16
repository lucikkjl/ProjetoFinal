const db = require("../models");

//create main model

const Category = db.category;

//main work

// create a category

const addCategory = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
    };

    const category = await Category.create(info);
    res.status(201).send(category); // 201 para criação
    console.log(category.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// get all categories

const getAllCategories = async (req, res) => {
  try {
    let categories = await Category.findAll({});
    res.status(200).send(categories);
    categories.forEach((c) => console.log(c.get({ plain: true })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//get single category by id

const getOneCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findOne({ where: { idCategory: id } });

    if (!category) {
      return res.status(404).send({ message: "Categoria não encontrada" });
    }

    res.status(200).send(category);
    console.log(category.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//update category

const updateCategory = async (req, res) => {
  try {
    let id = req.params.id;
    const [updated] = await Category.update(req.body, {
      where: { idCategory: id },
    });

    if (updated) {
      res.status(200).send({ message: "Categoria atualizada com sucesso" });
    } else {
      res.status(404).send({ message: "Categoria não encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//delete category

const deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    const deleted = await Category.destroy({ where: { idCategory: id } });

    if (deleted) {
      res.status(200).send({ message: "Categoria deletada com sucesso" });
    } else {
      res.status(404).send({ message: "Categoria não encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await db.category.findAll({
      include: [
        {
          model: db.product,
          as: 'products',
        },
      ],
    });

    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    addCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
    getCategoriesWithProducts
};
