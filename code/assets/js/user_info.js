$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须在1-6个字符之间';
            }
        }
    })
    initUserInfo();


    //// 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.measseg);
                }
                // console.log(res)
                // 调用 `form.val()`
                // 方法为表单赋值：          
                form.val('formUserInfo', res.data)
            }
        })
    }
    // // 重置表单的数据
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo();
        })
        //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})