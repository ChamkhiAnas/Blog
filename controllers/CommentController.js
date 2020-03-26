const Comment = require('./../models/comment');
const User = require('./../models/user');
const Post = require('./../models/post');



const {
    validationResult
} = require('express-validator');

exports.getAllComments = (req, res) => {
    Comment
        .findAll({
            include: [{
                model: User
            }, {
                model: Post
            }]
        })
        .then((comments) => {

            res.status(200).json({
                error: false,
                data: comments
            })
        })
        .catch(err => res.status(404).json({
            error: true,
            message: "comments not found"
        }))
}

exports.storeComment = (req, res) => {

    let {
        commentaire,
        userId,
        postId
    } = req.body;

    let error = validationResult(req)

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {
        console.log(Object.keys(error).length);

        Comment.create({
                commentaire: commentaire,
                userId: userId,
                postId: postId

            })
            .then((comment) => {
                res.status(201).json({
                    error: false,
                    data: comments
                })
            })
            .catch((err) => res.status(400).json({
                erro: true,
                message: 'comment not found walo !!'
            }))

    }
}

exports.updateComment = (req, res) => {
    console.log(req.body)
    let {
        commentaire
    } = req.body;
    let error = validationResult(req)

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {
        console.log(Object.keys(error).length);

        Comment.update({
                commentaire: commentaire,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                res.status(202).json({
                    error: false,
                    data: result
                })
            })
            .catch((err) => {
                res.status(400).json({
                    error: true,
                    message: "bad request !"
                })
            })
    }
}

exports.showOneComment = async(req, res) => {
    try {
        let comment = await Comment.findByPk(req.params.id);
        return res.status(200).json({
            error: false,
            data: comment
        })
    } catch (error) {
        return res.status(404).json({
            error: true,
            message: 'comment not found'
        })
    }

}

exports.deleteComment = (req, res) => {
    return res.send('suppression')
}


exports.patchComment = (req, res) => {

    let error = validationResult(req)

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {
        console.log(Object.keys(error).length);


        Comment.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                res.status(200).json({
                    error: false,
                    data: result
                })
            })
            .catch((error) => {
                res.status(400).json({
                    error: true,
                    message: "Bad request"
                })
            })
    }
}