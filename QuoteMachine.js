var colors = ["#1abc9c", "#2ecc71", "#16a085", "#f39c12", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#95a5a6", "#7f8c8d", "#34495e", "#2c3e50"]
var currentQuote = "";
var currentAuthor = "";
function getNewColor() {
    var randNum = Math.floor(Math.random()*colors.length);
    return colors[randNum];
}
function getQuote() {
    $.ajax({
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
        accepts: {
            json: 'application/json'
        },
        contentType: 'Content-Type: application/x-www-form-urlencoded',
        dataType: 'json',
        headers: {
            'X-Mashape-Key': '30JmGa6iDRmsh1Nqraso24oTBaxtp1Dorxsjsn0lgUKqOL9EQC'
        },
        success: function(result) {
            $(".quote-change").fadeOut(500, function() {
                $('#quote-text').text(result.quote);
                $('#quote-author').text("-" + result.author);
                currentQuote = result.quote;
                currentAuthor = result.author;
            }).fadeIn(500);
            $(function () {
                var newColor = getNewColor();
                $('.color-change-background').animate({backgroundColor: newColor}, {duration: 1000, queue: false});
                $('.color-change-text').animate({color: newColor}, {duration: 1000, queue: false});
            });
        }
    });
}
function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}
function branchFunc() {
    getQuote();
}
function linkFunc() {
    var linkValue = "http://twitter.com/home/?status=";
    linkValue += '"' + currentQuote + '" - ' + currentAuthor;
    var win = window.open(linkValue, '_blank');
    if(win){
        win.focus();
    }else{
        alert('Please allow popups for this site');
    }
}
$.ajax({
     url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
    accepts: {
        json: 'application/json'
    },
    contentType: 'Content-Type: application/x-www-form-urlencoded',
    dataType: 'json',
    headers: {
        'X-Mashape-Key': '30JmGa6iDRmsh1Nqraso24oTBaxtp1Dorxsjsn0lgUKqOL9EQC'
     },
    success: function(result) {
        $('#quote-text').text(result.quote);
        $('#quote-author').text("-" + result.author);
        currentQuote = result.quote;
        currentAuthor = result.author;
    }
});
$(document).ready(function () {
    $('#quote-button').click(branchFunc);
    $(function() {
        var colorRGB = $(".color-change-background").css('backgroundColor');
        $('.btn').hover(function() {
            colorRGB = $(".color-change-background").css('backgroundColor');
            var lightColor = shadeRGBColor(colorRGB, .2);
            $(this).css("background-color", lightColor);
        }, function(){
            $(this).css("background-color", colorRGB);
        });
    });
    $('#tweet-button').click(linkFunc);
});
