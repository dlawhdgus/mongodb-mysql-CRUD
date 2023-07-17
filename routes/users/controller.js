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

<<<<<<< HEAD
    const check_id = await mongodb_callback.check_duplication_id(id)

    if (check_id) {
        res.write("<script>alert('아이디가 중복되었습니다');location.href = `https://jh.jp.ngrok.io/users/sign-up`;</script>", "utf8") //location 다른 페이지
    } else {
        if (id_regex.test(id) && pw_regex.test(pw) && email_regex.test(email)) {

            UserFilter.id = id
            UserFilter.pw = crypto.encodig(pw)
            UserFilter.name = name
            UserFilter.email = email
            UserFilter.flag = 'u'

            const SignUpUser = await mongodb_callback.Insert_user(UserFilter)
            const user_data = await mongodb_callback.check_duplication_id(id)
            req.session.user_data = String(user_data._id).split('"')[0]
            res.render('sign-in', { data: user_data })

        } else {
            if (id_regex.test(id)) {
                if (pw_regex.test(pw)) {
                    if (email_regex.test(email)) {
                        UserFilter.id = id
                        UserFilter.pw = crypto.encodig(pw)
                        UserFilter.name = name
                        UserFilter.email = email

                        const SignUpUser = await mongodb_callback.Insert_user(UserFilter)
                        const user_data = await mongodb_callback.check_duplication_id(id)

                        req.session.userdata = user_data._id

                        res.redirect('sign-in', { data: user_data })

                    } else {
                        res.write("<script>alert('이메일 형식에 맞춰주세요');location.href = `https://jh.jp.ngrok.io/users/sign-up`;</script>", "utf8")
                    }
                } else {
                    res.write(`
                    <script>
                        alert('비밀번호는 영문,숫자만 가능합니다');
                        location.href = "https://jh.jp.ngrok.io/users/sign-up";
                    </script>`, "utf8")
                }
            } else {
                res.write("<script>alert('아이디는 영문만 가능합니다');location.href = `https://jh.jp.ngrok.io/users/sign-up`;</script>", "utf8")
=======
    if (id_regex.test(id)) {
        if (pw_regex.test(pw)) {
            if (email_regex.test(email)) {
                const r = await mysql_callback.CHECK_DUPLICATE_ID(id)
                if (CheckArr.idEmptyArray(r)) {
                    mysql_callback.insert_user(id, crypto.encodig(pw), name, email)
                    const user_data = await mysql_callback.GET_USER_DATA(id)
                    const userdata = Object(user_data[0])
                    req.session.user_data = userdata._id
                    res.render('sign-in', { data: userdata })
                } else {
                    res.write("<script>alert('아이디가 중복되었습니다'); history.back();</script>", "utf8")
                }
            } else {
                res.write("<script>alert('이메일 형식에 맞지 않습니다'); history.back();</script>", "utf8")
>>>>>>> mysql-version
            }
        } else {
            res.write("<script>alert('비밀번호는 영문,숫자만 가능합니다'); history.back();</script>", "utf8")
        }
    } else {
        res.write("<script>alert('아이디가 영문만 가능합니다'); history.back();</script>", "utf8")
    }
}

exports.sign_in = async (req, res) => {
    const { user_data } = req.session
<<<<<<< HEAD
    if (!user_data) {
        res.write("<script>alert('로그인 후 이용해주세요');location.href = `https://jh.jp.ngrok.io/users/login`;</script>", "utf8")
    } else {
        const userdata = await mongodb_callback.check_obj_id(user_data)
        if (userdata.flag === 'u') {
            res.render('sign-in', { data: userdata })
=======
    const userdata = await mysql_callback.GET_USER_DATA_ID(user_data)
    if (userdata[0]) {
        if (userdata[0].flag === 'u') {

            res.render('sign-in', { data: userdata[0] })
>>>>>>> mysql-version
        } else {
            const ALL_USERDATAS = await mysql_callback.GET_ALL_USERDATA()
            res.render('admin-user_list', { data: ALL_USERDATAS })
        }
    } else {
        res.write("<script>alert('로그인 후 이용해주세요');history.back();</script>", "utf8")
    }
}

exports.index_sign_in = async (req, res) => {
    const { id, pw } = req.body
    const user_data = await mysql_callback.GET_USER_DETAIL_DATA(id)
    const userdata = Object(user_data[0])
    if (userdata) {
        if (pw === crypto.decoding(userdata.password)) {
            const user_data = await mysql_callback.GET_USER_DATA(id)
            const userdata = Object(user_data[0])
            req.session.user_data = userdata._id
            if (userdata.flag === 'u') {
                res.render('sign-in', { data: userdata })
            } else {
                const all_user_data = await mysql_callback.GET_ALL_USERDATA()
                res.render('admin-user_list', { data: all_user_data })
            }
        } else {
            res.write("<script>alert('잘못된 비밀번호');location.href = `https://jh.jp.ngrok.io/users/login`;</script>", "utf8")
        }
    } else {
        res.write("<script>alert('잘못된 아이디');location.href = `https://jh.jp.ngrok.io/users/login`;</script>", "utf8")
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => { })
    res.redirect('/users/login')
}

///////////edit////////

exports.update = async (req, res) => {
    const { user_data } = req.session
    const userdata = await mysql_callback.GET_USER_DATA_ID(user_data)
    const detail_userdata = Object(userdata[0])
    res.render('update_sign-in', { data: detail_userdata })
}

exports.update_logic = async (req, res) => {
    const { id, nickname, email } = req.body
    const { user_data } = req.session
    if (!id || !nickname || !email) {
        res.write("<script>alert('빈칸을 입력해주세요');location.href = `https://jh.jp.ngrok.io/users/sign-up`;</script>", "utf8")
    } else {
        const update_userdata = await mysql_callback.UPDATE_USER(id, nickname, email, user_data)
        const userdata = await mysql_callback.GET_USER_DATA_ID(user_data)
        const detail_user_data = Object(userdata[0])
        res.render('sign-in', { data: detail_user_data })
    }
}


exports.delete_logic = async (req, res) => {
    const { user_data } = req.session
    const delete_user = await mysql_callback.DELETE_USER(user_data)
    res.redirect('login')
}