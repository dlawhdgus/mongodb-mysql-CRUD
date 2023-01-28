const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.index)
router.get('/sign-up', controller.sign_up)
router.post('/sign-up', controller.sign_up_logic)
router.get('/sign-in', controller.sign_in)
router.post('/index_sign-in', controller.index_sign_in)
router.post('/logout', controller.logout)
router.get('/update', controller.update)
router.post('/update-logic', controller.update_logic)
router.post('/delete-logic', controller.delete_logic)

module.exports = router