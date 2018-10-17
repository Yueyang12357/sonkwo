$(function() {
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
})