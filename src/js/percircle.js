var $ = require('jquery');
require('../css/percircle.less');

"use strict";

$.fn.percircle = function (options) {
  // track views for on view option
  var percircleOnView = [];

  // default options
  var defaultOptions = {
    animate: true,
  };

  // extend with any provided options
  var localOptions = $.extend({}, defaultOptions, options);

  var rotationMultiplier = 3.6;

  // scroll event for on view
  $(window).scroll(function (e) {
    $.each(percircleOnView, function (i, el) {
      if (!el.completed) {
        if (inViewport(el.instance)) {
          el.completed = true;
          $(el.instance).percircle(el.options);
        }
      }
    });
  });

  // for each element matching selector
  return this.each(function () {
    /*
        If it is about dynamic value update, ensure the filling of the bar will start from 0 degrees.
        Without this line, if it as about a dynamic update from a value > 50 to a value < 50, the bar
        filling will start from 180 degrees.
        However, this fix is not the best one, UX-wise, since user loses the gradual degredation of the bar.
        The way this should be best implemented is to perform a smooth animation from > 50deg back to the
        requested value, instead of first moving to 0deg and then "drawing" again.
      */
    if ($(this).hasClass('gt50')) $(this).removeClass('gt50');

    var percircle = $(this);
    var isUpdate = false;

    if (!percircle.data('initialised')) {
      percircle.data('initialised', true);
    } else {
      isUpdate = true;
    }

    var progressBarStyle = {};

    // When user tries adding a custom progress bar color, the text color should be updated as well.
    var changeTextColor = function (context, color) {
      // Change color text the same with progress bar color
      percircle.on('mouseover', function () {
        context.children('span').css('color', color);
      });

      percircle.on('mouseleave', function () {
        context.children('span').attr('style', '');
      });
    };

    // add percircle class for styling
    if (!percircle.hasClass('percircle')) percircle.addClass('percircle');
    // apply options
    if (typeof (percircle.attr('data-animate')) !== 'undefined') localOptions.animate = percircle.attr('data-animate') == 'true';
    if (localOptions.animate) percircle.addClass('animate');
    if (typeof (percircle.attr('data-animateOnView')) !== 'undefined') localOptions.animateOnView = percircle.attr('data-animateOnView') == 'true';

    if (typeof (percircle.attr('data-progressBarColor')) !== 'undefined') {
      localOptions.progressBarColor = percircle.attr('data-progressBarColor');
    }
    progressBarStyle = {
      'border-color': localOptions.progressBarColor
    }
    changeTextColor($(this), localOptions.progressBarColor);

    var percent = percircle.attr('data-percent') || localOptions.percent || 0;
    var perclock = percircle.attr('data-perclock') || localOptions.perclock || 0;
    var perdown = percircle.attr('data-perdown') || localOptions.perdown || 0;

    var animateOnView = localOptions.animate && localOptions.animateOnView && !inViewport(this);

    if (animateOnView && !isUpdate) {
      percircleOnView.push({
        instance: this,
        options: localOptions
      });
      percent = 0;
    }
    if (percent || localOptions.displayTextAtZero) {
      if (percent > 50) percircle.addClass('gt50');
      var text = percircle.attr('data-text') || localOptions.text || percent + '%';
      percircle.html('<span>' + text + '</span>');

      // add divs for structure
      $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(percircle);
      $('.slice .bar, .slice .fill', percircle).css(progressBarStyle);

      if (percent > 50)
        $('.bar', percircle).css({
          '-webkit-transform': 'rotate(180deg)',
          '-moz-transform': 'rotate(180deg)',
          '-ms-transform': 'rotate(180deg)',
          '-o-transform': 'rotate(180deg)',
          'transform': 'rotate(180deg)'
        });
      var rotationDegrees = rotationMultiplier * percent;
      // set timeout causes the animation to be visible on load
      setTimeout(function () {
        $('.bar', percircle).css({
          '-webkit-transform': 'rotate(' + rotationDegrees + 'deg)',
          '-moz-transform': 'rotate(' + rotationDegrees + 'deg)',
          '-ms-transform': 'rotate(' + rotationDegrees + 'deg)',
          '-o-transform': 'rotate(' + rotationDegrees + 'deg)',
          'transform': 'rotate(' + rotationDegrees + 'deg)'
        });
      }, 0);
    } else if (perclock && !isUpdate) {
      if (!percircle.hasClass('perclock')) percircle.addClass('perclock');

      setInterval(function () {
        var d = new Date(); // without params it defaults to "now"
        var text = getPadded(d.getHours()) + ":" + getPadded(d.getMinutes()) + ":" + getPadded(d.getSeconds());

        percircle.html('<span>' + text + '</span>');
        // add divs for structure
        $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>')
          .css(progressBarStyle)
          .appendTo(percircle);

        var seconds = d.getSeconds();
        if (seconds === 0) percircle.removeClass('gt50');
        if (seconds > 30) {
          percircle.addClass('gt50');
          $('.bar', percircle).css({
            '-webkit-transform': 'rotate(180deg);scale(1,3)',
            '-moz-transform': 'rotate(180deg);scale(1,3)',
            '-ms-transform': 'rotate(180deg);scale(1,3)',
            '-o-transform': 'rotate(180deg);scale(1,3)',
            'transform': 'rotate(180deg);scale(1,3)'
          });
        }

        var rotationDegrees = 6 * seconds; // temporary clockwise rotation value
        $('.bar', percircle).css({
          '-webkit-transform': 'rotate(' + rotationDegrees + 'deg)',
          '-moz-transform': 'rotate(' + rotationDegrees + 'deg)',
          '-ms-transform': 'rotate(' + rotationDegrees + 'deg)',
          '-o-transform': 'rotate(' + rotationDegrees + 'deg)',
          'transform': 'rotate(' + rotationDegrees + 'deg)'
        });
      }, 1000);
    } else if (perdown && !isUpdate) {
      getCountdown(percircle, localOptions, progressBarStyle);
    }
  });
};

