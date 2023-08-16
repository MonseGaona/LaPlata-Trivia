<template>
  <div class="question-contents">
    <div class="question_container" v-if="questions && questions.length > 0">
      <div class="timer" :class="{ 'timer-finished': timer === 0 }">{{ timer }}s</div>
      <p class="question-no">Pregunta: {{ currentQuestion + 1 }}</p>
      <p class="question">{{ questions[currentQuestion].pregunta }}</p>
      <div v-for="(option, index) in options" :key="index" class="options-container">
        <button @click="answerQuestion(option)">{{ option.respuesta }}</button>
      </div>
      <button @click="handleNextQuestion" class="button">Siguiente</button>
    </div>
    <div v-else>
      <p>Cargando preguntas...</p>
    </div>
  </div>
</template>
  
<script>
import { shuffle } from "lodash";

export default {
  name: "QuestionPage",
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentQuestion: 0,
      points: 0,
      options: [],
      timer: 30, // Variable para el temporizador en segundos
      timerInterval: null, // Variable para almacenar el intervalo del temporizador
    };
  },
  methods: {
    answerQuestion(option) {
      if (option.correcto) {
        this.points++;
      }
      clearInterval(this.timerInterval); // Pausar el temporizador al seleccionar una respuesta
      this.handleNextQuestion();
    },
    handleNextQuestion() {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.options = shuffle(this.questions[this.currentQuestion].respuestas);
        this.resetTimer(); // Reiniciar el temporizador para la siguiente pregunta
      } else {
        this.$emit("showResultPage", this.points);
      }
    },
    resetTimer() {
      this.timer = 30; // Reiniciar el tiempo restante a 30 segundos
      this.timerInterval = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.handleTimeUp();
        }
      }, 1000);
    },
    handleTimeUp() {
      // Lógica cuando el tiempo se agota para la pregunta actual
      this.handleNextQuestion(); // Pasar a la siguiente pregunta sin puntos adicionales
    },
  },
  created() {
    this.options = shuffle(this.questions[0].respuestas);
    this.resetTimer();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval); // Limpiar el intervalo antes de que el componente se desmonte
  },
}
</script>
  
<style>
@import "../styles/style.css";
</style>
  