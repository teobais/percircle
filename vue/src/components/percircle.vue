<template>
  <div
    :class="[
      'percircle',
      { animate, gt50: addGt50, perclock, perdown, initialized: ready },
    ]"
    @mouseenter="startHover"
    @mouseleave="stopHover"
    @click="timerReset"
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
      default: "Done!",
    },

    //Whether to reset the countdown on percircle click
    resetOnClick: {
      type: Boolean,
      default: true,
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
      secsRemaining: this.secs,
      timerInterval: null,
      addGt50: false,
      gt50RenderTimeout: null,
    };
  },

  computed: {
    renderedPercent() {
      if (!this.initialized) {
        return 0;
      }

      return this.percent > 100 ? 100 : this.percent < 0 ? 0 : this.percent;
    },

    gt50() {
      let result = false;

      if (this.perclock) {
        result = this.date.getSeconds() > 30;
      } else if (this.perdown) {
        result = this.secsRemaining > 30;
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
      } else if (this.perdown) {
        if (this.secsRemaining <= 0) {
          text = this.timeUpText;
        } else {
          text = this.secsRemaining;
        }
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
      } else if (this.perdown) {
        return 6 * this.secsRemaining;
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
      }, 150);
    }, 0);
  },

  beforeDestroy() {
    this.deleteClockInterval();
    this.deleteTimerInterval();
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

    perdown: {
      immediate: true,
      handler(val) {
        if (val) {
          this.setTimerInterval();
        } else {
          this.deleteTimerInterval();
        }
      },
    },

    gt50: {
      immediate: true,
      handler(val) {
        //Handling the annoying flip between gt50's styles
        //Could probably be improved if the circle was converted to an SVG - one grey circle with one overlaid progress circle
        if (!val) {
          //Wait until bar animation completes, then flip off the fill
          this.gt50RenderTimeout = setTimeout(() => {
            this.addGt50 = val;
            this.gt50RenderTimeout = null;
          }, 220);
        } else {
          if (this.gt50RenderTimeout) {
            clearTimeout(this.gt50RenderTimeout);
            this.gt50RenderTimeout = null;
          }

          this.addGt50 = val;
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

    setTimerInterval() {
      this.timerInterval = setInterval(() => {
        this.secsRemaining -= 1;

        if (this.secsRemaining <= 0) {
          this.deleteTimerInterval();
        }
      }, 1000);
    },

    deleteTimerInterval() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      this.timerInterval = null;
    },

    timerReset() {
      if (!this.perdown || !this.resetOnClick) {
        return;
      }

      this.deleteTimerInterval();

      this.secsRemaining = this.secs;

      this.setTimerInterval();
    },

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
      transition: transform 0.2s ease-in-out, border-width 0.2s ease-in-out;
    }

    &:before,
    .fill {
      transition: border-width 0.2s ease-in-out;
    }

    & > span {
      transition: all 0.2s ease-in-out;
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

  .bar,
  .fill {
    position: absolute;
    border: 0.08em solid #307bbb;
    clip: rect(0, 0.5em, 1em, 0);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
  }

  .bar {
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  &.gt50 .fill {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  &.initialized.gt50 .slice {
    clip: rect(auto, auto, auto, auto);
  }
}

.perclock > span {
  font-size: 0.175em;
}

.perclock.animate .bar,
.perdown.animate .bar {
  transition: border-width 0.2s ease-in-out;
}
</style>
