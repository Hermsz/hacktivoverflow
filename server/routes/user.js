const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/weblogin', UserController.webLogin)

module.exports = router