<template>
  <div
    :class="['percircle', { animate, dark, gt50 }]"
    @mouseenter="startHover"
    @mouseleave="stopHover"
  >
    <span :style="{ color: textColor }">{{ displayText }}</span>
    <div class="slice">
      <div
        class="bar"
        :style="{
          'border-color': progressBarColor,
          transform: `rotate(${rotationDegrees}deg)`,
        }"
      ></div>
      <div
        class="fill"
        :style="{
          'border-color': progressBarColor,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //Whether to animate the progress bar on load (or view)
    animate: {
      type: Boolean,
      default: true,
    },

    //Display a clock in the percircle
    perclock: {
      type: Boolean,
      default: false,
    },

    //Display a countdown in the percircle
    perdown: {
      type: Boolean,
      default: false,
    },

    //The amount of seconds to countdown.
    secs: {
      type: Number,
      default: 15,
    },

    //Text to display when countdown has completed.
    timeUpText: {
      type: String,
      default: "Complete!",
    },

    //Whether to reset the countdown on percircle click
    resetOnClick: {
      type: Boolean,
      default: false,
    },

    //Whether to display text even when the percentage is 0
    displayTextAtZero: {
      type: Boolean,
      default: true,
    },

    //The wrapper class, generally used for setting colors.
    //Available options:
    //red, blue, green, purple, yellow, pink
    //Can also be an inline color
    progressBarColor: {
      type: String,
      default: "#A6CE39",
    },

    //How full the bar is
    percent: {
      type: Number,
      default: "0",
    },

    //Text to display in circle
    text: {
      type: String,
      default: "",
    },

    //Dark background
    dark: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      hovering: false,
    };
  },

  computed: {
    gt50() {
      let result = false;

      if (this.percent || this.displayTextAtZero) {
        result = this.percent > 50;
      }

      return result;
    },

    displayText() {
      let text = this.text;

      if (this.percent || this.displayTextAtZero) {
        text = text || `${this.percent}%`;
      }

      return text;
    },

    textColor() {
      return this.hovering ? this.progressBarColor : "";
    },

    rotationDegrees() {
      return 3.6 * this.percent;
    },
  },

  methods: {
    // init: function (options) {
    //   var rotationMultiplier = 3.6;

    //   // for each element matching selector
    //   return this.each(function () {
    //     if (percent || options.displayTextAtZero) {
    //       if (percent > 50)
    //         $(".bar", percircle).css({
    //           "-webkit-transform": "rotate(180deg)",
    //           "-moz-transform": "rotate(180deg)",
    //           "-ms-transform": "rotate(180deg)",
    //           "-o-transform": "rotate(180deg)",
    //           transform: "rotate(180deg)",
    //         });
    //       var rotationDegrees = rotationMultiplier * percent;
    //       // set timeout causes the animation to be visible on load
    //       setTimeout(function () {
    //         $(".bar", percircle).css({
    //           "-webkit-transform": "rotate(" + rotationDegrees + "deg)",
    //           "-moz-transform": "rotate(" + rotationDegrees + "deg)",
    //           "-ms-transform": "rotate(" + rotationDegrees + "deg)",
    //           "-o-transform": "rotate(" + rotationDegrees + "deg)",
    //           transform: "rotate(" + rotationDegrees + "deg)",
    //         });
    //       }, 0);
    //     } else if (perclock) {
    //       if (!percircle.hasClass("perclock")) percircle.addClass("perclock");

    //       setInterval(function () {
    //         var d = new Date(); // without params it defaults to "now"
    //         var text =
    //           getPadded(d.getHours()) +
    //           ":" +
    //           getPadded(d.getMinutes()) +
    //           ":" +
    //           getPadded(d.getSeconds());

    //         percircle.html("<span>" + text + "</span>");
    //         // add divs for structure
    //         $(
    //           '<div class="slice"><div class="bar" ' +
    //             progressBarColor +
    //             '></div><div class="fill" ' +
    //             progressBarColor +
    //             "></div></div>"
    //         ).appendTo(percircle);

    //         var seconds = d.getSeconds();
    //         if (seconds === 0) percircle.removeClass("gt50");
    //         if (seconds > 30) {
    //           percircle.addClass("gt50");
    //           $(".bar", percircle).css({
    //             "-webkit-transform": "rotate(180deg);scale(1,3)",
    //             "-moz-transform": "rotate(180deg);scale(1,3)",
    //             "-ms-transform": "rotate(180deg);scale(1,3)",
    //             "-o-transform": "rotate(180deg);scale(1,3)",
    //             transform: "rotate(180deg);scale(1,3)",
    //           });
    //         }

    //         var rotationDegrees = 6 * seconds; // temporary clockwise rotation value
    //         $(".bar", percircle).css({
    //           "-webkit-transform": "rotate(" + rotationDegrees + "deg)",
    //           "-moz-transform": "rotate(" + rotationDegrees + "deg)",
    //           "-ms-transform": "rotate(" + rotationDegrees + "deg)",
    //           "-o-transform": "rotate(" + rotationDegrees + "deg)",
    //           transform: "rotate(" + rotationDegrees + "deg)",
    //         });
    //       }, 1000);
    //     } else if (perdown) {
    //       getCountdown(percircle, options, progressBarColor);
    //     }
    //   });
    // },
    // getCountdown(percircle, options, progressBarColor) {
    //   var secs = percircle.attr("data-secs") || options.secs;
    //   var timeUpText = percircle.attr("data-timeUpText") || options.timeUpText;
    //   var reset = percircle[0].hasAttribute("data-reset") || options.reset;

    //   if (timeUpText.length > 8) timeUpText = "the end";

    //   var counter;

    //   if (reset) {
    //     percircle.on("click", timerReset);
    //   }

    //   function timer() {
    //     secs -= 1;

    //     if (secs > 30) percircle.addClass("gt50");
    //     if (secs < 30) percircle.removeClass("gt50");

    //     timerUpdate();

    //     if (secs <= 0) {
    //       timerStop();
    //       percircle.html("<span>" + timeUpText + "</span>");
    //       return;
    //     }
    //   }

    //   function timerStart() {
    //     counter = setInterval(timer, 1000);
    //   }

    //   function timerStop() {
    //     clearInterval(counter);
    //   }

    //   function timerReset() {
    //     timerStop();

    //     secs = options.secs;
    //     timerUpdate();

    //     timerStart();
    //   }

    //   function timerUpdate() {
    //     percircle.html("<span>" + secs + "</span>");
    //     // add divs for structure
    //     $(
    //       '<div class="slice"><div class="bar" ' +
    //         progressBarColor +
    //         '></div><div class="fill" ' +
    //         progressBarColor +
    //         "></div></div>"
    //     ).appendTo(percircle);

    //     var rotationDegrees = 6 * secs; // temporary clockwise rotation value
    //     $(".bar", percircle).css({
    //       "-webkit-transform": "rotate(" + rotationDegrees + "deg)",
    //       "-moz-transform": "rotate(" + rotationDegrees + "deg)",
    //       "-ms-transform": "rotate(" + rotationDegrees + "deg)",
    //       "-o-transform": "rotate(" + rotationDegrees + "deg)",
    //       transform: "rotate(" + rotationDegrees + "deg)",
    //     });
    //   }

    //   // Initialize timer
    //   timerStart();
    // },

    // // display a presentable format of current time
    // getPadded(val) {
    //   return val < 10 ? "0" + val : val;
    // },

    startHover() {
      this.hovering = true;
    },

    stopHover() {
      this.hovering = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.percircle {
  position: relative;
  font-size: 120px;
  width: 1em;
  height: 1em;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  float: left;
  margin: 0 0.1em 0.1em 0;
  background-color: #cccccc;

  *,
  *:before,
  *:after {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  &.animate > span,
  &.animate:after {
    -webkit-transition: -webkit-transform 0.2s ease-in-out;
    -moz-transition: -moz-transform 0.2s ease-in-out;
    -ms-transition: -ms-transform 0.2s ease-in-out;
    -o-transition: -o-transform 0.2s ease-in-out;
    transition: transform 0.2s ease-in-out;

    .bar {
      -webkit-transition: -webkit-transform 0.6s ease-in-out;
      -moz-transition: -moz-transform 0.6s ease-in-out;
      -ms-transition: -ms-transform 0.6s ease-in-out;
      -o-transition: -o-transform 0.6s ease-in-out;
      transition: transform 0.6s ease-in-out;
    }
  }

  &.center {
    float: none;
    margin: 0 auto;
  }

  & > span {
    position: absolute;
    z-index: 1;
    width: 100%;
    top: 50%;
    height: 1em;
    margin-top: -0.5em;
    font-size: 0.2em;
    color: #cccccc;
    display: block;
    text-align: center;
    white-space: nowrap;
  }

  &:after {
    position: absolute;
    top: 0.08em;
    left: 0.08em;
    display: block;
    content: " ";
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    background-color: #f5f5f5;
    width: 0.84em;
    height: 0.84em;
  }

  .slice {
    position: absolute;
    width: 1em;
    height: 1em;
    clip: rect(0, 1em, 1em, 0.5em);
  }

  &:hover {
    cursor: default;
  }

  &:hover > span {
    -webkit-transform: scale(1.3);
    -moz-transform: scale(1.3);
    -ms-transform: scale(1.3);
    -o-transform: scale(1.3);
    transform: scale(1.3);
    color: #307bbb;
  }

  &:hover:after {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }

  &.dark {
    background-color: #777777;

    & > span {
      color: #ffffff;
    }
  }
}

.rect-auto,
.percircle.gt50 .slice {
  clip: rect(auto, auto, auto, auto);
}

.pie,
.percircle .bar,
.gt50 .fill {
  position: absolute;
  border: 0.08em solid #307bbb;
  width: 0.84em;
  height: 0.84em;
  clip: rect(0, 0.5em, 1em, 0);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}

.bar {
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.pie-fill,
.gt50 .bar:after,
.gt50 .fill {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}

.perclock > span {
  font-size: 0.175em;
}
</style>
