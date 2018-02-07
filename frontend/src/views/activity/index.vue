<template>
  <div>
    <h2>Activities</h2>
    <p>Please select a date to view or add activity log.</p>
    <div class="calender-container clearfix"
         :class="{'active': timeOfWeek}">
      <flat-pickr class="flatpickr-wrapper"
                  v-model="timeOfWeek"
                  :config="datePicker.config" />
      <div class="create-activity-wrapper">
        <create-activity :activity="activity"
                         @close="timeOfWeek = ''" />
      </div>
    </div>
    <br>
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
          minDate: '01-01-2018',
          maxDate: 'today',
          weekNumbers: true,
          disable: [date => date.getDay() === 6 || date.getDay() === 0],
          locale: {
            firstDayOfWeek: 1
          },
          inline: true,
          static: true,
          onDayCreate: (dObj, dStr, fp, dayElem) => {
            this.processCalenderDays(dayElem)
          },
          onChange: (selectedDates, dateStr, instance) => {
            if (dateStr) {
              const id = parseInt(
                instance.selectedDateElem.getAttribute('data-id'),
                10
              )

              if (!id) {
                this.activity = {
                  id: null,
                  description: '',
                  activityStatusId: 2,
                  time: selectedDates[0]
                }

                return
              }

              for (let i = 0; i < this.activities.length; i += 1) {
                if (this.activities[i].id === id) {
                  this.activity = this.activities[i]
                }
              }
            }
          }
        }
      },
      timeOfWeek: '',
      activity: null
    }
  },

  computed: {
    ...mapGetters(['activities']),

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
          dayElem.setAttribute('data-id', activity.id)
          // add notifier class
          this.addClass(dayElem, ['done'])
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
      &.done {
        background-image: url('/src/assets/img/done.png')
        background-position: 85% 5%
        background-size: 33%
        background-repeat: no-repeat
        animation: shake 3s linear 1s 1
      }
    }
  }

  .create-activity-wrapper {
    z-index: 999
    width: 100%
    max-width: 560px
    opacity: 0
    transform-origin: 50%
    transform: scale(0)
    transition: all 0.125s ease-out
  }

  &.active {
    .create-activity-wrapper {
      opacity: 1
      transform: scale(1)
      transition: all 0.25s ease-out, opacity 0.125s linear // 0.125s
    }
  }
}
</style>
