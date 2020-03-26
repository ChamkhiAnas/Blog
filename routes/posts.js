const express = require('express');
const PostController = require('./../controllers/PostController');
var multer = require('multer');



const {
    body
} = require('express-validator');




const router = express.Router();

router.get('', PostController.getAllPost);

chekData = [

    body('title').isLength({
        min: 5,
    }).withMessage("cette valeur ne respecte pas l'titlel !!"),

    body('description').isLength({
        min: 6,

    }).withMessage("cette valeur ne respecte pas icon !!"),


]

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/posts')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname) //Appending .jpg
    }
})

var upload = multer({
    dest: 'uploads/posts',
    storage: storage
});



router.post('', upload.single('urlImage'), chekData, PostController.storePost);
router.put('/:id', chekData, PostController.updatePost);
router.get('/:id', PostController.showOnePost);
router.patch('/:id', chekData, PostController.patchPost);
router.delete('/:id', PostController.deletePost);

module.exports = router;