const express = require('express');
const UserController = require('./../controllers/UserController');
const {
    body
} = require('express-validator');

const router = express.Router();

router.get('', UserController.getAllUsers);

checkData = [
    // username must be an email
    body('email').isEmail().withMessage("cette valeur ne respecte pas l'email !!"),
    // password must be at least 5 chars long
    body('password').isLength({
        min: 6,

    }),
    body('name').isLength({
        min: 2
    })
]

router.post('', checkData, UserController.storeUser);
router.put('/:id', checkData, UserController.updateUser);
router.get('/:id', UserController.showOneUser)
router.patch('/:id', checkData, UserController.patchUser)

module.exports = router;