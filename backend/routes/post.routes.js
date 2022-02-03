const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth-middleware');
const multer = require('../middleware/multer-config');

router.get('/', auth, postCtrl.listAllPost);
router.get('/:post_id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:post_id', auth, postCtrl.updatePost);
router.delete('/:post_id', auth, postCtrl.deletePost);
router.post('/:post_id/like', auth, postCtrl.postLike);

module.exports = router;