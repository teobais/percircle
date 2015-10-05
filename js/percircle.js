var j = jQuery.noConflict();
j(document).ready(function () {
	var rotationMultiplier = 3.6;
	// For each div that its id ends with "circle", do the following.
	j('div.c100').each(function() {
        var percircle = this;
        var dataPercent = j(percircle).attr('data-percent') || 0;
        if (dataPercent > 50) j(percircle).addClass("gt50");
        var dataText = j(percircle).attr('data-text') || dataPercent + '%';
        j('<span>'+dataText+'</span>').appendTo(percircle);
        j('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(percircle);
        if (dataPercent > 50)
        j('.bar', percircle).css({
          '-webkit-transform' : 'rotate(' + 180 + 'deg)',
          '-moz-transform'    : 'rotate(' + 180 + 'deg)',
          '-ms-transform'     : 'rotate(' + 180 + 'deg)',
          '-o-transform'      : 'rotate(' + 180 + 'deg)',
          'transform'         : 'rotate(' + 180 + 'deg)'
        });
        var rotationDegrees = rotationMultiplier*dataPercent;
        setTimeout(function(){
            j('.bar', percircle).css({
              '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
              '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
              '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
              '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
              'transform'         : 'rotate(' + rotationDegrees + 'deg)'
            });
        }, 1);
    });
});
