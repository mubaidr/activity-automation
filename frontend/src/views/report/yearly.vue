<template>
  <div>
    <h3>Yearly Report</h3>
    <p>Please choose a year to generate report. </p>
    <div class="form-group">
      <select class="form-control"
              name="year"
              value="1">Select Year>
        <option value="1">2018</option>
      </select>
    </div>
    <div class="form-group">
      <button class="btn btn-dark btn-block"
              type="submit"
              :disabled="errors.any() || isLoading">
        <span class="fi fi-download" /> Download Yearly Report
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YearlyReport'
}
</script>

<style>

</style>
