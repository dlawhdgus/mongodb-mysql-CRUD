const mysql = require('../../dbs/mysql-connect')
const table_name = 'local_user'
const now_date = Date()

exports.find_user_id = async (id) => {
    const sql = `SELECT * FROM ${table_name} WHERE id = '${id}'`
    const userdata = await mysql.con.query(sql).sql
}

exports.Insert_user = async (id, password, name, email, flag) => {
    const sql = `INSERT INTO ${table_name} (id, password, name, email, flag, insert_date, update_date) VALUES ('${id}', '${password}', '${name}', '${email}', '${flag}' ,'${now_date}', '${now_date}')`
    mysql.con.query(sql, (e, result) => { if (e) throw e })
}