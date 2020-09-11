$(function () {

    layui.form.verify({
        //新密码不能和原密码一致
        diff: function (value) {
            var oldPwd = $('[name="oldPwd"]').val();
            if (oldPwd === value) {
                return '新密码和原密码不能一致';
            }
        },
        //两次密码输入必须一致
        same: function (value) {
            var newPwd = $('[name="newPwd"]').val();
            if (newPwd !== value) {
                return '两次密码必须一致';
            }
        }
    });

    $('#changePwd').click(function (e) {
        e.preventDefault();
        $.post('/my/updatepwd', $('#formInfo').serialize(), function (res) {
            console.log(res);
            if (res.status === 0) {
                // console.log(res);
                layer.msg(res.message);
                $('button[type="reset"]').click();
            }
        });
    });
});