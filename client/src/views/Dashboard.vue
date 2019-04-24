<template>
  <div class="dashboard" v-if="isLogin">

  <QuestionCard v-if="isLogin">
  </QuestionCard>
  
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  components: {
    QuestionCard
  },
  computed: mapState(['isLogin']),
  
}
</script>

<style>

</style>
