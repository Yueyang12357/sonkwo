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
                    console.log(this.total)
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
                            <a href="#">
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
                                <p class="item_price">￥${this.json.list_price}</p>
                            </a>
                        </li>`
            }
            this.main.html(html);
            this.itemHeight()
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
})