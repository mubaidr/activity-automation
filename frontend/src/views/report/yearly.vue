<template>
  <div>
    <h3>Yearly Report</h3>
    <p>Please choose a year. </p>
    <div class="form-group">
      <select class="form-control"
              name="year"
              value="1">Select Year>
        <option value="1">2018</option>
      </select>
    </div>
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
  name: 'YearlyReport',

  data() {
    return {
      isAggregated: false
    }
  }
}
</script>

<style>

</style>
