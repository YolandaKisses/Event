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
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280,
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                // fd.forEach(function (key, value) {
                //     console.log(key, value);
                // })
                $.ajax({
                    type: 'POST',
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        // console.log(res);
                        if (res.status === 0) {
                            window.location.href = '/article/art_list.html';
                        }
                    }
                });
            })

    });







});