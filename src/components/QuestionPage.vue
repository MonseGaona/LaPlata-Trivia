<template>
  <div class="question-contents">
    <div class="question_container" v-if="questions && questions.length > 0">
      <div class="timer" :class="{ 'timer-finished': timer === 0 }">{{ timer }}s</div>
      <p class="question-no">Pregunta: {{ currentQuestion + 1 }}</p>
      <p class="question">{{ questions[currentQuestion].pregunta }}</p>
      <div v-for="(option, index) in options" :key="index" class="options-container">
        <button @click="answerQuestion(index)"
          :class="{ 'correct-answer': index === selectedAnswerIndex && option.correcto, 'wrong-answer': index === selectedAnswerIndex && !option.correcto, 'disabled': option.disabled }">
          {{ option.respuesta }}
          <i v-if="index === selectedAnswerIndex && option.correcto" class="icon-check fas fa-check"></i>
          <i v-if="index === selectedAnswerIndex && !option.correcto" class="icon-cross fas fa-times"></i>
        </button>
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
      timer: 60, // Variable para el temporizador en segundos
      timerInterval: null, // Variable para almacenar el intervalo del temporizador
      selectedAnswerIndex: null,
    };
  },
  methods: {
    answerQuestion(index) {
      this.selectedAnswerIndex = index;

      if (this.options[this.selectedAnswerIndex].correcto) {
        this.points++; // Sumar 1 punto por respuesta correcta

        // Desactivar todas las opciones después de seleccionar una respuesta correcta
        this.options.forEach((_option) => {
          _option.disabled = true;
        });
      }

      clearInterval(this.timerInterval);
    },


    handleNextQuestion() {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.selectedAnswerIndex = null; // Reiniciar respuesta seleccionada
        this.options = shuffle(this.questions[this.currentQuestion].respuestas);
        this.resetTimer();
      } else {
        this.$emit("showResultPage", this.points);
      }
    },



    resetTimer() {
      this.timer = 60; // Reiniciar el tiempo restante a 30 segundos
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
  //   redirectToHomePage() {
  //   this.startQuiz = false; // Reiniciar startQuiz a false para mostrar la landing page
  //   this.showResult = false; // Ocultar la página de resultados
  // },

}
</script>
  
<style>
@import "../styles/style.css";
</style>
  