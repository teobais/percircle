var j = jQuery.noConflict();
j(document).ready(function () {
	var rotationMultiplier = 3.6;
	// For each div that its id ends with "circle", do the following.
	j('div.c100').each(function() {
        var dataPercent = j(this).attr('data-percent') || 0;
        if (dataPercent > 50) j(this).addClass("gt50");
        var dataText = j(this).attr('data-text') || dataPercent + '%';
        j('<span>'+dataText+'</span>').appendTo(this);
        j('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(this);
        var rotationDegrees = rotationMultiplier*dataPercent;
        j('.bar', this).css({
          '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
          '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
          '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
          '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
          'transform'         : 'rotate(' + rotationDegrees + 'deg)'
        });
    });
});