// move to another file - functions
var inViewport = function(el) {
  var elementTop = $(el).offset().top+$(el).height();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementTop < viewportBottom;
}

var getCountdown = function (percircle, options, progressBarStyle) {
  var secs = percircle.attr('data-secs') || options.secs;
  var timeUpText = percircle.attr('data-timeUpText') || options.timeUpText;
  var reset = percircle[0].hasAttribute('data-reset') || options.reset;

  if (timeUpText.length > 8) timeUpText = 'the end';

  var counter;

  if (reset) {
    percircle.on("click", timerReset);
  }

  function timer() {
    secs -= 1;

    if (secs > 30) percircle.addClass('gt50');
    if (secs < 30) percircle.removeClass('gt50');

    timerUpdate();

    if (secs <= 0) {
      timerStop();
      percircle.html('<span>' + timeUpText + '</span>');
      return;
    }
  }

  function timerStart() {
    counter = setInterval(timer, 1000);
  }

  function timerStop() {
    clearInterval(counter);
  }

  function timerReset() {
    timerStop();

    secs = options.secs;
    timerUpdate();

    timerStart();
  }

  function timerUpdate() {
    percircle.html('<span>' + secs + '</span>');
    // add divs for structure
    $('<div class="slice"><div class="bar"></div><div class="fill"></div></div>')
      .css(progressBarStyle)
      .appendTo(percircle);

    var rotationDegrees = 6 * secs; // temporary clockwise rotation value
    $('.bar', percircle).css({
      '-webkit-transform': 'rotate(' + rotationDegrees + 'deg)',
      '-moz-transform': 'rotate(' + rotationDegrees + 'deg)',
      '-ms-transform': 'rotate(' + rotationDegrees + 'deg)',
      '-o-transform': 'rotate(' + rotationDegrees + 'deg)',
      'transform': 'rotate(' + rotationDegrees + 'deg)'
    });
  }

  // Initialize timer
  timerStart();
};

// display a presentable format of current time
var getPadded = function (val) {
  return val < 10 ? ('0' + val) : val;
};
