<template>
  <div class="wrapper">
    <div v-if="!startQuiz" class="landingPage">
      <div class="landingPage-contents">
        <div class="landingPage-img">
          <img src="../assets/images/logoBlanco.png" alt="icon" />
        </div>
        <div class="landingPage-text">
          <h1>¡Bienvenido a la Trivia de La Plata!</h1>
          <p>
            Responde correctamente 3 preguntas y gira la ruleta de premios. <br>
            ¡¡Buena suerte!!
          </p>
          <button @click="handleStartQuiz">Comenzar</button>
        </div>
      </div>
    </div>

    <QuestionPage v-if="startQuiz && !showResult" :questions="questionsToShow" @showResultPage="showResultPage" />

    <ResultPage v-if="showResult" :points="points" :totalQuestions="totalQuestions"
      @redirectToHomePage="redirectToHomePage" @redirectToPrizeWheel="redirectToPrizeWheel" />


  </div>
</template>

<script>
import axios from "axios";
import { shuffle } from "lodash";
import QuestionPage from "./QuestionPage.vue";
import ResultPage from "./ResultPage.vue";
// import { router } from "../main";

export default {
  name: "HomeApp",
  components: {
    QuestionPage,
    ResultPage,
  },
  data() {
    return {
      currentQuestion: 0,
      points: 0,
      questions: [], // Todas las preguntas de la API
      questionsToShow: [], // Preguntas y respuestas a mostrar (limitado a 3)
      options: [],
      startQuiz: false,
      showResult: false,
      totalQuestions: 3, // Total de preguntas en el cuestionario
      questionsPool: [],
    };
  },
  methods: {
    async handleStartQuiz() {
      try {
        if (this.questionsPool.length === 0) {
          // Si no hay preguntas en el pool, obtén preguntas de la API y guárdalas en el pool
          const response = await axios.get("https://apidigital.laplata.com.py/test/api/Promocion");
          this.questionsPool = response.data;
        }

        // Obtener un conjunto aleatorio de preguntas del pool para el juego actual
        const randomQuestions = shuffle(this.questionsPool).slice(0, this.totalQuestions);

        // Mezclar las respuestas de cada pregunta en el conjunto aleatorio
        randomQuestions.forEach((question) => {
          question.respuestas = shuffle(question.respuestas);
        });

        this.questionsToShow = randomQuestions;
        this.startQuiz = true;
        this.showResult = false;
      } catch (error) {
        console.error("Error al obtener preguntas y respuestas", error);
      }
    },

    showResultPage(points) {
      this.points = points;
      this.showResult = true;
    },

    redirectToPrizeWheel() {
      this.$router.push({ name: "prize-wheel" });
    },

    playAgain() {
  // Reiniciar las variables de estado
  this.currentQuestion = 0;
  this.showResult = false;

  // Obtener un nuevo conjunto aleatorio de preguntas del pool para el juego actual
  const randomQuestions = shuffle(this.questionsPool).slice(0, this.totalQuestions);

  // Mezclar las respuestas de cada pregunta en el conjunto aleatorio
  randomQuestions.forEach((question) => {
    question.respuestas = shuffle(question.respuestas);
  });

  this.questionsToShow = randomQuestions;
},


redirectToHomePage() {
  this.startQuiz = false; // Reiniciar startQuiz a false para mostrar la landing page
  this.showResult = false; // Ocultar la página de resultados
  this.points = 0; // Reiniciar los puntos al volver al inicio
  this.selectedAnswerIndex = null; // Reiniciar la respuesta seleccionada

  // Obtener un nuevo conjunto aleatorio de preguntas del pool para el juego actual
  const randomQuestions = shuffle(this.questionsPool).slice(0, this.totalQuestions);

  // Mezclar las respuestas de cada pregunta en el conjunto aleatorio
  randomQuestions.forEach((question) => {
    question.respuestas = shuffle(question.respuestas);
  });

  this.questionsToShow = randomQuestions;
},

  },
};
</script>

<style>
@import "../styles/style.css";
</style>
