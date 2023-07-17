const mongodb_callback = require('../../models/mongodb')
const mysql_callback = require('../../models/mysql')
const Crypto = require('../../modules/crypto')

exports.admin_user_update = async (req, res) => {
    const { _id } = req.body
    const user_data = await mysql_callback.GET_USER_DATA_ID(_id)
    const userdata = Object(user_data[0])
    res.render('admin_user_update', { data: userdata })
}

exports.admin_user_edit = async (req, res) => {
    const { id, nickname, email, _id } = req.body
    const update_userdata = await mysql_callback.UPDATE_USER(id, nickname, email, _id)
    const user_data = await mysql_callback.GET_ALL_USERDATA()
    res.render('admin-user_list', { data: user_data })
}

exports.admin_user_list = async (req, res) => {
    const userdata = await mysql_callback.GET_ALL_USERDATA()
    res.render('admin-user_list', { data: userdata })
}

exports.admin_user_delete = async (req, res) => {
    const { _id } = req.body
    const user_delete = await mysql_callback.DELETE_USER(_id)
    const userdata = await mysql_callback.GET_ALL_USERDATA()
    res.render('admin-user_list', { data: userdata })
}

exports.SHOW_ADMIN_DATA = async (req, res) => {
    const { user_data } = req.session
    const userdata = await mysql_callback.GET_USER_DATA_ID(user_data)
    const detail_userdata = Object(userdata[0])
    if (detail_userdata) {
        if (detail_userdata.flag === 'a') {
            res.render('sign-in', { data: detail_userdata })
        } else {
            res.write("<script>alert('관리자 계정을 이용해주세요');history.back();</script>", "utf8")
        }
    } else {
        res.write("<script>alert('로그인 후 이용해주세요');history.back();</script>", "utf8")
    }
}