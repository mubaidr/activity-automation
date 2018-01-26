<template>
  <div>
    <h2>Activities</h2>
    <p>Please select a date to view or add activity details.</p>
    <div class="calender-container">
      <div class="wrapper">
        <flat-pickr v-model="timeOfWeek"
                    :config="datePciker.config" />

        <transition appear
                    name="modal-in">
          <create-activity v-show="timeOfWeek"
                           :time-of-week="timeOfWeek"
                           @close="timeOfWeek = ''" />
        </transition>
      </div>
    </div>
    <br>
    <blockquote class="blockquote text-center">
      <p class="mb-0">{{ quote }}</p>
    </blockquote>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import createActivity from './create.vue'

export default {
  components: {
    createActivity
  },
  data() {
    return {
      datePciker: {
        config: {
          maxDate: 'today',
          minDate: new Date().fp_incr(-7),
          disable: [
            date =>
              // console.log(date.getDay())
              date.getDay() === 5 || date.getDay() === 6
          ],
          locale: {
            firstDayOfWeek: 1
          },
          inline: true,
          static: true
        }
      },
      timeOfWeek: '',
      quote: ''
    }
  },
  computed: {
    enableAdd() {
      return !!this.timeOfWeek
    }
  },
  created() {
    this.getRandomQuote()
    setInterval(this.getRandomQuote, 7500)
  },
  methods: {
    ...mapGetters(['getQuotes']),
    getRandomQuote() {
      const quotes = this.getQuotes()
      const types = Object.keys(quotes)
      const rand = Math.floor(Math.random() * types.length)
      const list = quotes[types[rand]]
      const randQ = Math.floor(Math.random() * list.length)
      this.quote = list[randQ]
    }
  }
}
</script>

<style lang="stylus">
</style>
