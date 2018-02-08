<template>
  <div>
    <h3>Yearly Report</h3>
    <p>Please choose a year. </p>
    <div class="form-group">
      <select class="form-control"
              name="year"
              v-model="year">Select Year
        <option value="2018">2018</option>
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
              type="button"
              @click="generate"
              :disabled="errors.any() || isLoading">
        <span class="fi fi-download" /> Download Yearly Report
      </button>
    </div>
  </div>
</template>

<script>
import download from 'downloadjs'
import { mapActions } from 'vuex'

export default {
  name: 'YearlyReport',

  data() {
    return {
      year: '2018',
      isAggregated: false
    }
  },

  methods: {
    ...mapActions(['getReport']),

    generate() {
      this.getReport({
        year: this.year,
        isAggregated: this.isAggregated
      })
        .then(res => {
          download(
            res.data,
            `yearly-report-${new Date().toLocaleDateString()}.docx`
          )
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
