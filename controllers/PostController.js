const Post = require('./../models/post');
const Category = require('./../models/category');
const User = require('./../models/user');
const Tag = require('./../models/tag');
const Comment = require('./../models/comment');
const {
    validationResult
} = require('express-validator');

// var multer = require('multer');
// var upload = multer({
//     dest: 'uploads/'
// });



exports.getAllPost = (req, res) => {



    Post.findAll({
            include: [{
                model: User
            }, {
                model: Category
            }, {
                model: Comment,
                include: [{
                    model: User
                }]
            }, {
                model: Tag
            }]
        })
        .then((post) => {
            console.log(post)
            res.status(200).json({
                error: false,
                data: post,
            })
        })
        .catch(err => res.status(404).json({
            error: true,
            message: 'post not found!'
        }))

}

exports.storePost = (req, res) => {


    // let postId;
    // let tagId;

    // console.log(req.file)
    // return;

    let {
        title,
        description,
        urlImage,
        categoryId,
        tagName,
        userId,
    } = req.body;
    let error = validationResult(req)

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {

        Post.create({
                title: title,
                description: description,
                urlImage: req.file.originalname,
                categoryId: categoryId,
                userId: userId
            })
            .then(async (post) => {

                res.status(201).json({
                    error: false,
                    data: post
                })

                myTags = [];

                for (let i = 0; i < tagName.length; i++) {

                    tag = await Tag.create({
                        name: tagName[i],
                    });

                    myTags = [...myTags, tag]

                }

                result = await post.addTags(myTags);

                console.log(result);

            })
    }

}

exports.updatePost = (req, res) => {
    return res.send('modification totale')
}

exports.showOnePost = (req, res) => {

    Post.findByPk(req.params.id)
        .then(post => {
            res.status(200).json({
                error: false,
                data: post
            })
        })
        .catch(err => res.status(404).json({
            error: true,
            message: 'Post not found !'
        }))
}

exports.deletePost = (req, res) => {

    let id = req.params.id;

    Post.destroy({
            where: {
                id: id
            }
        })
        .then(() => res.status(204).json({}))
        .catch((err) => res.status(403).json({
            error: true,
            message: ' delete  Post !'
        }))
}



exports.patchPost = (req, res) => {
    return res.send('modification Post')
}