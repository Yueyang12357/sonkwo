$(function() {
    function LoadJson() {}
    $.extend(LoadJson.prototype, {
        init(opts) {
            this.main = $(opts.box);
            this.url = opts.url;
            this.tags = opts.tags;
            this.loadJson()
                .then(function(res) {
                    this.json = res.skus;
                    console.log(this.json);
                    // this.renderPage();
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
    var loadJson = new LoadJson();
    loadJson.init({
        url: '/scripts/data.json'
    })
})