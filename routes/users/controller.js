const mongodb_callback = require('../../models/mongodb')
const mysql_callback = require('../../models/mysql')
const crypto = require('../../modules/crypto')
const CheckArr = require('../../modules/array')

exports.index = (req, res) => {
    res.render('index')
}

exports.sign_up = (req, res) => {
    res.render('sign-up')
}

exports.sign_up_logic = async (req, res) => {
    const { id, pw, name, email } = req.body

    const id_regex = /^[a-z|A-Z]+$/
    const pw_regex = /^[a-z|A-Z|0-9]+$/
    const email_regex = /^[a-z0-9]+@[a-z]+\.[a-z]+$/

    if (id_regex.test(id)) {
        if (pw_regex.test(pw)) {
            if (email_regex.test(email)) {
                const r = await mysql_callback.CHECK_DUPLICATE_ID(id)
                if(CheckArr.idEmptyArray(r)) {
                    mysql_callback.insert_user(id, crypto.encodig(pw), name, email)
                    const user_data = await mysql_callback.GET_USER_DATA(id)
                    req.session.user_data = user_data
                    const userdata = Object(user_data[0])
                    console.log(userdata)
                    res.render('sign-in', { data: userdata })
                } else {
                    res.write("<script>alert('아이디가 중복되었습니다'); history.back();</script>", "utf8")    
                }
            } else {
                res.write("<script>alert('이메일 형식에 맞지 않습니다'); history.back();</script>", "utf8")
            }
        } else {
            res.write("<script>alert('비밀번호는 영문,숫자만 가능합니다'); history.back();</script>", "utf8")
        }
    } else {
        res.write("<script>alert('아이디가 영문만 가능합니다'); history.back();</script>", "utf8")
    }



    // const check_id_mysql = mysql_callback.find_user_id(id)
    // if (CheckArr.idEmptyArray(check_id_mysql)) {
    //     res.write("<script>alert('아이디가 중복되었습니다');history.back();</script>", "utf8")
    // } else {
    //     if (id_regex.test(id) && pw_regex.test(pw) && email_regex.test(email)) {

    //         const Insert_user = mysql_callback.Insert_user(id,crypto.encodig(pw),name,email,'u')
    //         mysql_callback.find_user_id(id, (e,r) => {
    //             if(e) console.log(e)
    //             else console.log(r)
    //         })
    //         // console.log(user_data)
    //         // req.session.user_data = 
    //         // res.render('sign-in', { data: user_data })

    //     } else {
    //         if (id_regex.test(id)) {
    //             if (pw_regex.test(pw)) {
    //                 if (email_regex.test(email)) {
    //                     UserFilter.id = id
    //                     UserFilter.pw = crypto.encodig(pw)
    //                     UserFilter.name = name
    //                     UserFilter.email = email

    //                     const SignUpUser = await mongodb_callback.Insert_user(UserFilter)
    //                     const user_data = await mongodb_callback.check_duplication_id(id)

    //                     req.session.userdata = user_data._id

    //                     res.redirect('sign-in', { data: user_data })

    //                 } else {
    //                     res.write("<script>alert('이메일 형식에 맞춰주세요');history.back();</script>", "utf8")
    //                 }
    //             } else {
    //                 res.write(`
    //                 <script>
    //                     alert('비밀번호는 영문,숫자만 가능합니다');
    //                     history.back();
    //                 </script>`, "utf8")
    //             }
    //         } else {
    //             res.write("<script>alert('아이디는 영문만 가능합니다');history.back();</script>", "utf8")
    //         }
    //     }
    // }

}

exports.sign_in = async (req, res) => {
    const { user_data } = req.session
    if (!user_data) {
        res.write("<script>alert('로그인 후 이용해주세요');history.back();</script>", "utf8")
    } else {
        const userdata = await mongodb_callback.check_obj_id(user_data)
        if (userdata.flag === 'u') {
            res.render('sign-in', { data: userdata })
        } else {
            const userdata = await mongodb_callback.AllUserData()
            res.render('admin-user_list', { data: userdata })
        }
    }
}

exports.index_sign_in = async (req, res) => {
    const { id, pw } = req.body
    const userdata = await mongodb_callback.check_duplication_id(id)
    if (userdata) {
        user_id = String(userdata._id).split('"')[0]

        if (pw === crypto.decoding(userdata.pw)) {
            req.session.user_data = user_id
            const userdata = await mongodb_callback.check_obj_id(user_id)

            if (userdata.flag === 'u') {
                res.render('sign-in', { data: userdata })
            } else {
                const userdata = await mongodb_callback.AllUserData()
                res.render('admin-user_list', { data: userdata })
            }

        } else {
            res.write("<script>alert('잘못된 비밀번호');history.back();</script>", "utf8")
        }

    } else {
        res.write("<script>alert('잘못된 아이디');history.back();</script>", "utf8")
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => { })
    res.redirect('/users/login')
}

///////////edit////////

exports.update = async (req, res) => {
    const { user_data } = req.session
    const userdata = await mongodb_callback.check_obj_id(user_data)
    res.render('update_sign-in', { data: userdata })
}

exports.update_logic = async (req, res) => {
    const { id, nickname, email } = req.body
    const { user_data } = req.session
    const UpdateQuery = {}
    if (!id || !nickname || !email) {
        res.write("<script>alert('빈칸을 입력해주세요');history.back();</script>", "utf8")
    } else {
        UpdateQuery.id = id
        UpdateQuery.name = nickname
        UpdateQuery.email = email
        const user_update = await mongodb_callback.update_user(user_data, UpdateQuery)
        const userdata = await mongodb_callback.check_obj_id(user_data)
        res.render('sign-in', { data: userdata })
    }
}


exports.delete_logic = async (req, res) => {
    const { user_data } = req.session
    const delete_user = await mongodb_callback.delete_user(user_data)
    res.render('index')
}