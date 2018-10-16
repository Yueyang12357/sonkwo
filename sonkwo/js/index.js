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
            for (var i = 0; i < this.data.length; i++) {
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

    function Coupons() {};
    $.extend(Coupons.prototype, LoadJson.prototype, {
        renderPage() {
            console.log(this.json);
            this.data = this.json.gifts;
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                html += `<div class="coupon-block">
                                <div class="price">
                                    <span class="symbol">￥</span>
                                    <span>${this.data[i].coupons[0].value}</span>
                                    <span class="condition">满${this.data[i].coupons[0].minimum_order}立减</span>
                                </div>
                                <div class="name">${this.data[i].name}</div>
                                <div class="date">2018-08-29至2018-11-01</div>
                            </div>`
            }
            this.main.html(html);
        }
    })
    var coupons = new Coupons();
    coupons.init({
        box: '.coupons',
        url: 'scripts/index.json'
    })

    function Headlines() {};
    $.extend(Headlines.prototype, LoadJson.prototype, {
        renderPage() {
            this.data = this.json.headlines;
            var html = `<img src="${this.data[0].cover.url}" alt="">
                <div class="layer">
                    <p>${this.data[0].title}</p>
                </div>`;
            this.main.html(html)
        }
    })
    var headlines = new Headlines();
    headlines.init({
        box: '.headline',
        url: 'scripts/index.json'
    })

    function NewGame() {};
    $.extend(NewGame.prototype, LoadJson.prototype, {
        renderPage() {
            this.data = this.json.recommend_skus[0].items;
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                html += `<a href="#">
                            <div>
                                <img src="${this.data[i].sku_cover}" alt="">
                            </div>
                            <div class="info">
                                <p>${this.data[i].sku_name}</p>
                                <span class="discount"></span>
                                <span class="sale-price">￥${this.data[i].list_price}</span>
                            </div>
                        </a>`;
            }
            this.main.html(html);
        }
    })
    var newGame = new NewGame();
    newGame.init({
        box: '.newgame-data',
        url: 'scripts/index.json'
    })

    function HotGame() {};
    $.extend(HotGame.prototype, LoadJson.prototype, {
        renderPage() {
            this.data = this.json.recommend_skus[1].items;
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                html += `<a href="#">
                            <div>
                                <img src="${this.data[i].sku_cover}" alt="">
                            </div>
                            <div class="info">
                                <p>${this.data[i].sku_name}</p>
                                <span class="discount"></span>
                                <span class="sale-price">￥${this.data[i].list_price}</span>
                            </div>
                        </a>`;
            }
            this.main.html(html);
        }
    })
    var hotGame = new HotGame();
    hotGame.init({
        box: '.hotgame_data',
        url: 'scripts/index.json'
    })

    function Special() {};
    $.extend(Special.prototype, LoadJson.prototype, {
        renderPage() {
            this.data = this.json.booths[0].items;
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                html += `<a href="#">
                            <div>
                                <img src="${this.data[i].cover}" alt="">
                            </div>
                            <p>${this.data[i].title}</p>
                        </a>`
            }
            this.main.html(html);
        }
    })
    var special = new Special();
    special.init({
        box: '.special_box',
        url: 'scripts/index.json'
    })

    function Comment() {};
    $.extend(Comment.prototype, LoadJson.prototype, {
        renderPage() {
            this.data = this.json.recommend_posts.items;
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                html += ` <div class="comment_content">
                            <img src="${this.data[i].group.logo}" alt="">
                            <div class="comment_cover">
                                <div class="comment_user">
                                    <a href="#"><img src="${this.data[i].creator.avatar}" alt=""></a>
                                    <a href="#">${this.data[i].creator.nickname}</a>
                                </div>
                                <a href="#">${this.data[i].content}</a>
                                <p>${this.data[i].summary}</p>
                            </div>
                        </div>`
            }
            this.main.html(html);
        }
    })
    var comment = new Comment();
    comment.init({
        box: '.comment_box',
        url: 'scripts/index.json'
    })

    function Groups() {};
    $.extend(Groups.prototype, LoadJson.prototype, {
        renderPage() {
            this.data = this.json.groups;
            var html = '';
            for (var i = 0; i < 3; i++) {
                html += `  <div class="groups_block">
                                <img src="${this.data[i].logo}" alt="">
                                <div class="groups_cover">
                                    <a href="#" class="groups_name">${this.data[i].name}</a>
                                    <a href="#" class="groups_icon">
                                        <img src="" alt="">
                                    </a>
                                    <p class="groups_leader"></p>
                                    <p>
                                        <span>玩家数：${this.data[i].member_count}</span>
                                        <span>主题数：${this.data[i].posts_count}</span>
                                    </p>
                                </div>
                            </div>`
            }
            this.main.html(html);
        }
    })
    var groups = new Groups();
    groups.init({
        box: '.groups_box',
        url: 'scripts/index.json'
    })

    function Publisher() {};
    $.extend(Publisher.prototype, LoadJson.prototype, {
        renderPage() {
            // console.log(this.json)
            this.data = this.json.publishers;
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                html += `<a href="#">
                                <img src="${this.data[i].publisher_detail.logo}" alt="">
                            </a>`
            }
            this.main.html(html);
        }
    })
    var publisher = new Publisher();
    publisher.init({
        box: '.publisher_box',
        url: 'scripts/publishers.json'
    })

    function Partners() {};
    $.extend(Partners.prototype, LoadJson.prototype, {
        renderPage() {
            console.log(this.json)
            this.data = this.json.partners;
            var html = '<span>友情链接:</span>';
            for (var i = 0; i < this.data.length; i++) {
                html += `<a href="#">${this.data[i].name}</a>`
            }
            this.main.html(html);
        }
    })
    var partners = new Partners();
    partners.init({
        box: '.partners_box',
        url: 'scripts/publishers.json'
    })

    function WeekRank() {};
    $.extend(WeekRank.prototype, LoadJson.prototype, {
        renderPage() {
            this.data = this.json.weekly_ranking;
            var html = '';
            for (var i = 0; i < this.data.length; i++) {
                html += `<li>
                            <a href="#">
                                <img src="${this.data[i].sku_cover}" alt="">
                                <div class="top_item">
                                    <p class="item_name">${this.data[i].sku_name}</p>
                                    <p class="item_data">发行于2018-10-19</p>
                                </div>
                                <p class="top_num">${i+1}</p>
                            </a>
                        </li>`
            }
            this.main.html(html);
        }
    })
    var weekRank = new WeekRank();
    weekRank.init({
        box: '.top',
        url: 'scripts/index.json'
    })

    function WaterFull() {};
    $.extend(WaterFull.prototype, LoadJson.prototype, {
        init(opts) {
            this.main = $(opts.box);
            this.url = opts.url;
            this.page_num = 0;
            this.rendering = false;
            this.loadJson()
                .then(function(res) {
                    this.json = res;
                    this.renderPage();
                })
            this.bindEvent();
        },
        bindEvent() {
            $(window).scroll($.proxy(this.ifRender, this));
        },
        ifRender() {
            this.children = this.main[0].children;
            if (this.rendering) return 0;
            if (this.children.length == 0) return 0;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var clientHeight = document.documentElement.clientHeight;
            var lastChildren = this.children[this.children.length - 1];
            var lastTop = lastChildren.offsetTop;
            if (clientHeight + scrollTop > lastTop) {
                this.rendering = true;
                this.page_num++;
                this.renderPage();
            }
        },
        renderPage() {
            this.data = this.json.new_tagged_games;
            var html = '';
            if (this.page_num > 3) {
                return 0;
            }
            for (var i = this.page_num * 3; i <= this.page_num * 3 + 2; i++) {
                html += `<li>
                            <a href="#">
                                <img src="${this.data[i].sku_cover}" alt="">
                                <div class="item_info">
                                    <p class="item_name">
                                    ${this.data[i].sku_name}
                                        <span>预售</span>
                                    </p>
                                    <p class="item_data">发行于2018-10-19</p>
                                    <p class="tags">
                                        <span>${this.data[1].product.searchable_tags[0].name}</span>
                                        <span>${this.data[1].product.searchable_tags[1].name}</span>
                                    </p>
                                </div>
                                <p class="item_price">￥${this.data[i].list_price}</p>
                            </a>
                        </li>`
            }
            this.main[0].innerHTML += html;
            this.rendering = false;
        }
    })
    var waterFull = new WaterFull();
    waterFull.init({
        box: '.item',
        url: 'scripts/index.json'
    })
})