(function($) {
    $.fn.perCircle = function(options) {
        // default options
        var defaultOptions = {
            animate: true,
            borderColor: '#307bbb',
            textColor: '#307bbb',
            backgroundColor: '#fff'
        };

        // extend with any provided options
        if (!options) options = {};
        $.extend(defaultOptions, options);

        var rotationMultiplier = 3.6;

        // for each element matching selector
        return this.each(function(){
            var perCircle = $(this);
            // add percircle class for styling
            if (!perCircle.hasClass('percircle')) perCircle.addClass('percircle');
						// add divs for structure
            $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(perCircle);

						// apply options
            if (typeof(perCircle.attr('data-animate')) !== 'undefined') options.animate = perCircle.attr('data-animate') == 'true';
            if (options.animate) perCircle.addClass('animate');
            var percent = perCircle.attr('data-percent') || options.percent || 0;

            //Apply border color
            var borderColor = perCircle.data('border-color') || options.borderColor;
            if (percent > 50) {
              perCircle.addClass('gt50');
              perCircle.css('border-color', borderColor);
            }
            perCircle.find('.bar, .fill').css('border-color', borderColor);

            //Add text and apply text color
            var text = perCircle.attr('data-text') || options.text || percent + '%';
            $('<span>'+text+'</span>').appendTo(perCircle);
            var span = perCircle.find('span');
            var textColor = perCircle.data('text-color') || options.textColor;
            perCircle.hover(
              function(){
                  span.css('color', textColor);
              },
              function(){
                  span.css('color', '');
              }
            );

            //Add child element to apply background color
            var after = $('<div class="after"></div>');
            after.appendTo(perCircle);
            var backgroundColor = perCircle.data('background-color') || options.backgroundColor;
            after.css('background-color', backgroundColor);

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
