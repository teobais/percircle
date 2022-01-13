<template>
  <div
    :class="['percircle', { animate, gt50, perclock, initialized: ready }]"
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
      default: 0,
    },

    //Text to display in circle
    text: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      hovering: false,
      //Set progress bar to 0 initially to trigger transition
      initialized: false,
      ready: false,
      clockInterval: null,
      date: new Date(),
    };
  },

  computed: {
    renderedPercent() {
      if (!this.initialized) {
        return 0;
      }

      return this.percent;
    },

    gt50() {
      let result = false;

      if (this.perclock) {
        result = this.date.getSeconds() > 30;
      } else if (this.renderedPercent || this.displayTextAtZero) {
        result = this.renderedPercent > 50;
      }

      return result;
    },

    displayText() {
      let text = this.text;

      if (this.perclock) {
        text =
          this.getPadded(this.date.getHours()) +
          ":" +
          this.getPadded(this.date.getMinutes()) +
          ":" +
          this.getPadded(this.date.getSeconds());
      } else if (this.renderedPercent || this.displayTextAtZero) {
        text = text || `${this.percent}%`;
      }

      return text;
    },

    textColor() {
      return this.hovering ? this.progressBarColor : "";
    },

    rotationDegrees() {
      if (this.perclock) {
        return 6 * this.date.getSeconds();
      }

      return 3.6 * this.renderedPercent;
    },
  },

  mounted() {
    setTimeout(() => {
      //Display start up animation
      this.initialized = true;

      setTimeout(() => {
        this.ready = true;
      }, 250);
    }, 0);
  },

  watch: {
    perclock: {
      immediate: true,
      handler(val) {
        if (val) {
          this.setClockInterval();
        } else {
          this.deleteClockInterval();
        }
      },
    },
  },

  methods: {
    setClockInterval() {
      this.clockInterval = setInterval(() => {
        this.date = new Date();
      }, 1000);
    },

    deleteClockInterval() {
      if (this.clockInterval) {
        clearInterval(this.clockInterval);
      }

      this.clockInterval = null;
    },

    // init: function (options) {
    //   // for each element matching selector
    //   return this.each(function () {

    //     if (perdown) {
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

    // display a presentable format of current time
    getPadded(val) {
      return val < 10 ? "0" + val : val;
    },

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
  margin: 0 auto;
  background: transparent;

  *,
  *:before {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  &.animate {
    .bar {
      transition: transform 0.2s ease-in-out;
    }

    & > span {
      transition: color 0.2s ease-in-out;
    }
  }

  & > span {
    position: absolute;
    z-index: 1;
    width: 100%;
    top: 50%;
    height: 1em;
    display: block;
    text-align: center;
    white-space: nowrap;
    font-size: 0.2em;
    margin-top: -0.5em;
    color: rgba(52, 59, 62, 0.5);
  }

  &:before {
    content: "";
    border-radius: 50%;
    border: solid rgba(0, 0, 0, 0.1);
    position: absolute;
  }

  .slice {
    position: absolute;
    width: 1em;
    height: 1em;
    clip: rect(0, 1em, 1em, 0.5em);
  }

  &:hover {
    cursor: default;

    &:before,
    .bar,
    .fill {
      border-width: 0.04em;
    }

    & > span {
      -webkit-transform: scale(1.3);
      -moz-transform: scale(1.3);
      -ms-transform: scale(1.3);
      -o-transform: scale(1.3);
      transform: scale(1.3);
      color: #307bbb;
    }
  }

  &:before,
  .bar,
  .fill {
    border-width: 0.08em;
    width: 1em;
    height: 1em;
    box-sizing: border-box;
  }

  .fill {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}

.initialized.percircle.gt50 .slice {
  clip: rect(auto, auto, auto, auto);
}

.percircle .bar,
.gt50 .fill {
  position: absolute;
  border: 0.08em solid #307bbb;
  clip: rect(0, 0.5em, 1em, 0);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}

.bar {
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.perclock > span {
  font-size: 0.175em;
}
</style>
