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
router.post('/admin_user_update', controller.admin_user_update)
router.post('/admin_user_edit', controller.admin_user_edit)
router.get('/admin_user_list', controller.admin_user_list)
router.post('/admin_user_delete', controller.admin_user_delete)

module.exports = router