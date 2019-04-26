<template>

  <div class="dashboard">
    <v-card v-for="question in allQuestions" :key="question._id" class="mx-auto ma-3" align-center
      max-width="600">
      <v-card-title>
        <h2>{{ question.title }}</h2>
      </v-card-title>
      <v-card-text class="title font-weight=light">
        <h6>Question by: {{ question.userId.firstName }}</h6>
        <p>{{ question.description }}</p>
        <h5 ma-4> Total Vote: {{question.upvotes.length - question.downvotes.length }}
        </h5>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="gotoQuestion(question._id)" color="warning">View</v-btn>
        <v-btn color="warning" v-on:click="deleteQuestion(question._id)"
          v-if="question.userId._id == theUserId">Delete</v-btn>

        <EditQuestion
          v-if="question.userId._id == theUserId"
          v-bind:questionId="question._id"
        >
        </EditQuestion>


        <v-layout align-center justify-end>
          <v-btn color="success" v-on:click="upvote(question._id)">Vote</v-btn>
          <v-btn color="error" v-on:click="downvote(question._id)">unVote</v-btn>
        </v-layout>

      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import EditQuestion from '@/components/EditQuestion.vue'
  import axios from 'axios'
  import {
    mapState
  } from 'vuex'
  import Swal from 'sweetalert2'
  let baseUrl = `http://localhost:3001`

  export default {
    components: {
      EditQuestion
    },
    data() {
      return {
        theUserId: ''
      }
    },
    created() {
      this.$store.dispatch('getAllQuestions')
    },
    computed: mapState(['allQuestions', 'isLogin']),
    methods: {
      gotoQuestion(id) {
        this.$router.replace({
          path: `/question/${id}`
        })
      },
      upvote(questionId) {
        axios
          .patch(`${baseUrl}/questions/upvote/${questionId}`, {}, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Upvote',
              showConfirmButton: false,
              timer: 500
            })
            console.log(questionId)
            console.log(`Berhasil masuk upvote success`)
            this.$store.dispatch('getAllQuestions')
          })
          .catch(err => {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'You cannot upvote twice!',
            })
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
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Downvote',
              showConfirmButton: false,
              timer: 500
            })
            console.log(`Berhasil masuk downvote success`)
            this.$store.dispatch('getAllQuestions')
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
      },
      theUser() {
        this.theUserId = localStorage.getItem('userId')
      },
      deleteQuestion(id) {
        console.log('masukkkk')
        axios
          .delete(`${baseUrl}/questions/${id}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((deleted) => {
            // console.log(deleted)
            console.log(`Success Delete Question`)
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Downvote',
              showConfirmButton: false,
              timer: 500
            })
            this.$store.dispatch('getAllQuestions')
          })
          .catch(err => {
            // console.log(err.message)
            console.log(`Error Delete Question`)
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'You cannot downvote twice!',
            })
          })
      },
    },
    mounted() {
      this.theUser()
    }
  }

</script>

<style>

</style>
