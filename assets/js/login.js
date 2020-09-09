$(function () {

    //注册登录切换
    $('#loginLink').click(function () {
        $('#loginBox').hide();
        $('#regBox').show();
    });
    $('#regLink').click(function () {
        $('#regBox').hide();
        $('#loginBox').show();
    });

    //验证密码及两次密码是否一致
    layui.form.verify({
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repassword: function (value) {
            if ($('#regPwd').val() !== value) {
                return '两次密码输入不一致';
            }
        }
    });

    // 注册功能
    $('#regBox').submit(function (e) {
        e.preventDefault();
        var userName = $('#regBox input[name=username]').val();
        var userPwd = $('#regBox input[name=password]').val();
        var info = {
            username: userName,
            password: userPwd
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', info, function (res) {
            // console.log(res);
            if (res.status === 0) {
                layer.msg(res.message);
                $('#regBox').hide();
                $('#loginBox').show();
                $('#regBox')[0].reset();
            } else {
                layer.msg(res.message)
            }
        })
    });





});