const router = require('express').Router()
const userController = require('../controllers/user.controller.js')
const verify = require('../utils/verifyToken.js')

router.put("/:id", verify.verifyUser, userController.updateUser);

router.delete("/:id", verify.verifyUser, userController.deleteUser);
router.get("/:id", verify.verifyUser, userController.getUser);

router.get("/", verify.verifyAdmin, userController.getUsers);

module.exports = router