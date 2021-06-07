$(function() {
    var layer = layui.layer
    var form = layui.form;
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 为添加类别按钮绑定点击事件
    var index = null;
    $('#btnAddCate').on('click', function() {
            index = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html(),
            })
        })
        //通过代理的方式为form表单添加sumbit事件  因为form表单是动态添加
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList();
                    layer.msg(res.message);
                    layer.close(index);
                }
            })
        })
        //通过代理的方式为btn-edit绑定点击事件
    var indexedit = null;
    $('tbody').on('click', '.btn-edit', function() {
            indexedit = layer.open({
                    type: 1,
                    area: ['500px', '250px'],
                    title: '修改文章分类',
                    content: $('#dialog-edit').html(),
                })
                //  进行已有数据的填充
            var id = $(this).attr('data-id');
            // console.log(id);

            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                        // console.log(res);

                }
            })

        })
        //通过代理的方式为form-edit绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message);
                    layer.close(indexedit);
                    initArtCateList()
                }
            })
        })
        //通过代理的形式为删除按钮注册点击事件
    $('tbody').on('click', '.btn-del', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(index);
                    initArtCateList()



                }

            })

        });


    })
})