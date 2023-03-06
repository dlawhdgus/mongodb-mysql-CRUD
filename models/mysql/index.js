const mysql = require('mysql2')
const config = require('../../config.json')
const table_name = 'local_user'
const now_date = Date()
const modules = require('../../modules/array')


const connection = mysql.createConnection(config.mysql)

exports.insert_user = (id, password, name, email) => {
    try {
        const sql = `INSERT INTO ${table_name} (id,password,name,email,insert_date,update_date,flag) VALUES ("${id}", "${password}", "${name}", "${email}", "${now_date}", "${now_date}", 'u');`

        connection.query(sql, (e, r) => {
            if (e) throw e
        })
    } catch (e) {
        if (e) throw e
    }
}

exports.CHECK_DUPLICATE_ID = async (id) => {
    try {
        const sql = `SELECT id FROM ${table_name} WHERE id = "${id}";`
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, (e, r) => {
                if (e) reject(e)
                else resolve(r)
            })
        })
        return result
    } catch (e) {

    }
}

exports.GET_USER_DATA = async (id) => {
    try {
        const sql = `SELECT id,name,email,flag FROM ${table_name} WHERE id = "${id}"`
        const result = await new Promise((resolve,reject) => {
            connection.query(sql, (e,r) => {
                if(e) reject(e)
                else resolve(r)
            })
        })
        return result
    } catch (e) {

    }
}