<template>
  <div class="result">
    
    <div class="result-container">
      <div class="result-img">
          <img src="../assets/images/iconlp.png" alt="icon" />
      </div>
      <h1>Gracias por jugar </h1>
      <p>Tu puntuación es: {{ points }}/{{ totalQuestions }}</p>

      <div v-if="points === totalQuestions">
        <p>Felicidades. Puedes ir a reclamar tu premio!!!</p>

      </div>
      <div v-else>
        <p>Inténtalo de nuevo para obtener premios. </p>

      </div>
      <button v-if="points === totalQuestions" @click="redirectToPrizeWheel" class="button-result">Ruleta</button>

      <button v-else @click="emitRedirectToHomePage" class="button-result">Volver al Inicio</button>

    </div>
  </div>
</template>

<script>

// import { router } from "../main";

export default {
  name: "ResultPage",
  props: {
    points: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
  },
  methods: {
    emitRedirectToHomePage() {
      this.$emit("redirectToHomePage"); // Emit the event to the parent component
      
    },

    redirectToPrizeWheel() {
      this.$router.push("/prize-wheel");
    },

  },
};
</script>

<style>
@import "../styles/style.css";
</style>