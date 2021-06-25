const Product = require('../models/Product.model');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');

const productsGet = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).render('products', { user: req.user, products, isAdmin: req.isAdmin });
  } catch (error) {
    return next(error);
  }
};

const shopGet = async (req, res, next) => {
  try {
    const products = await Product.find();

    let user;
    req.user ? (user = req.user._id) : (user = 'guest');

    return res.status(200).render('shop', {
      user: req.user,
      products,
      isAdmin: req.isAdmin,
    });
  } catch (error) {
    return next(error);
  }
};

const createGet = (req, res, next) => {
  return res.render('create-product', { user: req.user, isAdmin: req.isAdmin });
};

const createPost = async (req, res, next) => {
  try {
    const { name, price, description, type, processor, memory, gpu, ssd, hdd, stars, stock } =
      req.body;

    const image = req.fileUrl ? req.fileUrl : '';

    const newProduct = new Product({
      name,
      price,
      description,
      type,
      processor,
      memory,
      gpu,
      ssd,
      hdd,
      stars,
      image,
      stock,
    });

    const createProduct = await newProduct.save();

    return res.status(201).json(createProduct);
  } catch (error) {
    return next(error);
  }
};

const editGet = (req, res, next) => {
  return res.render('edit-product', { user: req.user, isAdmin: req.isAdmin });
};

const editPut = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const { id } = req.params;
    const {
      name,
      price,
      description,
      type,
      processor,
      memory,
      gpu,
      ssd,
      hdd,
      stars,
      comments,
      stock,
    } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (price) fieldsToUpdate.price = Number(price);
    if (description) fieldsToUpdate.description = description;
    if (type) fieldsToUpdate.type = type;
    if (processor) fieldsToUpdate.processor = processor;
    if (memory) fieldsToUpdate.memory = memory;
    if (gpu) fieldsToUpdate.gpu = gpu;
    if (ssd) fieldsToUpdate.ssd = ssd;
    if (hdd) fieldsToUpdate.hdd = hdd;
    if (stars) fieldsToUpdate.stars = Number(stars);
    if (req.fileUrl) fieldsToUpdate.image = req.fileUrl;
    if (comments) fieldsToUpdate.comments = comments;
    if (stock) fieldsToUpdate.stock = stock;

    console.log('fields to update: ', fieldsToUpdate);

    const updatedProduct = await Product.findByIdAndUpdate(id, fieldsToUpdate, { new: true });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteGet = (req, res, next) => {
  return res.render('delete-product', { user: req.user, isAdmin: req.isAdmin });
};

const deleteProduct = async (req, res, next) => {
  try {
    const { _id } = req.params;
    let response = '';

    const deleted = await Product.findByIdAndDelete(_id);

    if (deleted) response = 'Product deleted from db';
    else response = "Can't find a product whit this id";

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const productIdGet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    console.log('Entra en products/id');

    // return res.status(200).render("product", { user: req.user, product, isAdmin: req.isAdmin });

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  productsGet,
  shopGet,
  createGet,
  createPost,
  editPut,
  editGet,
  deleteGet,
  deleteProduct,
  productIdGet,
};
