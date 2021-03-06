const Category = require('./../models/category');
const {
    validationResult
} = require('express-validator');


exports.getAllCategories = (req, res) => {


    Category
        .findAll()
        .then((categories) => {

            res.status(200).json({
                error: false,
                data: categories
            })
        })
        .catch(err => res.status(404).json({
            error: true,
            message: 'categories not found !'
        }))


}

exports.storeCategory = (req, res) => {

    let {
        title,
        icon,
        active
    } = req.body;


    let error = validationResult(req)

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {
        console.log(Object.keys(error).length);

        Category.create({
                title: title,
                icon: icon,
                active: active
            })
            .then((category) => res.status(201).json({
                error: false,
                data: category
            }))
            .catch((err) => res.status(400).json({
                error: true,
                message: 'Please check the data for category'
            }))
    }

}

exports.updateCategory = (req, res) => {

    // console.log(req.body)
    let {
        title,
        icon,
        active
    } = req.body;

    let error = validationResult(req)

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {
        console.log(Object.keys(error).length);

        Category.update({
                title: title,
                icon: icon,
                active: (active == 'on') ? 1 : 0
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => res.status(202).json({
                error: false,
                data: result
            }))
            .catch((err) => res.status(400).json({
                error: true,
                message: "bad request !"
            }))
    }
}

exports.showOneCategory = async (req, res) => {

    try {
        let category = await Category.findByPk(req.params.id);
        return res.status(200).json({
            error: false,
            data: category
        })
    } catch (error) {
        return res.status(404).json({
            error: true,
            message: 'category not found'
        })
    }


}

exports.deleteCategory = (req, res) => {
    return res.send('suppression')
}

exports.patchCategory = (req, res) => {

    let error = validationResult(req)

    if (error.errors.length) {
        res.status(400).json({
            error: true,
            error: error
        })
    } else {

        console.log(Object.keys(error).length);

        Category.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).json({
                error: false,
                data: result
            })
        }).catch((error) => {
            res.status(400).json({
                error: true,
                message: "Bad request"
            })
        })
    }
}