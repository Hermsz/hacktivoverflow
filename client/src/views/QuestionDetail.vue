<template>

  <div class="questionDetail">
    <h1 align="center">Question</h1>
    <v-card class="mx-auto ma-3" align-center max-width="600">
      <v-card-title>
        <h2>{{ theQuestion.title}}</h2>
      </v-card-title>
      <v-card-text class="title font-weight=light">
        <h6>Question by: {{ theQuestion.userId.firstName }}</h6>
        <p>{{ theQuestion.description }}</p>
        <h5 ma-4> total Vote:
          {{ Math.abs(theQuestion.upvotes.length  - theQuestion.downvotes.length ) }}
        </h5>
      </v-card-text>
      <v-card-actions>
        <v-layout align-center justify-end>
          <v-btn color="success" v-on:click="upvote(theQuestion._id)">Vote</v-btn>
          <v-btn color="error" v-on:click="downvote(theQuestion._id)">unVote</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>

    <v-card class="mx-auto ma-3" align-center max-width="600">
      <v-card-title>
        <h2>Answer this Question</h2>
      </v-card-title>
      <v-form class="px-3">
        <v-text-field label="title" v-model="title"></v-text-field>
        <v-text-field label="description" v-model="description"></v-text-field>
        <v-btn flat class="success mx-0 mt-3" @click="addAnswer">Submit Answer</v-btn>
      </v-form>
    </v-card>



    <h1 align="center">All Answers</h1>
    <v-card class="mx-auto ma-3" align-center max-width="600" v-for="answer in answerQuestion" :key="answer._id">
      <v-card-title>
        <h2>{{ answer.title}}</h2>
      </v-card-title>
      <v-card-text class="title font-weight=light">
        <h6>Question by: {{ answer.userId.firstName }}</h6>
        <p>{{ theQuestion.description }}</p>
        <h5 ma-4> total Vote: {{ Math.abs(answer.upvotes.length  - answer.downvotes.length ) }}
        </h5>
      </v-card-text>
      <v-card-actions>
        <v-layout align-center justify-end>
          <v-btn color="success" v-on:click="upvote(answer._id)">Vote</v-btn>
          <v-btn color="error" v-on:click="downvote(answer._id)">unVote</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
  let baseUrl = `http://localhost:3001`

  export default {
    name: 'questionDetail',
    data() {
      return {
        theQuestion: '',
        answerQuestion: [],
        title: '',
        description: ''
      }
    },
    methods: {
      fetchQuestion() {
        axios
          .get(`${baseUrl}/questions/${this.$route.params.id}`)
          .then(({
            data
          }) => {
            this.theQuestion = data
            console.log(data, '000000000')
          })
          .catch(err => {
            console.log(err)
          })
      },
      fetchAnswers() {
        axios
          .get(`${baseUrl}/answers/all/${this.$route.params.id}`)
          .then(({
            data
          }) => {
            this.answerQuestion = data
          })
          .catch(err => {
            console.log(err)
          })
      },
      addAnswer() {
        console.log(this.$route.params, 'PPPPPPPPPPPP')
        axios
          .post(`${baseUrl}/answers/${this.$route.params.id}`, {
            title: this.title,
            description: this.description
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            console.log(`berhasil add answer`)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted() {
      this.fetchQuestion()
      this.fetchAnswers()
    }
  }

</script>

<style>

</style>
