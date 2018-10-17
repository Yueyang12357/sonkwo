$(function() {
    function Reg() {};
    $.extend(Reg.prototype, {
        init(opts) {
            this.item = $(opts.item);
            this.tips = $(opts.tips);
            console.log(this.tips.children());
            this.bindEvent();
        },
        bindEvent() {
            this.item.on('focus', this.test.bind(this));
            this.item.on('blur', this.info.bind(this));
        },
        test() {
            if (this.item.val() == '') {
                this.tips.removeClass();
                this.tips.children().removeClass();
                this.tips.addClass('warning');
                this.tips.children().addClass('iconfont icon-jinggao')
            }
        },
        info() {
            if (this.item.val() == '') {
                this.tips.removeClass();
                this.tips.children().removeClass();
                this.tips.addClass('error');
                this.tips.children().addClass('iconfont icon-jinzhi')
            }
        }
    })
    var user = new Reg();
    user.init({
        item: '#username',
        tips: '.form_input p:nth-of-type(1)'
    });
})