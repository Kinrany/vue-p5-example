<template>
  <div>
    This is a p5 component!
    <div id="p5-container"></div>
  </div>
</template>

<script>
import p5 from "p5";

export default {
  name: "vue-p5-component",
  props: ['draw', 'state'],
  mounted() {
    new p5(sketch => {
      sketch.setup = () => sketch.createCanvas(200, 200);
      sketch.draw = () => this.draw(sketch, this.state);
    }, "p5-container");
  }
};
</script>
