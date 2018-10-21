$(function() {
    function Pagination() {};
    $.extend(Pagination.prototype, {
        init() {
            this.main = $('.item');
            this.item = $('.game_list');
            this.page = 1;
            this.pageNum = 10;
            this.loadJson()
                .then(function(res) {
                    this.json = res.skus;
                    this.total = this.json.length;
                    this.renderPage();
                    this.usePagination();
                })
        },
        loadJson() {
            var opt = {
                url: 'scripts/data.json',
                context: this
            };
            return $.ajax(opt);
        },
        renderPage() {
            var html = '';
            for (var i = (this.page - 1) * 10; i < this.page * 10; i++) {
                html += `<li>
                            <button data-id="${this.json[i].id}" class="cart"><i class="iconfont icon-buy-car"></i></button>
                            <a href="details.html">
                                <img src="${this.json[i].sku_cover}" alt="">
                                <div class="item_info">
                                    <p class="item_name">
                                    ${this.json[i].sku_name}
                                        <span>预售</span>
                                    </p>
                                    <p class="item_data">发行于2018-10-19</p>
                                    <p class="tags">
                                        <span>${this.json[1].product.searchable_tags[0].name}</span>
                                        <span>${this.json[1].product.searchable_tags[1].name}</span>
                                    </p>
                                </div>
                                <p class="item_price">￥${this.json[i].list_price}</p>
                            </a>
                        </li>`
            }
            this.main.html(html);
            this.itemHeight()
            var cart = new ShoppingCar();
            cart.init({
                btn: '.cart',
                box: '.goods_list',
                icon: '.shopping_car i',
                Num: '.shopping_car sup'
            });
        },
        usePagination() {
            $('#pagination').pagination({
                coping: true,
                prevContent: '上一页',
                nextContent: '下一页',
                jump: true,
                jumpBtn: '确认',
                totalData: this.total,
                showData: this.pageNum,
                callback: function(api) {
                    this.page = api.getCurrent();
                    this.renderPage();
                }.bind(this)
            });
        },
        itemHeight() {
            var height = this.main[0].offsetHeight;
            this.item.css('height', height);
        }
    })
    var pagination = new Pagination();
    pagination.init();

    function ShoppingCar() {};
    $.extend(ShoppingCar.prototype, {
        init(opts) {
            this.main = $(opts.box);
            this.carIcon = $(opts.icon);
            this.btn = $(opts.btn);
            this.Num = $(opts.Num);
            this.loadJson()
                .then(function(res) {
                    this.json = res.skus;
                })
            this.bindEvent();
            this.showNum();
        },
        loadJson() {
            var opt = {
                url: 'scripts/data.json',
                context: this
            };
            return $.ajax(opt);
        },
        bindEvent() {
            this.btn.on('click', this.addCar.bind(this));
            this.carIcon.on("mouseenter", this.showCar.bind(this))
            this.carIcon.on("mouseleave", this.hideCar.bind(this))
            this.carIcon.on("click", this.clearCar.bind(this))
        },
        addCar(event) {
            var target = event.target;
            var goodsId = $(target).parent().attr('data-id');
            var cookies;
            if (!(cookie = $.cookie("shopCar")) || cookie == "[]") {
                $.cookie("shopCar", `[{"id":${goodsId},"num":1}]`);
                this.showNum();
                return 0;
            }
            var cookieArray = JSON.parse(cookie);
            var flag = false;
            for (var i = 0; i < cookieArray.length; i++) {
                if (cookieArray[i].id == goodsId) {
                    flag = true;
                    cookieArray[i].num++;
                }
            }
            if (flag == false) {
                cookieArray.push({
                    id: goodsId,
                    num: 1
                });
            }
            $.cookie("shopCar", JSON.stringify(cookieArray));
            this.showNum();
        },
        showCar() {
            var cookie;
            if (!(cookie = $.cookie("shopCar"))) {
                return 0;
            }
            var cookieArray = JSON.parse(cookie);
            var html = "";
            for (var i = 0; i < cookieArray.length; i++) {
                var item = this.getItem(cookieArray[i].id);
                html += `<li>
                            <p>${item.sku_name}</p>
                            <span>${cookieArray[i].num}</span>
                        </li>`;
            }
            this.main.html(html);
        },
        getItem(id) {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i].id == id) {
                    return this.json[i];
                }
            }
        },
        hideCar() {
            this.main.children().remove();
        },
        clearCar() {
            var flag = confirm("是否清空购物车?");
            if (flag) {
                $.cookie("shopCar", "");
                this.hideCar();
            }
            this.showNum()
        },
        showNum() {
            var cookie;
            if (!(cookie = $.cookie("shopCar"))) {
                this.Num.html(0)
                return 0;
            }
            var cookieArray = JSON.parse($.cookie("shopCar"));
            var sum = 0;
            for (var i = 0; i < cookieArray.length; i++) {
                sum += Number(cookieArray[i].num);
            }

            this.Num.html(sum);
        }
    })

})