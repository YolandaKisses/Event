$(function () {

    // 获取用户信息
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            var resName = res.data.username || res.data.nickname;
            $('#welcome').html('欢迎&nbsp;&nbsp;' + resName);
            if (res.data.user_pic) {
                $('.layui-nav-img').attr('src', res.data.user_pic).show();
                $('.text-avatar').hide();
            } else {
                $('.layui-nav-img').hide();
                $('.text-avatar').html(resName[0].toUpperCase());
            }
        }
    });

    $('#logout').click(function () {
        // 111
        layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            //do something

            window.localStorage.removeItem('token');
            window.location.href = './login.html'
            layer.close(index);
        });
    });




});