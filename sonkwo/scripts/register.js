$(function() {
    var verificationCode = Math.round(Math.random() * 8999 + 1000);
    $('.short a').text(verificationCode);
    $('.short a').on('click', function randomCode() {
        verificationCode = Math.round(Math.random() * 8999 + 1000);
        $(this).text(verificationCode);
    });
    var flags = [false, false, false, false, false]

    function Reg() {};
    $.extend(Reg.prototype, {
        init(opts) {
            this.item = $(opts.item);
            this.hint = $(opts.hint);
            this.bindEvent();
        },
        bindEvent() {
            this.item.on('focus', this.info.bind(this));
            this.item.on('blur', this.test.bind(this));
        },
        info() {
            this.item.css({
                borderColor: '#2666b5'
            })
            if (this.item.val() == '') {
                this.hint.removeClass();
                this.hint.children().removeClass();
                this.hint.addClass('warning');
                this.hint.children().addClass('iconfont icon-jinggao')
            }
        },
        test() {
            if (/^[a-zA-Z]?\w{5,17}@[a-zA-Z0-9]{2,10}.[a-zA-Z]{2,10}$/.test(this.item.val())) {
                this.item.css({
                    borderColor: ''
                })
                flags[0] = true;
                this.hint.removeClass();
            } else {
                this.item.css({
                    borderColor: '#f44848'
                })
                this.hint.removeClass();
                this.hint.children().removeClass();
                this.hint.addClass('error');
                this.hint.children().addClass('iconfont icon-jinzhi')
            }
        }
    })
    var email = new Reg();
    email.init({
        item: '#email',
        hint: '.form_input:nth-of-type(1) span'
    })


    function RegCode() {};
    $.extend(RegCode.prototype, Reg.prototype, {
        test() {
            if (this.item.val() != '' && this.item.val() == verificationCode) {
                this.item.css({
                    borderColor: ''
                })
                flags[1] = true;
            } else {
                this.item.css({
                    borderColor: '#f44848'
                })
            }
        }
    })
    var code = new RegCode();
    code.init({
        item: '#code',
        hint: '.form_input:nth-of-type(2) span'
    })

    function RegEmailCode() {};
    $.extend(RegEmailCode.prototype, Reg.prototype, {
        info() {
            this.item.css({
                borderColor: '#2666b5'
            })
            this.hint.html('<i></i>请输入邮箱验证码');
            if (this.item.val() == '') {
                this.hint.removeClass();
                this.hint.children().removeClass();
                this.hint.addClass('warning');
                this.hint.children().addClass('iconfont icon-jinggao')
            }
        },
        test() {
            if (this.item.val() != '') {
                this.item.css({
                    borderColor: ''
                })
                flags[2] = true;
                this.hint.removeClass();
            } else {
                this.item.css({
                    borderColor: '#f44848'
                })
                this.hint.html('<i></i>无效的邮箱验证码');
                this.hint.removeClass();
                this.hint.children().removeClass();
                this.hint.addClass('error');
                this.hint.children().addClass('iconfont icon-jinzhi')
            }
        }
    })
    var emailCode = new RegEmailCode();
    emailCode.init({
        item: '#emailCode',
        hint: '.form_input:nth-of-type(3) span'
    })
    var num;

    function RegPwd() {};
    $.extend(RegPwd.prototype, Reg.prototype, {
        test() {
            num = this.item.val()
            if (/^([0-9a-zA-Z\!\@\#\$\%\^\&\*\(\)\_\+\=\-]){6,20}$/.test(this.item.val())) {
                this.item.css({
                    borderColor: ''
                })
                flags[3] = true;
                this.hint.removeClass();
            } else {
                this.item.css({
                    borderColor: '#f44848'
                })
                this.hint.removeClass();
                this.hint.children().removeClass();
                this.hint.addClass('error');
                this.hint.children().addClass('iconfont icon-jinzhi')
            }
            var rePwd = new RegRePwd();
            rePwd.init({
                item: '#rePwd',
                hint: '.form_input:nth-of-type(5) span'
            })
            return num;
        }
    })
    var pwd = new RegPwd();
    pwd.init({
        item: '#password',
        hint: '.form_input:nth-of-type(4) span'
    })

    function RegRePwd() {};
    $.extend(RegRePwd.prototype, Reg.prototype, {
        info() {
            this.item.css({
                borderColor: '#2666b5'
            })
            this.hint.html('<i></i>请再次填写密码');
            if (this.item.val() == '') {
                this.hint.removeClass();
                this.hint.children().removeClass();
                this.hint.addClass('warning');
                this.hint.children().addClass('iconfont icon-jinggao')
            }
        },
        test() {
            if (this.item.val() != '' && this.item.val() == num) {
                this.item.css({
                    borderColor: ''
                })
                flags[4] = true;
                this.hint.removeClass();
            } else {
                this.item.css({
                    borderColor: '#f44848'
                })
                this.hint.html('<i></i>两次填写的密码不一致');
                this.hint.removeClass();
                this.hint.children().removeClass();
                this.hint.addClass('error');
                this.hint.children().addClass('iconfont icon-jinzhi')
            }
        }
    })
    var rePwd = new RegRePwd();
    rePwd.init({
        item: '#rePwd',
        hint: '.form_input:nth-of-type(5) span'
    })

    $('#register').on('click', function(evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
        if (flags.every(check) && $("#agree")[0].checked) {
            var opt = {
                url: 'php/register.php',
                type: 'POST',
                data: {
                    'email': $('#email').val(),
                    'password': $('#password').val(),
                }
            };
            $.ajax(opt).done(function(res) {
                console.log(res)
                if (res == '成功') {
                    // $.cookie('email', $('#email').val());
                    $(location).attr('href', 'login.html');
                } else {
                    alert(res)
                }
            });
        } else {
            $('#email').blur();
            $('#code').blur();
            $('#emailCode').blur();
            $('#password').blur();
        }

        function check(item) {
            return item;
        }

    })
})