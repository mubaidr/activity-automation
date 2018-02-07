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
              type="submit"
              :disabled="errors.any() || isLoading || !timeOfWeek">
        <span class="fi fi-download" /> Download Weekly Report
      </button>
    </div>
    <br>
  </div>
</template>

<script>
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
          plugins: [new WeekSelectPlugin({})]
        }
      },
      timeOfWeek: '',
      isAggregated: false
    }
  }
}
</script>

<style>
.flatpickr-width-limit {
  max-width: 351px;
}
</style>
