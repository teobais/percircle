(function($) {
    $.fn.perCircle = function(options) {
        // default options
        var defaultOptions = {
            animate: true
        };
        
        // extend with any provided options
        if (!options) options = {};
        $.extend(options, defaultOptions);
        
        var rotationMultiplier = 3.6;
        
        // for each element matching selector
        return this.each(function(){
            var perCircle = $(this);
            // add percircle class for styling
            if (!perCircle.hasClass('percircle')) perCircle.addClass('percircle');
            // apply options
            if (typeof(perCircle.attr('data-animate')) !== 'undefined') options.animate = perCircle.attr('data-animate') == 'true';
            if (options.animate) perCircle.addClass('animate');
            var percent = perCircle.attr('data-percent') || options.percent || 0;
            if (percent > 50) perCircle.addClass('gt50');
            var text = perCircle.attr('data-text') || options.text || percent + '%';
            $('<span>'+text+'</span>').appendTo(perCircle);
            // add divs for structure
            $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(perCircle);
            if (percent > 50)
            $('.bar', perCircle).css({
              '-webkit-transform' : 'rotate(180deg)',
              '-moz-transform'    : 'rotate(180deg)',
              '-ms-transform'     : 'rotate(180deg)',
              '-o-transform'      : 'rotate(180deg)',
              'transform'         : 'rotate(180deg)'
            });
            var rotationDegrees = rotationMultiplier * percent;
            // set timeout causes the animation to be visible on load
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