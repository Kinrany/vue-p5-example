<template>
  <div>
    <p5 :state="state" 
        :setup="setup" 
        :draw="draw" 
        @update="update" 
        @key-pressed="keyPressed"></p5>
    <p>Colors:</p>
    <ul>
      <li>Red: {{ state.red }}</li>
      <li>Green: {{ state.green }}</li>
      <li>Blue: {{ state.blue }}</li>
    </ul>
    <p>Press <button @click="toggleRed()">button</button> to toggle red color</p>
    <p>Press <code>g</code> to toggle green color</p>
  </div>
</template>

<script>
import p5Vue from "./p5.vue";

export default {
  name: "p5-user",
  components: {
    p5: p5Vue
  },
  data() {
    return {
      setup: sketch => {
        sketch.createCanvas(300, 150);
      },
      draw: (sketch, state) => {
        sketch.background(state.red, state.green, state.blue);
      },
      state: {
        red: 255,
        green: 0,
        blue: 0
      }
    };
  },
  methods: {
    update() {
      this.state.blue += 3;
      if (this.state.blue > 255) {
        this.state.blue = 0;
      }
    },
    keyPressed(keyCode) {
      // 'g' key
      if (keyCode === 71) {
        this.toggleGreen();
      }
    },
    toggleRed() {
      this.state.red = 255 - this.state.red;
    },
    toggleGreen() {
      this.state.green = 255 - this.state.green;
    }
  }
};
</script>
