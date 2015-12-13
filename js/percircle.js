(function($) {
    $.fn.percircle = function(options) {
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
            var percircle = $(this);
            // add percircle class for styling
            if (!percircle.hasClass('percircle')) percircle.addClass('percircle');
            // apply options
            if (typeof(percircle.attr('data-animate')) !== 'undefined') options.animate = percircle.attr('data-animate') == 'true';
            if (options.animate) percircle.addClass('animate');
            var percent = percircle.attr('data-percent') || options.percent || 0;
            if (percent > 50) percircle.addClass('gt50');
            var text = percircle.attr('data-text') || options.text || percent + '%';
            $('<span>'+text+'</span>').appendTo(percircle);
            // add divs for structure
            $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(percircle);
            if (percent > 50)
            $('.bar', percircle).css({
              '-webkit-transform' : 'rotate(180deg)',
              '-moz-transform'    : 'rotate(180deg)',
              '-ms-transform'     : 'rotate(180deg)',
              '-o-transform'      : 'rotate(180deg)',
              'transform'         : 'rotate(180deg)'
            });
            var rotationDegrees = rotationMultiplier * percent;
            // set timeout causes the animation to be visible on load
            setTimeout(function(){
                $('.bar', percircle).css({
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