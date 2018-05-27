<template>
  <div>
    <p5 :state="state" 
        :setup="setup" 
        :draw="draw" 
        @update="update" 
        @key-pressed="keyPressed"
        @mouse-moved="mouseMoved"
        @mouse-dragged="mouseDragged">
    </p5>
    <p>
      Red: {{ state.red }} <br/>
      Green: {{ state.green }} <br/>
      Blue: {{ state.blue }} <br/>
    </p>
    <p>
      Press <button @click="toggleRed()">button</button> to toggle red color <br/>
      Press <code>g</code> to toggle green color <br/>
      Use mouse to draw lines <br/>
    </p>
  </div>
</template>

<script>
import VueP5 from "vue-p5";

export default {
  name: "p5-example",
  components: {
    p5: VueP5
  },
  data() {
    return {
      setup: sketch => {
        sketch.createCanvas(300, 150);
      },
      draw: (sketch, state) => {
        const { red, green, blue, lines } = state;
        sketch.background(red, green, blue);
        for (let line of lines) {
          sketch.stroke(line.color);
          sketch.line(line.pmouseX, line.pmouseY, line.mouseX, line.mouseY);
        }
      },
      state: {
        red: 255,
        green: 0,
        blue: 0,
        lines: []
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
    mouseMoved({ mouseX, mouseY, pmouseX, pmouseY }) {
      this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 0 });
    },
    mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }) {
      this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 255 });
    },
    toggleRed() {
      this.state.red = 255 - this.state.red;
    },
    toggleGreen() {
      this.state.green = 255 - this.state.green;
    },
    pushLine(line) {
      let lines = this.state.lines;
      lines.push(line);
      this.state.lines = lines.slice(-100);
    }
  }
};
</script>
