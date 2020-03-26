const express = require('express');
const TypeController = require('./../controllers/TypeController');

const {
    body
} = require('express-validator');

const router = express.Router();

router.get('', TypeController.getAllTypes);

checkData = [
    body('name').isLength({
        min: 5,
    }).withMessage("min cara is 5 ...!!!")
]
router.post('', checkData, TypeController.storeType);
router.put('/:id', checkData, TypeController.updateType);
router.get('/:id', TypeController.showOneType);
router.delete('/:id', TypeController.deleteType);
router.patch('/:id', checkData, TypeController.patchType)

module.exports = router;