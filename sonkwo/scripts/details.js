$(function() {
    function Comment() {};
    $.extend(Comment.prototype, {
        init(opts) {
            this.main = $(opts.main);
            this.url = opts.url;
            this.page_num = 0;
            this.rendering = false;
            this.loadJson()
                .then(function(res) {
                    this.json = res.posts;
                    this.renderPage();
                })
            this.bindEvent();
        },
        bindEvent() {
            $(window).scroll($.proxy(this.ifRender, this));
        },
        loadJson() {
            var opt = {
                url: this.url,
                context: this
            }
            return $.ajax(opt);
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
        renderPage() {;
            var html = '';
            if (this.page_num > 7) {
                return 0;
            }
            for (var i = this.page_num * 3; i <= this.page_num * 3 + 2; i++) {
                html += `<div class="comment_item">
                        <div class="comment_user">
                            <a href="#" class="portrait">
                                <img src="${this.json[i].creator.avatar}" alt="">
                            </a>
                            <div class="commenter">
                                <a href="#">${this.json[i].creator.nick_name}</a>
                                <p>Lv.${this.json[i].creator.score.level_info.level}</p>
                            </div>
                        </div>
                        <div class="comment_content_box">
                            <div class="star">
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                            </div>
                            <div class="release-time">
                                发布于2018-10-18
                                <span>共计游玩${this.json[i].playtime}小时</span>
                            </div>
                            <div class="comment_content">${this.json[i].content}</div>
                            <div class="operation">
                                <a>
                                    <i class="iconfont icon-dianzan"></i>
                                    <span>${this.json[i].likes_count}</span>
                                </a>
                                <a href="#">回复${this.json[i].comment_count}</a>
                            </div>
                        </div>
                    </div>
                    <hr>`
            }
            this.main[0].innerHTML += html;
            this.rendering = false;
        }
    })
    var comment = new Comment();
    comment.init({
        main: '.comment_list',
        url: 'scripts/details.json'
    });

    function TabImg() {};
    $.extend(TabImg.prototype, {
        init(opts) {
            this.item_list = $(opts.item_list);
            this.largeImg = $(opts.largeImg);
            this.bindEvent();
        },
        bindEvent() {
            this.item_list.on('click', this.show.bind(this));
        },
        show(event) {
            var target = event.target;
            this.item_list.removeClass('img_active');
            $(target).parent().addClass('img_active');
            var i = $(target).attr('src');
            this.largeImg.attr({
                src: i
            })
        }
    })
    var tabImg = new TabImg();
    tabImg.init({
        item_list: '.img_item',
        largeImg: '.view_img img'
    })

    function Magnifying() {};
    $.extend(Magnifying.prototype, {
        init(opts) {
            this.main = $(opts.main);
            this.view = $(opts.view);
            this.show = $(opts.show);
            this.largeImg = $(opts.largeImg);
            var largeImgWidth = opts.largeImgWidth;
            var largeImgHeight = opts.largeImgHeight;
            this.scaleWidth = largeImgWidth / this.main[0].offsetWidth;
            this.scaleHeight = largeImgHeight / this.main[0].offsetHeight;
            // console.log(this.scaleWidth, this.scaleHeight)
            this.bindEvent();
        },
        bindEvent() {
            this.main.on('mouseenter', this.start.bind(this));
            this.main.on('mousemove', this.showImg.bind(this));
            this.main.on('mouseleave', this.end.bind(this));
        },
        start() {
            this.view.show();
            this.show.show();
        },
        end() {
            this.view.hide();
            this.show.hide();
        },
        showImg(event) {
            var left = event.offsetX - this.view[0].offsetWidth / 2;
            var top = event.offsetY - this.view[0].offsetHeight / 2;
            var maxLeft = this.main[0].offsetWidth - this.view[0].offsetWidth;
            var maxTop = this.main[0].offsetHeight - this.view[0].offsetHeight;
            if (left <= 0) left = 0;
            if (top <= 0) top = 0;
            if (left >= maxLeft) left = maxLeft;
            if (top >= maxTop) top = maxTop;
            console.log(left, top, maxLeft, maxTop)
            this.view.css({
                left: left,
                top: top
            })
            this.largeImg.css({
                left: -left * this.scaleWidth,
                top: -top * this.scaleHeight
            })
        }
    })
    var magnifying = new Magnifying();
    magnifying.init({
        main: '.view_img img',
        largeImg: '.magnifying img',
        view: '.view',
        show: '.magnifying',
        largeImgWidth: '1220',
        largeImgHeight: '686'
    })
})