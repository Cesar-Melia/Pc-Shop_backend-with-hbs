const User = require('../models/User.model');
const Product = require('../models/Product.model');
const Comment = require('../models/Comment.model');

const commentsGet = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const comments = await Comment.find({ product: productId })
      .populate('users')
      .populate('products');

    return res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
};

const createCommentPost = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const date = Date.now();

    const newComment = new Comment({
      product: productId,
      user: userId,
      text: text,
      date: date,
    });

    const createdComment = await newComment.save();

    await Product.findByIdAndUpdate(
      productId,
      {
        $addToSet: { comments: newComment },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { comments: newComment },
      },
      { new: true }
    );

    return res.status(200).json(createdComment);
  } catch (error) {
    return next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = '';

    const deleted = await Comment.findByIdAndDelete(id);

    console.log('Product: ', deleted.product);
    console.log('User: ', deleted.user);

    await Product.findByIdAndUpdate(
      deleted.product,
      {
        $pull: { comments: id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      deleted.user,
      {
        $pull: { comments: id },
      },
      { new: true }
    );

    if (deleted) response = 'Order deleted from db';
    else response = "Can't find an Order whit this id";

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = { commentsGet, createCommentPost, deleteComment };
