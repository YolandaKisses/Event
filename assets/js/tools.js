$(function () {

    var token = window.localStorage.getItem('token') || '';

    $.ajaxPrefilter(function (options) {

        //统一拼接url
        options.url = 'http://ajax.frontend.itheima.net' + options.url;

        //统一设置请求头token
        if (!options.url.includes('/api/')) {
            options.headers = {
                Authorization: token
            };
        }

        //统一判断有无token
        options.complete = function (res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') { //1111111111
                window.localStorage.removeItem('token');
                window.location.href = '/login.html';
            }
        }
    });

});