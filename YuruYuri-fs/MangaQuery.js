// JavaScript Document$(function() {
    $('.img-gallery').each(function() {
        var w = $(this).data("width"),
            h = $(this).data("height"),
            viewport = $('html, body'),
            fadeSpeed = 400, // Kecepatan efek fading
            resizeSpeed = 600; // Kecepatan efek pelebaran/penyusutan
        $(this).addClass('img-nav').wrap('<div class="img-show" style="width:' + w + 'px;"></div>');
        var $firstNav = $('li:first a', this),
            current = $firstNav.attr('href'),
            $parent = $(this).parents('.img-show');
        $firstNav.addClass('active');
        $parent.prepend('<div class="img-holder" style="height:' + h + 'px;"></div>');
        $parent.find('.img-holder').addClass('loading').html('<img class="transparent" src="' + current + '" alt="Loading..."/>');
        $parent.find('img.transparent').css('opacity', 0).load(function() {
            $parent.animate({width:$(this).width()}, resizeSpeed).find('.img-holder').animate({height:$(this).height()}, resizeSpeed, function() {
                $(this).removeClass('loading').find('img').animate({opacity:1}, fadeSpeed);
            });
        });
        
        $('a', this).each(function(i) {
            i = i+1;
            $(this).attr("title", $(this).text());
            $(this).html(i);
        }).on("click", function() {
            var $activeNav = $(this).parents('.img-gallery').find('a.active'),
                $activeParent = $(this).parents('.img-show');
            $activeNav.removeClass('active');
            viewport.scrollTop($activeParent.offset().top-40);
            $(this).addClass('active').parents('.img-show').find('.img-holder').html('<img class="transparent" src="' + this.href + '" alt="Loading..."/>');
            $parent.find('.img-holder').addClass('loading').find('img.transparent').css('opacity', 0).load(function() {
                $parent.animate({width:$(this).width()}, resizeSpeed).find('.img-holder').animate({height:$(this).height()}, resizeSpeed, function() {
                    $(this).removeClass('loading').find('img').animate({opacity:1}, fadeSpeed);
                });
            });
            return false;
        });

    });