const express = require('express');
const CommentController = require('./../controllers/CommentController');

const {
    body
} = require('express-validator');

const router = express.Router();

router.get('', CommentController.getAllComments);

checkData = [
    body('commentaire').isLength({
        min: 5,
    }).withMessage("comment not found !!! ")
]
router.post('', checkData, CommentController.storeComment);
router.put('/:id', checkData, CommentController.updateComment);
router.get('/:id', CommentController.showOneComment)
router.delete('/:id', CommentController.deleteComment)
router.patch('/:id', checkData, CommentController.patchComment)

module.exports = router;