<script setup>
import { onMounted, ref } from 'vue'
import questionService from '@/services/questionService.js'
import rankService from '@/services/rankService.js'


const questions = ref([]);
const replies = ref([]);
const currentQuestionNumber = ref(0);
const isLoading = ref(false);
const repliedQuestion = ref("");
const totalPoints = ref(0);
const errors = ref({
  hasError: false,
  message: ""
});
const finalPosition = ref(0);
const isFinished = ref(false);

onMounted(async () => {
  await getQuestions();
  await getReplies();
})

const getQuestions = async function(){
  isLoading.value = true

  try {

    const responseQuestions = await questionService.index();

    responseQuestions.map((question) => {
      questions.value.push(
        {
          id: question.id,
          name: question.name,
          description: question.description,
          replies: question.replies
        });
    });

    isLoading.value = false;
  } catch (e) {
    isLoading.value = false;
  }
};

const getReplies = () => {
  replies.value = [];
  questions.value[currentQuestionNumber.value].replies.map((reply) => {
    replies.value.push({
      id: reply.id,
      text: reply.text,
      correct: reply.correct
    })
  });
};

const replyQuestion = () => {

  if (repliedQuestion.value !== ""){

    replies.value.map((reply) => {

      if (reply.id === repliedQuestion.value){

        if (reply.correct){
          totalPoints.value += 1
        }

      }

    });

    if (currentQuestionNumber.value < questions.value.length - 1){
      currentQuestionNumber.value += 1;
    }

    repliedQuestion.value = "";
    getReplies()
    errors.value = {
      hasError: false,
      message: ""
    }

  } else {

    errors.value = {
      hasError: true,
      message: "Você deve selecionar uma das alternativas"
    }

  }
}

const changedReplyValue = (replyId) => {
  repliedQuestion.value = replyId
}

const finishGame = async function(){
  isLoading.value = true;

  try{

    const rankData = await rankService.saveNewRank(totalPoints.value);
    finalPosition.value = await rankService.getPosition(rankData.id);

    isFinished.value = true;
  } catch (e){

    isFinished.value = false;
  }

  isLoading.value = false;
}

</script>

<template>


  <div class="d-flex fixed-top justify-content-center my-3">
    <img alt="Vue logo" class="img-fluid" src="../assets/images/estacio-logo.svg" width="125" height="125" />
  </div>

  <div
    class="container d-flex justify-content-center"
    v-if="isLoading"
  >
    <div class="spinner-border text-primary" role="status">

    </div>
    <span class="sr-only mt-1 ms-2">Loading...</span>
  </div>

  <div
  v-if="!isFinished"
  >


    <div
      class="container"
      v-if="!isLoading && questions.length > 0"
    >
      <div class="my-2 d-flex justify-content-center">
        <p>
          {{questions[currentQuestionNumber].name}}
        </p>

      </div>

      <div>
        <table
          class="table"
        >
          <tbody>
          <tr
            v-for="reply in replies"
            :key="reply.id"
          >
            <td>
              <input type="radio" name="replyId" :onchange="() => changedReplyValue(reply.id)"
              >
            </td>
            <td>{{reply.text}}</td>
          </tr>
          </tbody>
        </table>

        <div class="m-3">
          <span
            v-if="errors.hasError"
            class="text-danger"
          >{{errors.message}}</span>
        </div>

      </div>

      <div class="d-flex justify-content-center">
        <nav>
          <button
            v-if="currentQuestionNumber < questions.length - 1"
            :onclick="replyQuestion"
            class="btn btn-primary"
          >
            Responder
          </button>
          <button
            v-else
            :onclick="finishGame"
            class="btn btn-primary"
          >
            Finalizar
          </button>
        </nav>
      </div>
    </div>
  </div>

  <div
    class="container"
    v-if="!isLoading && isFinished"
  >
    <div>
      <h2>Simulado finalizado</h2>
      <table class="table">
        <thead>
        <tr>
          <th>Pontuação total</th>
          <th>Posição final</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{totalPoints}} pontos</td>
          <td>{{finalPosition}}° Posição</td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <RouterLink class="btn btn-primary" to="/">Reiniciar simulado</RouterLink>
      </div>

    </div>
  </div>

</template>

<style scoped>

</style>