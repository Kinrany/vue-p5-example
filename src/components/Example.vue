<template>
  <div>
    <p5 :setup="setup" 
        :draw="draw"
        @key-pressed="keyPressed"
        @mouse-moved="mouseMoved"
        @mouse-dragged="mouseDragged">
    </p5>
    <p>
      Red: {{ red }} <br/>
      Green: {{ green }} <br/>
      Blue: {{ blue }} <br/>
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
  data: () => ({
    red: 255,
    green: 0,
    blue: 0,
    lines: []
  }),
  methods: {
    setup(sketch) {
      sketch.createCanvas(300, 150);
    },
    draw(sketch) {
      this.blue = (this.blue + 3) % 255;

      const { red, green, blue, lines } = this;
      sketch.background(red, green, blue);
      for (let line of lines) {
        sketch.stroke(line.color);
        sketch.line(line.pmouseX, line.pmouseY, line.mouseX, line.mouseY);
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
      this.red = 255 - this.red;
    },
    toggleGreen() {
      this.green = 255 - this.green;
    },
    pushLine(line) {
      let lines = this.lines;
      lines.push(line);
      this.lines = lines.slice(-100);
    }
  }
};
</script>
