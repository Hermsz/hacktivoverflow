<template>

  <div class="dashboard">
    <v-card v-for="question in allQuestions" :key="question.title" class="mx-auto ma-3" align-center
      max-width="600">
      <v-card-title>
        <h2>{{ question.title }}</h2>
      </v-card-title>
      <v-card-text class="title font-weight=light">
        <h6>Question by: {{ question.userId.firstName }}</h6>
        <p>{{ question.description }}</p>
        <h5 ma-4> total Vote: {{ Math.abs(question.upvotes.length - question.downvotes.length) }}
        </h5>
      </v-card-text>
      <v-card-actions>
        <v-list-tile-content>
          <v-btn @click="gotoQuestion(question._id)"  color="warning">View</v-btn>
        </v-list-tile-content>
        <v-layout align-center justify-end>
          <v-btn color="success" v-on:click="upvote(question._id)">Vote</v-btn>
          <v-btn color="error" v-on:click="downvote(question._id)">unVote</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    mapState
  } from 'vuex'
  let baseUrl = `http://localhost:3001`

  export default {
    created() {
      this.$store.dispatch('getAllQuestions')
    },
    computed: mapState(['allQuestions', 'isLogin']),
    methods: {
      gotoQuestion(id){
        this.$router.replace({path: `/question/${id}`})
      },
      upvote(questionId) {
        axios
          .patch(`${baseUrl}/questions/upvote/${questionId}`, {}, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            console.log(questionId)
            console.log(`Berhasil masuk upvote success`)
          })
          .catch(err => {
            console.log(err)
          })
      },
      downvote(questionId) {
        axios
          .patch(`${baseUrl}/questions/downvote/${questionId}`, {}, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            console.log(`Berhasil masuk downvote success`)
          })
          .catch(err => {
            console.log(err)
          })
      },
      findOneQuestion(questionId) {
        axios
          .get(`${baseUrl}/questions/${questionId}`)
          .then((foundQuestion) => {
            this.theQuestion = foundQuestion
            this.$router.push('/question/:id=')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }

</script>

<style>

</style>
