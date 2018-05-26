<template>
  <div>
    This is a p5 component!
    <div id="p5-container"></div>
  </div>
</template>

<script>
import p5 from "p5";

export default {
  name: "p5",
  props: {
    draw: {
      type: Function,
      required: true
    },
    state: null, // null matches any type
    setup: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return { sketch: null };
  },
  mounted() {
    new p5(sketch => {
      sketch.setup = () => this.setup(sketch);
      sketch.draw = () => {
        this.$emit("update");
        this.draw(sketch, this.state);
      };
    }, "p5-container");
  }
};
</script>
