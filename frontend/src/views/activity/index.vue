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
            this.processCalenderDays(dayElem)
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
    activities() {
      Array.from(
        document.querySelectorAll(
          '.flatpickr-wrapper .flatpickr-day:not(.disabled)'
        )
      ).forEach(dayElem => {
        this.processCalenderDays(dayElem)
      })
    }
  },

  created() {
    // Fetch activity status list
    this.getActivityStatus()
    // Get activities details for this month
    this.getActivitiesForMonth()
  },

  methods: {
    ...mapActions(['getActivitiesForMonth', 'getActivityStatus']),

    processCalenderDays(dayElem) {
      for (let i = 0; i < this.activities.length; i += 1) {
        const activity = this.activities[i]
        const date = new Date(dayElem.dateObj).setHours(0, 0, 0, 0).toString()
        const time = new Date(activity.time).setHours(0, 0, 0, 0).toString()

        if (date === time) {
          // add tooltip
          dayElem.setAttribute('title', activity.description)
          // eslint-disable-next-line
          dayElem.innerHTML +=
            '<span class="fi fi-checkbox"></span><span class="fi fi-clock" ></span><span class="fi fi-loop" ></span>'

          // add notifier class
          this.addClass(dayElem, [
            activity.activityStatus.description.toLowerCase()
          ])
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.calender-container {
  padding: 21px
  height: 350px
  position: relative

  &>div {
    position: absolute
    left: 0
    right: 0
    margin: 0 auto
    width: 308px
  }

  .flatpickr-wrapper {
    .flatpickr-day {
      .fi {
        position: absolute
        margin: 0
        top: -10px
        right: 0
        font-size: 20px
      }

      &.in-progress {
        .fi-checkbox {
          display: none
        }

        .fi-clock {
          display: block
        }

        .fi-loop {
          display: none
        }
      }

      &.completed {
        .fi-checkbox {
          display: block
        }

        .fi-clock {
          display: none
        }

        .fi-loop {
          display: none
        }
      }

      &.routine {
        .fi-checkbox {
          display: none
        }

        .fi-clock {
          display: none
        }

        .fi-loop {
          display: block
        }
      }
    }

    opacity: 1
    transform-origin: 50%
    transform: scale(1)
    transition: all 0.125s ease-out 0.125s
  }

  .create-activity-wrapper {
    z-index: 999
    width: 100%
    max-width: 480px
    opacity: 0
    transform-origin: 50%
    transform: scale(0)
    transition: all 0.125s ease-out
  }

  &.active {
    .flatpickr-wrapper {
      opacity: 0
      transform: scale(0.5)
      transition: all 0.125s ease-out
    }

    .create-activity-wrapper {
      opacity: 1
      transform: scale(1)
      transition: all 0.25s ease-out, opacity 0.125s linear // 0.125s
    }
  }
}
</style>
