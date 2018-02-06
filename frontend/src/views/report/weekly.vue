<template>
  <div>
    <h3>Yearly Report</h3>
    <p>Please choose a year to generate report. </p>
    <flat-pickr class="flatpickr-wrapper"
                v-model="timeOfWeek"
                :config="datePicker.config" />
    <br><br>
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
          weekNumbers: true,
          locale: {
            firstDayOfWeek: 1
          },
          inline: true,
          static: true,
          plugins: [new WeekSelectPlugin({})]
        }
      },
      timeOfWeek: ''
    }
  }
}
</script>

<style>
.flatpickr-width-limit {
  max-width: 351px;
}
</style>
