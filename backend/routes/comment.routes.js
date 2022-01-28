const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middleware/auth-middleware');

router.get('/post/:post_id', auth, commentCtrl.listAllComment);
router.post('/post/:post_id', auth, commentCtrl.createComment);
router.put('/:comment_id', auth, commentCtrl.updateComment);
router.delete('/:comment_id', auth, commentCtrl.deleteComment);


module.exports = router;