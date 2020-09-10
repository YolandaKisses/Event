$(function () {

    var token = window.localStorage.getItem('token') || '';

    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url;

        options.headers = {
            Authorization: token
        }
    });

});