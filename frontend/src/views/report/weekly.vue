<template>
  <div>
    <h3>Weekly Report</h3>
    <p>Please choose a date range from calender. </p>
    <flat-pickr class="flatpickr-wrapper"
                v-model="range"
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
              :disabled="errors.any() || isLoading || !range">
        <span class="fi fi-download" /> Download Weekly Report
      </button>
    </div>
    <br>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'WeeklyReport',

  data() {
    return {
      datePicker: {
        config: {
          mode: 'range',
          minDate: '01-01-2018',
          weekNumbers: true,
          locale: {
            firstDayOfWeek: 1
          },
          inline: true,
          static: true
        }
      },
      range: '',
      isAggregated: false
    }
  },

  methods: {
    ...mapActions(['getReport']),

    generate() {
      this.getReport({
        range: this.range,
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
