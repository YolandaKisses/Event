$(function () {


    //Dingyi参数
    var pageParameter = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }




    // 更改显示的事件，moment.js
    template.defaults.imports.formDate = function (oldDate) {
        var newTime = moment(oldDate).format('MMMM Do YYYY, h:mm:ss a');
        return newTime;
    }


    // 获取文章列表渲染到页面
    initList()
    function initList() {
        $.get('/my/article/list', pageParameter, function (res) {
            // console.log(res);
            if (res.status === 0) {
                var htmlStr = template('tpl-initList', res)
                // console.log(htmlStr);
                $('tbody').html(htmlStr);
            }
        })
    }

















})