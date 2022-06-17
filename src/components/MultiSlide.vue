<template>

<div slider id="slider-distance" class="multi-slide">
  <div>
    <div inverse-left :style="{width: scale1 + '%'}"></div>
    <div inverse-right :style="{width: scale2inv + '%'}"></div>
    <div range :style="{left: scale1 + '%', right: scale2inv + '%'}"></div>
    <span thumb :style="{left: scale1 + '%'}"></span>
    <span thumb :style="{left: scale2 + '%'}"></span>
    <div sign :style="{left: scale1 + '%'}">
      <span>{{value.min}}</span>
    </div>
    <div sign :style="{left: scale2 + '%'}">
      <span>{{value.max}}</span>
    </div>
  </div>
  <input type="range" tabindex="0" :value="value.min" :max="max" :min="min" :step="step" @input="onInput1" />

  <input type="range" tabindex="0" :value="value.max" :max="max" :min="min" :step="step"  @input="onInput2" />
</div>


</template>

<script>

export default {
  name: 'HomeView',
  props: {
      min: Number,
      max: Number,
      step: Number
  },
  data() {
    return {
        value: {
            min: this.min,
            max: this.max,
            changed: false
        },
        scale1: 0,
        scale2: 100
    }
  },
  methods: {
    onInput1(e) {
        const element = e.target;
        this.value.min = Math.min(element.value, this.value.max);
        this.scale1 = (100/(parseInt(element.max)-parseInt(element.min)))*parseInt(this.value.min)-(100/(parseInt(element.max)-parseInt(element.min)))*parseInt(element.min);
        this.emitevent();
    },
    onInput2(e) {
        const element = e.target;
        this.value.max = Math.max(element.value, this.value.min);
        this.scale2 = (100/(parseInt(element.max)-parseInt(element.min)))*parseInt(this.value.max)-(100/(parseInt(element.max)-parseInt(element.min)))*parseInt(element.min);
        this.emitevent();
    },
    emitevent() {
      (this.value.min == this.min && this.value.max == this.max) ? this.value.changed = false : this.value.changed = true;
      this.$emit('changed', this.value)
    }
  },
  computed: {
      scale2inv() {
          return 100 - this.scale2
      }
  }
}

</script>

<style>

[slider] {
  position: relative;
  height: 19px;
  border-radius: 10px;
  text-align: left;
  margin: 10px 0 10px 0;
}

[slider] > div {
  position: absolute;
  left: 13px;
  right: 15px;
  height: 14px;
}

[slider] > div > [inverse-left] {
  position: absolute;
  left: 0;
  height: 10px;
  border-radius: 10px;
  background-color: var(--bs-secondary);
  margin: 0 7px;
}

[slider] > div > [inverse-right] {
  position: absolute;
  right: 0;
  height: 10px;
  border-radius: 10px;
  background-color: var(--bs-secondary);
  margin: 0 7px;
}

[slider] > div > [range] {
  position: absolute;
  left: 0;
  height: 10px;
  border-radius: 14px;
  background-color: var(--bs-primary);
}

[slider] > div > [thumb] {
  position: absolute;
  top: -5px;
  z-index: 2;
  height: 20px;
  width: 20px;
  text-align: left;
  margin-left: -11px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
  background-color: var(--bs-light);
  border-radius: 50%;
  outline: none;
}

[slider] > input[type=range] {
  position: absolute;
  pointer-events: none;
  -webkit-appearance: none;
  z-index: 3;
  height: 14px;
  top: -2px;
  width: 100%;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
}

div[slider] > input[type=range]::-ms-track {
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}

div[slider] > input[type=range]::-moz-range-track {
  -moz-appearance: none;
  background: transparent;
  color: transparent;
}

div[slider] > input[type=range]:focus::-webkit-slider-runnable-track {
  background: transparent;
  border: transparent;
}

div[slider] > input[type=range]:focus {
  outline: none;
}

div[slider] > input[type=range]::-ms-thumb {
  pointer-events: all;
  width: 28px;
  height: 28px;
  border-radius: 0px;
  border: 0 none;
  background: red;
}

div[slider] > input[type=range]::-moz-range-thumb {
  pointer-events: all;
  width: 28px;
  height: 28px;
  border-radius: 0px;
  border: 0 none;
  background: red;
}

div[slider] > input[type=range]::-webkit-slider-thumb {
  pointer-events: all;
  width: 28px;
  height: 28px;
  border-radius: 0px;
  border: 0 none;
  background: red;
  -webkit-appearance: none;
}

div[slider] > input[type=range]::-ms-fill-lower {
  background: transparent;
  border: 0 none;
}

div[slider] > input[type=range]::-ms-fill-upper {
  background: transparent;
  border: 0 none;
}

div[slider] > input[type=range]::-ms-tooltip {
  display: none;
}

[slider] > div > [sign] {
  opacity: 0;
  position: absolute;
  margin-left: -15px;
  top: -9px;
  z-index:3;
  background-color: var(--bs-light);
  color: var(--bs-primary);
  width: 28px;
  height: 28px;
  border-radius: 28px;
  -webkit-border-radius: 28px;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  text-align: center;
}

[slider] > div > [sign]:after {
  position: absolute;
  content: '';
  left: 0;
  border-radius: 16px;
  top: 19px;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top-width: 16px;
  border-top-style: solid transparent;
  border-top-color: var(--bs-primary);
}

[slider] > div > [sign] > span {
  font-size: 12px;
  font-weight: 700;
  line-height: 28px;
}

[slider]:hover > div > [sign] {
  opacity: 1;
}

.multi-slide {
    min-width: 350px;
}
</style>