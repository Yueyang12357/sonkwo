$('header').load('main.html .header');
$('aside').load('main.html .aside_box');
$('footer').load('main.html .footer');
$(function() {
    function Banner() {};
    $.extend(Banner.prototype, {
        init() {
            this.main = $(".banner ul");
            this.loadJson()
                .then(function(res) {
                    this.json = res.banner.banners;
                    this.renderPage();
                })
        },
        loadJson() {
            var opt = {
                url: "scripts/index.json",
                context: this
            };
            return $.ajax(opt);
        },
        width(event) {
            var evt = event || window.event;
            var width = document.documentElement.clientWidth || document.body.clientWidth;
            this.main.children('li').css('width', width);
            var slider = new Slider();
            slider.init({
                item: ".banner ul",
                item_list: '.banner li',
                btn_list: '.btn_list span',
                left_btn: '.left_btn',
                right_btn: '.right_btn',
                speed: width
            });
        },
        renderPage() {
            var html = '';
            for (let i = 0; i < this.json.length; i++) {
                html += ` <li>
                            <a href="#" style="background-image: url(${this.json[i].cover});"></a>
                        </li>`;
            };
            html += `<li>
                        <a href="#" style="background-image: url(${this.json[0].cover});"></a>
                    </li>`;
            this.main.html(html);
            this.width();
        }
    })
    var banner = new Banner();
    banner.init()

    function Slider() {}
    $.extend(Slider.prototype, {
        init(opts) {
            this.item = $(opts.item);
            this.item_list = $(opts.item_list);
            this.btn_list = $(opts.btn_list);
            this.left_btn = $(opts.left_btn);
            this.right_btn = $(opts.right_btn);
            this.speed = opts.speed;
            this.nowIndex = 0;
            this.itemIndex = this.item_list.length;
            // console.log(this.item, this.item_list, this.btn_list, this.left_btn, this.right_btn)
            this.bindEvent();
        },
        bindEvent() {
            this.left_btn.on('click', this.prev.bind(this));
            this.right_btn.on('click', this.next.bind(this));
            this.btn_list.on('click', this.toIndex.bind(this));
        },
        prev() {
            if (this.nowIndex == 0) {
                this.nowIndex = this.itemIndex - 2;
                this.item.css({
                    left: -this.speed * (this.itemIndex - 2)
                });
            } else {
                this.nowIndex--;
            }
            this.animate()
        },
        next() {
            if (this.nowIndex == this.itemIndex - 1) {
                this.item.css({
                    left: 0
                });
                this.nowIndex = 1;
            } else {
                this.nowIndex++;
            }
            this.animate()
        },
        toIndex() {
            console.log(3)
        },
        autoPlay() {

        },
        animate() {

        }
    })
})