const router = require('express').Router()
const controller = require('./controller')

router.post('/user_update', controller.admin_user_update)
router.post('/user_edit', controller.admin_user_edit)
router.get('/user_list', controller.admin_user_list)
router.post('/user_delete', controller.admin_user_delete)
router.get('/SHOW_ADMIN_DATA', controller.SHOW_ADMIN_DATA)


module.exports = router