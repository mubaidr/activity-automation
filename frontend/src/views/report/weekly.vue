<template>
  <div>
    <h3>Weekly Report</h3>
    <p>Please choose a week. </p>
    <flat-pickr class="flatpickr-wrapper"
                v-model="timeOfWeek"
                :config="datePicker.config" />
    <br>
    <br>
    <div v-show="user.accountType.description.toLowerCase() === 'admin'">
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input"
                 type="checkbox"
                 v-model="isAggregated"> Generate combined report
        </label>
      </div>
      <br>
    </div>
    <div class="form-group flatpickr-width-limit">
      <button class="btn btn-dark btn-block"
              type="button"
              @click="generate"
              :disabled="errors.any() || isLoading || !timeOfWeek">
        <span class="fi fi-download" /> Download Weekly Report
      </button>
    </div>
    <br>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import WeekSelectPlugin from 'flatpickr/dist/plugins/weekSelect/weekSelect'

export default {
  name: 'WeeklyReport',

  data() {
    return {
      datePicker: {
        config: {
          minDate: '01-01-2018',
          weekNumbers: true,
          locale: {
            firstDayOfWeek: 1
          },
          inline: true,
          static: true,
          plugins: [new WeekSelectPlugin({})],
          onChange: [
            (selectedDates, str, flatPickr) => {
              const weekNumber = selectedDates[0]
                ? flatPickr.config.getWeek(selectedDates[0])
                : null

              this.week = weekNumber
            }
          ]
        }
      },
      week: 1,
      timeOfWeek: '',
      isAggregated: false
    }
  },

  methods: {
    ...mapActions(['getReport']),

    generate() {
      this.getReport({
        week: this.week,
        timeOfWeek: this.timeOfWeek,
        isAggregated: this.isAggregated
      })
        .then(res => {
          console.log('got report : ', res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.flatpickr-width-limit {
  max-width: 351px;
}
</style>
