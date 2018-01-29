<template>
  <div>
    <h2>Activities</h2>
    <p>Please select a date to view or add activity details.</p>
    <div class="calender-container clearfix"
         :class="{'active': timeOfWeek}">
      <flat-pickr class="flatpickr-wrapper"
                  v-model="timeOfWeek"
                  :config="datePicker.config" />
      <div class="create-activity-wrapper">
        <create-activity :time-of-week="timeOfWeek"
                         @close="timeOfWeek = ''" />
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
      datePicker: {
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
.calender-container {
  padding: 50px
  height: 404px
  position: relative

  &>div {
    position: absolute
    top: 50px
    left: 50%
  }

  .flatpickr-wrapper {
    transform: translateX(-50%)
  }

  .create-activity-wrapper {
    left: 50%
    width: 100%
    max-width: 480px
    opacity: 0
    visibility: hidden
    transition: all 0.25s linear
    transform: scale(0.5) translateX(-100%) rotateY(-180deg)
  }

  &.active {
    .create-activity-wrapper {
      opacity: 1
      visibility: visible
      transition: all 0.125s linear, visibility 0 linear 0.125s
      transform: scale(1) translateX(-50%) rotateY(0)
    }
  }
}
</style>
