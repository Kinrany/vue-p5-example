<template>
  <div id="app">
    <div class="banner">
      <img
        src="https://vuejs.org/images/logo.png"
        width="100"
        alt="vue"
        class="logo"
      />
      <h1>Welcome to Vue.js</h1>
    </div>
    <div class="bottom">
      To get started, edit <code>./src/components/App.vue</code> and save to reload.<br/>
      <span class="fade">
        Checkout <code>./README.md</code> for more usages.
      </span>
    </div>
    <button @click="p5_state.red = 0">Remove red color</button>
    <p5 :draw="p5_draw" :state="p5_state" @update="p5_update" :setup="p5_setup"></p5>
  </div>
</template>

<script>
import p5 from "./p5.vue";

export default {
  name: "app",
  components: {
    p5: p5
  },
  data() {
    return {
      p5_setup: (sketch) => {
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

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<!-- Global CSS -->
<style>
code {
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 0.9em;
  white-space: pre-wrap;
  color: #2c3e50;
}

code::before,
code::after {
  content: "`";
}
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
#app {
  text-align: center;
}

#app h1 {
  color: #2c3e50;
  font-weight: 300;
  margin: 0;
}

.banner {
  height: 200px;
  background-color: #f6f6f6;
  padding: 50px 10px;
}

.bottom {
  padding: 80px 10px;
  font-size: 24px;
  font-weight: 300;
}

.fade {
  font-size: 14px;
}

.logo {
  animation: spin 4s 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
