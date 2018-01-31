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
      <p class="mb-0">{{ randomQuote }}</p>
    </blockquote>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
          disable: [date => date.getDay() === 6 || date.getDay() === 0],
          locale: {
            firstDayOfWeek: 1
          },
          inline: true,
          static: true,
          onDayCreate: (dObj, dStr, fp, dayElem) => {
            for (let i = 0; i < this.activities.length; i += 1) {
              const activity = this.activities[i]
              const date = new Date(dayElem.dateObj)
                .setHours(0, 0, 0, 0)
                .toString()
              const time = new Date(activity.time)
                .setHours(0, 0, 0, 0)
                .toString()

              if (date === time) {
                // add tooltip
                dayElem.setAttribute('title', activity.description)
                // add notifier class
                if (!this.hasClass(dayElem, 'done')) {
                  this.addClass(dayElem, 'done')
                }
              }
            }
          }
        }
      },
      timeOfWeek: ''
    }
  },
  computed: {
    ...mapGetters(['randomQuote', 'activities']),

    enableAdd() {
      return !!this.timeOfWeek
    }
  },
  watch: {
    activities(val) {
      Array.from(
        document.querySelectorAll(
          '.flatpickr-wrapper .flatpickr-day:not(.disabled)'
        )
      ).forEach(dayElem => {
        val.forEach(activity => {
          const date = new Date(dayElem.getAttribute('aria-label'))
            .setHours(0, 0, 0, 0)
            .toString()
          const time = new Date(activity.time).setHours(0, 0, 0, 0).toString()

          if (date === time) {
            // add tooltip
            dayElem.setAttribute('title', activity.description)
            // add notifier class
            if (!this.hasClass(dayElem, 'done')) {
              this.addClass(dayElem, 'done')
            }
          }
        })
      })
    }
  },
  methods: {
    ...mapActions(['getActivitiesForMonth'])
  }
}
</script>

<style lang="stylus">
.calender-container {
  padding: 15px
  height: 404px
  position: relative

  &>div {
    position: absolute
    left: 0
    right: 0
    margin: 0 auto
    width: 308px
  }

  .flatpickr-wrapper {
    .flatpickr-day.done {
      background-image: url('/src/assets/img/done.png')
      background-position: right top
      background-size: 33%
      background-repeat: no-repeat
      animation: shake 3s linear 1s 1
    }
  }

  .create-activity-wrapper {
    z-index: 999
    width: 100%
    max-width: 480px
    opacity: 0
    transform-origin: 50%
    transform: scale(0)
    transition: all 0.25s ease-out
  }

  &.active {
    .create-activity-wrapper {
      opacity: 1
      transform: scale(1)
      transition: all 0.25s ease-out
    }
  }
}
</style>
