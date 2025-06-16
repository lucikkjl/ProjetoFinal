const db = require("../models");

const Product = db.product;

const addProduct = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      price: req.body.price,
      idCategory: req.body.idCategory,
    };

    const product = await Product.create(info);
    res.status(201).send(product);
    console.log(product.get({ plain: true }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.findAll({});
    res.status(200).send(products);
    products.forEach((p) => console.log(p.get({ plain: true })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findOne({ where: { idProduct: id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.update(req.body, {
      where: { idProduct: id },
    });
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    await Product.destroy({ where: { idProduct: id } });
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getProductsWithCategory = async (req, res) => {
  try {
    const products = await db.product.findAll({
      include: [
        {
          model: db.category,
          as: "category",
        },
      ],
    });
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductsWithCategory,
};
