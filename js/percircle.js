(function($) {
    $.fn.perCircle = function(options) {
        // Do your awesome plugin stuff here
        var defaultOptions = {
            animate: true
        };
        
        if (!options) options = {};
        
        $.extend(options, defaultOptions);
        
        var rotationMultiplier = 3.6;
        // For each div that its id ends with "circle", do the following.
        return this.each(function(){
            var perCircle = $(this);
            if (!perCircle.hasClass('percircle')) perCircle.addClass('percircle');
            if (typeof(perCircle.attr('data-animate')) !== 'undefined') options.animate = perCircle.attr('data-animate') == 'true';
            if (options.animate) perCircle.addClass('animate');
            var percent = perCircle.attr('data-percent') || options.percent || 0;
            if (percent > 50) perCircle.addClass('gt50');
            var text = perCircle.attr('data-text') || options.text || percent + '%';
            $('<span>'+text+'</span>').appendTo(perCircle);
            $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(perCircle);
            if (percent > 50)
            $('.bar', perCircle).css({
              '-webkit-transform' : 'rotate(' + 180 + 'deg)',
              '-moz-transform'    : 'rotate(' + 180 + 'deg)',
              '-ms-transform'     : 'rotate(' + 180 + 'deg)',
              '-o-transform'      : 'rotate(' + 180 + 'deg)',
              'transform'         : 'rotate(' + 180 + 'deg)'
            });
            var rotationDegrees = rotationMultiplier * percent;
            setTimeout(function(){
                $('.bar', perCircle).css({
                  '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
                  '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
                  '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
                  '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
                  'transform'         : 'rotate(' + rotationDegrees + 'deg)'
                });
            }, 0);
        });
    };
})(jQuery);