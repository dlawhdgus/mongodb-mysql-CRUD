const mongodb_callback = require('../models/mongodb')
const mysql_callback = require('../models/mysql')
const session = require('express-session')
const crypto = require('../modules/crypto')

exports.index = (req,res) => {
    res.render('index')
}

exports.sign_up = (req,res) => {
    res.render('sign-up')
}

exports.sign_up_logic = async (req,res) => {
    const { id, pw, name, email } = req.body
    
    const id_regex = /^[a-z|A-Z]+$/
    const pw_regex = /^[a-z|A-Z|0-9]+$/
    const email_regex = /^[a-z0-9]+@[a-z]+\.[a-z]+$/
    const UserFilter = {}
    
    const check_id = await mongodb_callback.check_duplication_id(id)

    if(check_id) {
        res.write("<script>alert('id is duplicate');history.back();</script>")
    } else {
        if(id_regex.test(id) && pw_regex.test(pw) && email_regex.test(email)) {

            UserFilter.id = id
            UserFilter.pw = crypto.encodig(pw)
            UserFilter.name = name
            UserFilter.email = email
    
            const SignUpUser = await mongodb_callback.SignUp(UserFilter)
        } else {
            if(id_regex.test(id)) {
                if(pw_regex.test(pw)) {
                    if(email_regex.test(email)) {
                        UserFilter.id = id
                        UserFilter.pw = crypto.encodig(pw)
                        UserFilter.name = name
                        UserFilter.email = email
    
                        const SignUpUser = await mongodb_callback.SignUp(UserFilter)
                        res.redirect('sign-in')
                    } else {
                        res.write("<script>alert('check the email format');history.back();</script>")
                    }
                } else {
                    res.write(`
                    <script>
                        alert('password format is English,Number');
                        history.back();
                    </script>`)
                }
            } else {
                res.write("<script>alert('id format is only English');history.back();</script>")
            }
        }
    }

}

exports.sign_in = (req,res) => {
    res.render('sign-in')
}