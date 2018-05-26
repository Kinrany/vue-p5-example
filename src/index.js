import Vue from 'vue'
import Example from "./components/p5-example.vue";

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(Example)
})
