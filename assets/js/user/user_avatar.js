$(function () {
    var $image = $('#image');

    var options = {
        aspectRatio: 1,
        preview: '.img-preview',
    }

    $image.cropper(options);

    $('#btn-upload').click(function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        // console.log(e.target.files)
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })

    $('#sure').click(function (e) {
        e.preventDefault();
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100,
            })
            .toDataURL('image/png');
        $.post('/my/update/avatar', { avatar: dataURL }, function (res) {
            // console.log(res);
            if (res.status === 0) {
                window.parent.getInfo();
            }
            layer.msg(res.message);
        });





    });




})
