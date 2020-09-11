$(function () {
    // 验证nickName长度
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1-6字符之间';
            }
        }
    });

    //获取用户信息给表单赋值
    getUserInfo();
    function getUserInfo() {
        $.get('/my/userinfo', function (res) {
            // console.log(res);
            if (res.status === 0) {
                layui.form.val('formInfo', res.data);
            }
        });
    }

    // 表单重置
    $('#resetForm').click(function (e) {
        e.preventDefault();
        getUserInfo();
    });

    // 更新用户信息
    $('#infoBox').submit(function (e) {
        e.preventDefault();
        $.post('/my/userinfo', $(this).serialize(), function (res) {
            console.log(res);
            if (res.status === 0) {
                // console.log(res);
                window.parent.getInfo();
            }
        });
    });
});