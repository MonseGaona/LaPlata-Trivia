<template>
  <router-view></router-view>
</template>

<script>

// import QuestionPage from "./components/QuestionPage.vue";
// import ResultPage from "./components/ResultPage.vue";
// import PrizeWheel from "./components/PrizeWheel.vue";

export default {
  name: "App",
};
</script>


<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  width: 100%;
  position: relative;
}
body {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
