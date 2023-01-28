const mongoose = require('mongoose')
const { connection } = require('mongoose')
const UserColl = connection.collection('local-user')

exports.SignUp = async (UserFilter) => {
    UserColl.insertOne(UserFilter)
}

exports.check_duplication_id = async (id) => {
    const check_id = await UserColl.findOne({ id: id })
    return check_id
}

exports.login = async (id) => {
    const login = await UserColl.findOne({ id: id })
    return login
}

exports.check_obj_id = async (id) => {
    id = mongoose.Types.ObjectId(`${id}`)
    const userdata = await UserColl.findOne({ _id: id })
    return userdata
}

exports.update_user = async (ObjId, UpdateQuery) => {
    ObjId = mongoose.Types.ObjectId(`${ObjId}`)
    UserColl.updateOne({ _id: ObjId }, { $set: UpdateQuery })
}

exports.delete_user = async (id) => {
    id = mongoose.Types.ObjectId(`${id}`)
    const delete_user = await UserColl.deleteOne({ _id: id })
}

exports.AllUserData = async () => {
    const userdata = UserColl.find({ flag: 'u' }).toArray()
    return userdata
}