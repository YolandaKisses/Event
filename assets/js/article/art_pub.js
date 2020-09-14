$(function () {

    var state = '已发布';

    $('#caogao').click(function () {
        state = '草稿';
    });

    initEditor();

    //获取分类
    $.get(`/my/article/cates`, function (res) {
        // console.log(res);
        if (res.status === 0) {
            var htmlStr = template('cate', res);
            $('#cateIdBox').html(htmlStr);
            layui.form.render()
        }
    });

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview',
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    $('#chooseImage').click(function () {
        $('#file').click();
    })

    $('#file').change(function (e) {
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    });

    $('#formPub').submit(function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', state);
        console.log(fd);
        fd.forEach(function (key, value) {
            console.log(key, value);
        })
    });







});