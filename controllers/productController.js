const db = require("../models");

//create main model

const Product = db.product;

//main work

// create a product

const addProduct = async (req, res) => {

  let info = {
    name: req.body.name,
    price: req.body.price,
    idCategory: req.body.idCategory,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product.get({ plain: true }));
};

// get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({});
    res.status(200).send(products);
    products.forEach(p => console.log(p.get({ plain: true })));

}

//get single product by id

const getOneProduct = async (req, res) => {

    let id = req.params.id;
    let product = await Product.findOne({ where: { idProduct: id } });
    res.status(200).send(product);
    if (product) console.log(product.get({ plain: true }));

}

//update product 

const updateProduct = async (req, res) => {

    let id = req.params.id;
    const product = await Product.update(req.body, {where: { idProduct: id }});
    res.status(200).send(product);

}

//delete product

const deleteProduct = async (req, res) => {

    let id = req.params.id;
    await Product.destroy({ where: { idProduct: id } });
    res.status(200).send("Product deleted successfully");
}

const getProductsWithCategory = async (req, res) => {
  try {
    const products = await db.product.findAll({
      include: [{
        model: db.category,
        as: 'category'
      }]
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getProductsWithCategory
};
