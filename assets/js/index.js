$(function () {

    // 获取用户信息
    getInfo();
    function getInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status === 1) return; //1111111111111
                var resName = res.data.nickname || res.data.username;
                $('#welcome').html('欢迎&nbsp;&nbsp;' + resName);
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avatar').hide();
                } else {
                    $('.layui-nav-img').hide();
                    $('.text-avatar').html(resName[0].toUpperCase());
                }
            },
        });

    }

    window.getInfo = getInfo;

    //登出
    $('#logout').click(function () {

        layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            //do something

            window.localStorage.removeItem('token');
            window.location.href = './login.html'
            layer.close(index);
        });
    });




});