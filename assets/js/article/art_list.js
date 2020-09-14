$(function () {

    //Dingyi参数
    var pageParameter = {
        pagenum: 1,
        pagesize: 2,
        cate_id: $('#cateBox').val(),
        state: $('#stateBox').val(),
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
                renderPage(res.total);
            }
        })
    }

    // 初始化文章分类
    initCate();
    function initCate() {
        $.get(`/my/article/cates`, function (res) {
            // console.log(res);
            if (res.status === 0) {
                var htmlStr = template('tpl-initCate', res);
                $('#cateBox').html(htmlStr);
                layui.form.render();
            }
        })
    }

    // 筛选功能
    $('#form-search').submit(function (e) {
        e.preventDefault()
        var cateId = $('#cateBox').val();
        pageParameter.cate_id = cateId;
        var state = $('#stateBox').val();
        pageParameter.state = state;
        // console.log(cateId, state);
        initList();
    })


    //分页功能
    function renderPage(total) {
        // console.log(total)
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            laypage.render({
                elem: 'page',
                count: total,
                limit: pageParameter.pagesize,
                curr: pageParameter.pagenum,
                limits: [2, 5, 10],
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],

                jump: function (obj, first) {
                    pageParameter.pagesize = obj.limit;
                    pageParameter.pagenum = obj.curr;
                    // console.log(pageParameter.pagenum, pageParameter.pagesize);
                    //首次不执行
                    if (!first) {
                        //do something
                        initList();
                    }
                }
            });
        });

    }

    //删除功能
    $('tbody').on('click', '.delete', function (e) {
        e.preventDefault();
        var Id = $(this).attr('data-id');
        var len = $('.delete').length;
        console.log(len);
        layer.confirm('确定要删除了嘛?', { icon: 3, title: '删除框' }, function (index) {
            //do something
            $.get(`/my/article/delete/${Id}`, function (res) {
                if (res.status === 0) {
                    if (len === 1) {
                        pageParameter.pagenum = pageParameter.pagenum === 1 ? 1 : pageParameter.pagenum - 1;
                    }
                    initList();
                    layer.close(index);
                }
            })
        });
    });








})  