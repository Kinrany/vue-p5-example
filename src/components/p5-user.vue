<template>
  <div>
    <button @click="state.red = 0">Remove red color</button>
    <p5 :draw="draw" :state="state" @update="update" :setup="setup"></p5>
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
        green: 200,
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
    }
  }
};
</script>
