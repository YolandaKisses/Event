$(function () {

    //渲染文章类别管理页面数据
    initTable();
    function initTable() {
        $.get('/my/article/cates', function (res) {
            // console.log(res, res.data); //数组数据
            if (res.status === 0) {
                var htmlStr = template('tpl-initTable', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    // 添加功能渲染弹窗
    var addIndex;
    var editIndex;
    $('#addBtn').click(function (e) {
        e.preventDefault();
        var addHtmlStr = $('#tpl-add').html();
        // console.log(addHtmlStr);
        addIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: addHtmlStr
        })
    });

    // 添加数据同步渲染至页面
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault();
        $.post('/my/article/addcates', $(this).serialize(), function (res) {
            // console.log(res);
            if (res.status === 0) {
                layer.close(addIndex);
                initTable();
            }
        });
    });

    //编辑功能渲染弹窗
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        var editHtmlStr = $('#tpl-edit').html();
        // console.log(editHtmlStr);
        editIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: editHtmlStr
        });
        var Id = $(this).attr('data-id')
        // console.log(Id);
        $.get(`/my/article/cates/${Id}`, function (res) {
            if (res.status === 0) {
                layui.form.val('editForm', res.data);
            }
        });
    });

    //提交修改重新渲染页面
    $('body').on('submit', '#editForm', function (e) {
        e.preventDefault();
        $.post('/my/article/updatecate', $(this).serialize(), function (res) {
            layer.close(editIndex);
            initTable();
        });
    });

    //删除重新渲染页面
    $('tbody').on('click', '.btn-delete', function (e) {
        // console.log(1);
        e.preventDefault();
        var Id = $(this).attr('data-id')
        layer.confirm('确定要删除吗？', { icon: 3, title: '删除' }, function (index) {
            //do something
            $.get(`/my/article/deletecate/${Id}`, function (res) {
                initTable();
            })

            layer.close(index);
        });
    })








});