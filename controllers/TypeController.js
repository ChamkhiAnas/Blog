const Type = require('./../models/type');

const {
    validationResult
} = require('express-validator');

exports.getAllTypes = (req, res) => {

    Type
        .findAll()
        .then((types) => {
            console.log(types)
            res.status(200).json({
                error: false,
                data: types
            })
        })
        .catch(err => res.status(404).json({
            error: true,
            message: 'posts not found!'
        }))

}

exports.storeType = (req, res) => {

    let {
        name,

    } = req.body;

    let error = validationResult(req)

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {
        console.log(Object.keys(error).length);

        Type.create({
                name: name,


            })
            .then((type) => res.status(201).json({
                error: false,
                data: type
            }))
            .catch((err) => res.status(400).json({
                error: true,
                message: 'Bad request !'
            }))

    }
}

exports.updateType = (req, res) => {
    console.log(req.body)
    let {
        name: name,

    } = req.body;

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {
        console.log(Object.keys(error).length);

        Type.update({
                name: name,

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




exports.showOneType = (req, res) => {

    Type.findByPk(req.params.id)
        .then(type => {
            res.status(200).json({
                error: false,
                data: type
            })
        })
        .catch(err => res.status(404).json({
            error: true,
            message: 'product not found !'
        }))
}


exports.deleteType = (req, res) => {

    let id = req.params.id;

    Type.destroy({
            where: {
                id: id
            }
        })
        .then(() => res.status(204).json({}))
        .catch((err) => res.status(403).json({
            error: true,
            message: 'impossible to delete this resource !'
        }))
}



exports.patchType = (req, res) => {

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {
        console.log(Object.keys(error).length);

        Type.update(req.body, {
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