import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeApp from "./components/HomeApp.vue";
import ResultPage from "./components/ResultPage.vue";
import QuestionPage from "./components/QuestionPage.vue";
import PrizeWheel from "./components/PrizeWheel.vue";
import LoginPage from "./components/LoginPage.vue";
import ThankYouVue from "./components/ThankYou.vue";

const routes = [
  {  name: "home",  path: "/", component: HomeApp },
  {  name: "results", path: "/results", component: ResultPage },
  {  name: "questions", path: "/questions", component: QuestionPage },
  {  name: "prize-wheel", path: "/prize-wheel", component: PrizeWheel }, 
  {  name: "login", path: "/login", component: LoginPage }, 
  {  name: "thank-you", path: "/thank-you", component: ThankYouVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");

export { router };
