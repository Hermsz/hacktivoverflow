<template>

  <div class="questionDetail">
    <h1 align="center">Question</h1>
    <v-card class="mx-auto ma-3" align-center max-width="600">
      <v-card-title>
        <h2>{{ theQuestion.title }}</h2>
      </v-card-title>
      <v-card-text class="title font-weight=light">
        <h6>Question by: {{ theQuestion.firstName }}</h6>
        <p>{{ theQuestion.description }}</p>
        <h5 ma-4> Total Vote:
          {{ theQuestion.upvotes.length - theQuestion.downvotes.length }}
        </h5>
      </v-card-text>
      <v-card-actions>
        <v-btn color="warning" v-if="theQuestion.userId._id == theUserId"
          v-on:click="deleteAnswer()">Delete</v-btn>
        <v-btn color="warning" v-if="theQuestion.userId._id == theUserId" v-on:click="editAnswer()">
          Update</v-btn>
        <v-layout align-center justify-end>
          <v-btn color="success" v-on:click="upvote('questions',theQuestion._id)">Vote</v-btn>
          <v-btn color="error" v-on:click="downvote('questions',theQuestion._id)">unVote</v-btn>
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
    <v-card class="mx-auto ma-3" align-center max-width="600" v-for="answer in answerQuestion"
      :key="answer._id">
      <v-card-title>
        <h2>{{ answer.title}}</h2>
      </v-card-title>
      <v-card-text class="title font-weight=light">
        <h6>Question by: {{ answer.userId.firstName }}</h6>
        <p>{{ answer.description }}</p>
        <h5 ma-4> Total Vote: {{ answer.upvotes.length  - answer.downvotes.length  }}
        </h5>
      </v-card-text>
      <v-card-actions>

        <v-btn color="warning" v-if="answer.userId._id == theUserId"
          v-on:click="deleteAnswer(answer._id)">Delete</v-btn>
        <EditAnswer
          v-if="answer.userId._id == theUserId"
          v-bind:answerId="answer._id"
        >
        </EditAnswer>

        <v-layout align-center justify-end>
          <v-btn color="success" v-on:click="upvote('answers', answer._id)">Vote</v-btn>
          <v-btn color="error" v-on:click="downvote('answers',answer._id)">unVote</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
  let baseUrl = `http://localhost:3001`
  import Swal from 'sweetalert2'
  import EditAnswer from '@/components/EditAnswer.vue'

  export default {
    name: 'questionDetail',
    components: {
      EditAnswer
    },
    data() {
      return {
        theQuestion: '',
        answerQuestion: [],
        title: '',
        description: '',
        theUserId: ''
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
          })
          .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
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
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
            console.log(err)
          })
      },
      addAnswer() {
        axios
          .post(`${baseUrl}/answers/${this.$route.params.id}`, {
            title: this.title,
            description: this.description
          }, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            console.log(`berhasil add answer`)
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Add Answer',
              showConfirmButton: false,
              timer: 500
            })
            this.fetchAnswers()
          })
          .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
            console.log(err)
          })
      },
      deleteAnswer(id) {
        console.log(id)
        axios
          .delete(`${baseUrl}/answers/${id}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((deleted) => {
            console.log(deleted)
            console.log(`Success Delete Answer`)
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Delete Answer',
              showConfirmButton: false,
              timer: 500
            })
            this.fetchAnswers()
          })
          .catch(err => {
            console.log(err.message)
            console.log(`Error Delete Answer`)
          })
      },
      upvote(type, answerId) {
        axios
          .patch(`${baseUrl}/${type}/upvote/${answerId}`, {}, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            console.log(answerId)
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Upvote',
              showConfirmButton: false,
              timer: 500
            })
            this.fetchAnswers()
            this.fetchQuestion()
          })
          .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'You cannot upvote twice!',
          })
            console.log(err.message)
          })
      },
      downvote(type, answerId) {
        axios
          .patch(`${baseUrl}/${type}/downvote/${answerId}`, {}, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Downvote',
              showConfirmButton: false,
              timer: 500
            })
            console.log(`Berhasil masuk downvote success`)
            this.fetchAnswers()
            this.fetchQuestion()
          })
          .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'You cannot downvote twice!',
          })
            console.log(err)
          })
      },
      theUser() {
        this.theUserId = localStorage.getItem('userId')
      }
    },
    mounted() {
      this.fetchQuestion()
      this.fetchAnswers()
      this.theUser()
    }
  }

</script>

<style>

</style>
