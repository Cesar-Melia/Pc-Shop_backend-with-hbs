const express = require('express');
const {
  commentsGet,
  createCommentPost,
  deleteComment,
} = require('../controllers/comments.controller');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/:productId', commentsGet);

router.post('/create/:productId', createCommentPost);

router.delete('/delete/:id', isAdmin, deleteComment);

module.exports = router;
