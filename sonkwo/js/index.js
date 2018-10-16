$('header').load('main.html .header');
$('aside').load('main.html .aside_box');
$('footer').load('main.html .footer');
$(function() {
    function LoadJson() {}
    $.extend(LoadJson.prototype, {
        init(opts) {
            this.main = $(opts.box);
            this.url = opts.url;
            this.loadJson()
                .then(function(res) {
                    this.json = res;
                    this.renderPage();
                })
        },
        loadJson() {
            var opt = {
                url: this.url,
                context: this
            };
            return $.ajax(opt);
        }
    })

    function Banner() {};
    $.extend(Banner.prototype, LoadJson.prototype, {
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
            this.data = this.json.banner.banners;
            var html = '';
            for (var i = 0; i < this.json.length; i++) {
                html += ` <li>
                            <a href="#" style="background-image: url(${this.data[i].cover});"></a>
                        </li>`;
            };
            html += `<li>
                        <a href="#" style="background-image: url(${this.data[0].cover});"></a>
                    </li>`;
            this.main.html(html);
            this.width();
        }
    })
    var banner = new Banner();
    banner.init({
        box: '.banner ul',
        url: 'scripts/index.json'
    })

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
            this.bindEvent();
            this.autoPlay();
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
                    left: -this.speed * (this.itemIndex - 1)
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
        toIndex(event) {
            var target = event.target;
            this.nowIndex = $(target).index();
            this.animate();
        },
        autoPlay() {
            this.bannerTimer = setInterval(function() {
                this.next();
            }.bind(this), 3000)
        },
        animate() {
            this.item.stop().animate({
                left: -this.speed * this.nowIndex
            })
            this.btn_list.removeClass('btn_active');
            var index;
            if (this.nowIndex == this.itemIndex - 1) {
                index = 0;
            } else {
                index = this.nowIndex;
            }
            this.btn_list.eq(index).addClass('btn_active');
        }
    });

    function Activty() {}
    $.extend(Activty.prototype, LoadJson.prototype, {
        renderPage() {
            this.data = this.json.ad.banners;
            console.log(this.data)
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                html += `<a href="${this.data[i].url}">
                            <div class="activity_img">
                                <img src="${this.data[i].cover}" alt="">
                            </div>
                            <div class="activity_title">
                                <p>${this.data[i].title}</p>
                            </div>
                        </a>`
            }
            this.main.html(html);
        }
    })
    var activity = new Activty();
    activity.init({
        box: '.activity_box',
        url: 'scripts/index.json'
    })
})