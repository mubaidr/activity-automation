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
          static: true
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
      ).forEach(dayCont => {
        val.forEach(activity => {
          const date = new Date(dayCont.getAttribute('aria-label'))
            .setHours(0, 0, 0, 0)
            .toString()
          const time = new Date(activity.time).setHours(0, 0, 0, 0).toString()

          if (date === time) {
            dayCont.setAttribute('title', activity.description)
            // eslint-disable-next-line
            dayCont.innerHTML += '<span class="done"></span>'
          }
        })
      })

      // TODO: Update done styling
    }
  },
  methods: {
    ...mapActions(['getActivitiesForMonth'])
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

    .flatpickr-day > .done {
      position: absolute
      top: 0
      left: 0
      background-color: red
      width: 20px
      height: 20px
    }
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
