<template>
  <div>
    <h2>Reports</h2>
    <h3>Weekly</h3>
    <weekly-report/>
    <h3>Yearly</h3>
    <yearly-report/>
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
