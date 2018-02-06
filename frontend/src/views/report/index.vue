<template>
  <div>
    <h2>Reports</h2>
    <p>You can generate weekly or yearly report. </p>
    <div class="row">
      <div class="col-sm-5">
        <weekly-report/>
      </div>
      <div class="col-sm-5 offset-sm-2">
        <yearly-report/>
      </div>
    </div>
  </div>
</template>

<script>
import weeklyReport from './weekly.vue'
import yearlyReport from './yearly.vue'

export default {
  components: { weeklyReport, yearlyReport }
}
</script>

<style>

</style>
