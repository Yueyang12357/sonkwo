$('header').load('main.html .header');
$('aside').load('main.html .aside_box');
$('footer').load('main.html .footer');
$(function() {
    $('#backtop').parent().on('click', function() {
        $(window).scrollTop(0);
    })
    if ($.cookie('username') != undefined) {
        var user = getCookie();
        $('#user').html(user);
    } else {
        $('#user').html('登录');
    }

    function getCookie() {
        if ($.cookie('username') == undefined) {
            return '登录';
        } else {
            var str = $.cookie('username');
            var endIndex = str.indexOf('@');
            return str.slice(0, endIndex);
        }
    }

    function Nav() {};
    $.extend(Nav.prototype, {
        init(opts) {
            this.list = $(opts.item_list);
            this.item = $(opts.item);
            this.bindEvent();
        },
        bindEvent() {
            this.list.on('mouseover', this.show);
            this.list.on('mouseout', this.hide);
        },
        show() {
            $(this).removeClass('ft_active');
            $(this).addClass('ft_active');
            $(this).find('.second_title').css({
                'display': 'block'
            })
        },
        hide() {
            $(this).removeClass('ft_active');
            $(this).find('.second_title').css({
                'display': 'none'
            })
        }
    })
    var nav = new Nav();
    nav.init({
        item_list: '.first_title>li',
        item: '.second_title'
    })

    function SideBar() {};
    $.extend(SideBar.prototype, Nav.prototype, {
        show() {
            $(this).children('.remind').css({
                'display': 'block'
            })
        },
        hide() {
            $(this).children('.remind').css({
                'display': 'none'
            })
        }
    })
    var topBar = new SideBar();
    topBar.init({
        item_list: '.side_top a',
        item: '.side_top .remind'
    })
    var bottomBar = new SideBar();
    bottomBar.init({
        item_list: '.side_bottom a',
        item: '.side_bottom .remind'
    })

    function Coo() {};
    $.extend(Coo.prototype, {
        init(opt) {
            this.item = $(opt);
            this.bindEvent();
        },
        bindEvent() {
            this.item.on('mouseover', this.rendePage.bind(this));
        },
        rendePage() {
            var cookie;
            var sum = 0;
            if (!(cookie = $.cookie("shopCar"))) {
                return 0;
            }
            var cookieArray = JSON.parse(cookie);
            for (var i = 0; i < cookieArray.length; i++) {
                sum += cookieArray[i].num;
            }
            this.item.children('.remind').text('购物车' + sum);
        }
    })
    var coo = new Coo();
    coo.init('.side_top a:nth-of-type(1)')
        // function coo() {
        //     var cookie;
        //     var sum = 0;
        //     if (!(cookie = $.cookie("shopCar"))) {
        //         return 0;
        //     }
        //     var cookieArray = JSON.parse(cookie);
        //     for (var i = 0; i < cookieArray.length; i++) {
        //         sum += cookieArray[i].num;
        //     }
        //     return sum;
        // }
        // $('.side_top a:nth-of-type(1) .remind').text('购物车' + coo());
})