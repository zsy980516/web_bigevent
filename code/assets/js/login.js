$(function() {
    //点击去注册按钮
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击去登录按钮
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify（）自定义验证规则
    form.verify({
        //自定义了一个pwd的验证规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            //通过形参拿到的是确认密码框的内容
            //还需要拿到密码框中的值
            //然后进行一次判断
            //如果fales返回一个提示消息
            var pwd = $('.reg-box [name="password"]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            // 1. 阻止默认的提交行为
            e.preventDefault()
                // 2. 发起Ajax的POST请求
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录');
                //模拟人的点击行为
                $('#link_login').click();


            })
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg(res.message);
                // console.log(res.token);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                //跳转页面
                location.href = '/index.html';
            }





        })
    })
})