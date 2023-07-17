const mysql = require('mysql2')
const config = require('../../config.json')
const table_name = 'local_user'
const now_date = Date()
const db = require('../../dbs/mysql-connect')

exports.insert_user = (id, password, name, email) => {
    try {
        const sql = `INSERT INTO ${table_name} (id,password,name,email,insert_date,update_date,flag) VALUES ("${id}", "${password}", "${name}", "${email}", "${now_date}", "${now_date}", 'u');`
        db.query(sql, (e, r) => {
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
            db.query(sql, (e, r) => {
                if (e) reject(e)
                else resolve(r)
            })
        })
        return result
    } catch (e) {
        if (e) throw e
    }
}

exports.GET_USER_DATA = async (id) => {
    try {
        const sql = `SELECT _id, id, name, email, flag, insert_date, update_date FROM ${table_name} WHERE id = "${id}";`
        const result = await new Promise((resolve, reject) => {
            db.query(sql, (e, r) => {
                if (e) reject(e)
                else resolve(r)
            })
        })
        return result
    } catch (e) {
        if (e) throw e
    }
}

exports.GET_USER_DATA_ID = async (_id) => {
    try {
        const sql = `SELECT _id, id, name, email, flag, insert_date, update_date FROM ${table_name} WHERE _id = "${_id}";`
        const result = await new Promise((resolve, reject) => {
            db.query(sql, (e, r) => {
                if (e) reject(e)
                else resolve(r)
            })
        })
        return result
    } catch (e) {
        if (e) throw e
    }
}

exports.GET_USER_DETAIL_DATA = async (id) => {
    try {
        const sql = `SELECT _id, id, password, name, email, flag, insert_date, update_date FROM ${table_name} WHERE id="${id}";`
        const result = new Promise((resolve, reject) => {
            db.query(sql, (e, r) => {
                if (e) reject(e)
                else resolve(r)
            })
        })
        return result
    } catch (e) {
        if (e) throw e
    }
}

exports.GET_ALL_USERDATA = async () => {
    try {
        const sql = `SELECT _id, id, name, email, insert_date, update_date FROM ${table_name} WHERE flag = 'u';`
        const result = await new Promise((resolve, reject) => {
            db.query(sql, (e, r) => {
                if (e) reject(e)
                else resolve(r)
            })
        })
        return result
    } catch (e) {
        if (e) throw e
    }
}

exports.UPDATE_USER = async (id, name, email, _id) => {
    try {
        const sql = `UPDATE ${table_name} SET id="${id}", name="${name}", email="${email}", update_date="${now_date}" WHERE _id="${_id}";`
        db.query(sql, (e, r) => {
            if (e) throw e
        })
    } catch (e) {
        if (e) throw e
    }
}

exports.DELETE_USER = async (_id) => {
    try {
        const sql = `DELETE FROM ${table_name} WHERE _id = "${_id}"`
        db.query(sql, (e, r) => {
            if (e) throw e
        })
    } catch (e) {
        if (e) throw e
    }
}