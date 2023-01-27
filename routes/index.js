const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.index)
/////////회원가입/////////
router.get('/sign-up', controller.sign_up)
router.post('/sign-up', controller.sign_up_logic)
/////////로그인/////////
router.get('/sign-in', controller.sign_in)
router.post('/index_sign-in', controller.index_sign_in)
/////////로그아웃/////////
router.post('/logout', controller.logout)
/////////////수정////////////
router.get('/update', controller.update)
router.post('/update-logic', controller.update_logic)

module.exports = router