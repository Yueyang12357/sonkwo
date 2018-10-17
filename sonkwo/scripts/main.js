$('header').load('main.html .header');
$('aside').load('main.html .aside_box');
$('footer').load('main.html .footer');
$(function() {
    $('#backtop').on('click', function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollTop = 0;
    })
})