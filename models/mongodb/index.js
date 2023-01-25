const { connection } = require('mongoose')
const UserColl = connection.collection('local-user')

exports.SignUp = async (UserFilter) => {
    UserColl.insertOne(UserFilter)
}

exports.check_duplication_id = async (id) => {
    const check_id = await UserColl.findOne({ id : id })
    return check_id
}

exports.login = async (id) => {
    const login = await UserColl.findOne({ id : id})
    return login
}