<template>
  <div>
    <VueP5
      @preload="preload"
      @setup="setup"
      @draw="draw"
      @keypressed="keyPressed"
      @mousedragged="mouseDragged"
    ></VueP5>
    <p>
      Red: {{ red }}
      <br />
      Green: {{ green }}
      <br />
      Blue: {{ blue }}
      <br />
    </p>
    <p>
      Press
      <button @click="toggleRed()">button</button> to toggle red color
      <br />Press
      <code>g</code> to toggle green color
      <br />Use mouse to draw lines
      <br />
    </p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import VueP5 from "vue-p5";
import P5 from "p5";

type Line = {
  mouseX: number,
  mouseY: number,
  pmouseX: number,
  pmouseY: number,
};

export default defineComponent({
  name: "p5-example",
  components: {
    VueP5,
  },
  setup: () => {
    // Unlike the values created with `ref`,
    // START_TIME doesn't need to change over time.
    const START_TIME = Date.now();
    const currentTime = ref(Date.now());
    const msSinceStart = computed(() => currentTime.value - START_TIME);

    // Values for red and green color can be changed by the player,
    // while the value for blue color will change over time on its own.
    const red = ref(0);
    const green = ref(255);
    const blue = computed(() => Math.floor(msSinceStart.value * 0.03) % 255);

    // Lines drawn on the canvas.
    const lines = ref<Line[]>([]);

    // Image asset and current rotation angle for the rotating p5.js logo.
    const p5LogoImage = ref<P5.Image | null>(null);
    const p5LogoRotationAngle = computed(() => ((msSinceStart.value * 0.0001) % Math.PI) * 2);

    return {
      currentTime,
      msSinceStart,
      red,
      green,
      blue,
      lines,
      p5LogoImage,
      p5LogoRotationAngle,
    };
  },
  methods: {
    preload(sketch: P5) {
      this.p5LogoImage = sketch.loadImage("p5js.png");
    },
    setup(sketch: P5) {
      sketch.createCanvas(400, 400);
    },
    draw(sketch: P5) {
      this.currentTime = Date.now();

      sketch.background(this.red, this.green, this.blue);

      const logoWidth = sketch.width / 3;
      const logoHeight = sketch.height / 3;

      // logo should be in the middle of the screen and rotated
      sketch.translate(sketch.width / 2, sketch.height / 2);
      sketch.rotate(this.p5LogoRotationAngle);
      sketch.image(
        this.p5LogoImage!,
        -logoWidth / 2,
        -logoHeight / 2,
        logoWidth,
        logoHeight
      );
      sketch.resetMatrix();

      for (let line of this.lines) {
        sketch.stroke('black');
        sketch.line(line.pmouseX, line.pmouseY, line.mouseX, line.mouseY);
      }
    },
    keyPressed({ keyCode }: P5) {
      // 'g' key
      if (keyCode === 71) {
        this.toggleGreen();
      }
    },
    mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }: P5) {
      this.pushLine({ mouseX, mouseY, pmouseX, pmouseY });
    },
    toggleRed() {
      this.red = 255 - this.red;
    },
    toggleGreen() {
      this.green = 255 - this.green;
    },
    pushLine(line: Line) {
      this.lines = [...this.lines, line].slice(-100);
    },
  },
});
</script>
