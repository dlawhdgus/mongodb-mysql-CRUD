const mongodb_callback = require('../../models/mongodb')
const mysql_callback = require('../../models/mysql')
const Crypto = require('../../modules/crypto')

exports.admin_user_update = async (req, res) => {
    const { id } = req.body
    const userdata = await mongodb_callback.check_duplication_id(id)
    res.render('admin_user_update', { data: userdata })
}

exports.admin_user_edit = async (req, res) => {
    const { id, nickname, email, original_id } = req.body
    const UpdateQuery = {}

    UpdateQuery.id = id
    UpdateQuery.name = nickname
    UpdateQuery.email = email

    const user_update = mongodb_callback.update_user_id(original_id, UpdateQuery)
    const userdata = await mongodb_callback.AllUserData()
    res.render('admin-user_list', { data: userdata })
}

exports.admin_user_list = async (req, res) => {
    const userdata = await mongodb_callback.AllUserData()
    res.render('admin-user_list', { data: userdata })
}

exports.admin_user_delete = async (req, res) => {
    const { original_id } = req.body
    const user_delete = await mongodb_callback.delete_user_id(original_id)
    const userdata = await mongodb_callback.AllUserData()
    res.render('admin-user_list', { data: userdata })
}