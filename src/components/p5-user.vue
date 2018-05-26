<template>
  <div>
    <button @click="p5_state.red = 0">Remove red color</button>
    <p5 :draw="p5_draw" :state="p5_state" @update="p5_update" :setup="p5_setup"></p5>
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
      p5_setup: sketch => {
        sketch.createCanvas(300, 150);
      },
      p5_draw: (sketch, state) => {
        sketch.background(state.red, state.green, state.blue);
      },
      p5_state: {
        red: 255,
        green: 200,
        blue: 0
      }
    };
  },
  methods: {
    p5_update() {
      this.p5_state.blue += 3;
      if (this.p5_state.blue > 255) {
        this.p5_state.blue = 0;
      }
    }
  }
};
</script>
