$(function() {
    var flags = [false, false];

    function NameReg() {};
    $.extend(NameReg.prototype, {
        init(opts) {
            this.item = $(opts.item);
            this.tips = $(opts.tips);
            this.bindEvent();
        },
        bindEvent() {
            this.item.on('focus', this.test.bind(this));
            this.item.on('blur', this.info.bind(this));
        },
        test() {
            this.item.css({
                borderColor: '#2666b5'
            })
            if (this.item.val() == '') {
                flags[0] = true;
                this.tips.removeClass();
                this.tips.children().removeClass();
                this.tips.addClass('warning');
                this.tips.children().addClass('iconfont icon-jinggao')
            }
        },
        info() {
            var passReg = /^[a-zA-Z]?\w{5,17}@[a-zA-Z0-9]{2,10}.[a-zA-Z]{2,10}$/;
            var numReg = /^[0-9]{11}$/;
            if (passReg.test(this.item.val()) || numReg.test(this.item.val())) {
                this.item.css({
                    borderColor: ''
                })
                this.tips.removeClass();
            } else {
                this.item.css({
                    borderColor: '#f44848'
                })
                this.tips.removeClass();
                this.tips.children().removeClass();
                this.tips.addClass('error');
                this.tips.children().addClass('iconfont icon-jinzhi')
            }
        }
    })
    var user = new NameReg();
    user.init({
        item: '#username',
        tips: '.form_input p:nth-of-type(1)'
    });

    function PwReg() {};
    $.extend(PwReg.prototype, NameReg.prototype, {
        info() {
            if (/^([0-9a-zA-Z\!\@\#\$\%\^\&\*\(\)\_\+\=\-]){6,20}$/.test(this.item.val())) {
                this.item.css({
                    borderColor: ''
                })
                flags[1] = true;
                this.tips.removeClass();
            } else {
                this.item.css({
                    borderColor: '#f44848'
                })
                this.tips.removeClass();
                this.tips.children().removeClass();
                this.tips.addClass('error');
                this.tips.children().addClass('iconfont icon-jinzhi')
            }
        }
    })
    var pw = new PwReg();
    pw.init({
        item: '#password',
        tips: '.form_input p:nth-of-type(2)'
    });

    $('#login').on('click', function(evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
        console.log(1)
        if ($('#remember')[0].checked) {
            console.log('记住密码')
        }
        if (flags.every(check)) {
            var opt = {
                url: 'php/login.php',
                type: 'POST',
                data: {
                    'email': $('#username').val(),
                    'password': $('#password').val(),
                }
            };
            $.ajax(opt).done(function(res) {
                if (res == '成功') {
                    $.cookie('username', $('#username').val(), { expires: 7, path: '/' });
                    $(location).attr('href', 'index.html');
                } else {
                    alert('登录失败:' + res);
                }
            });
        } else {
            alert('请确保输入正确');
        }
    });

    function check(item) {
        return item;
    }
})