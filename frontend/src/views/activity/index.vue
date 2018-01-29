<template>
  <div @click.self="timeOfWeek = ''">
    <h2>Activities</h2>
    <p>Please select a date to view or add activity details.</p>
    <br>
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
  &>div {
    float: left
  }

  .flatpickr-wrapper {
    width: 100%
    transition: all 0.25s ease

    .flatpickr-calendar {
      margin: 0 auto
    }
  }

  .create-activity-wrapper {
    overflow: hidden
    width: 0
    opacity: 0
    transition: all 0.25s ease
  }

  &.active {
    .flatpickr-wrapper {
      width: 30%
      transition: all 0.25s ease
    }

    .create-activity-wrapper {
      width: 70%
      opacity: 1
      transition: all 0.25s ease
    }
  }
}

@media screen and (max-width: '767px') {
  .calender-container {
    &.active {
      .flatpickr-wrapper {
        width: 0
      }

      .create-activity-wrapper {
        width: 100%
      }
    }
  }
}
</style>
