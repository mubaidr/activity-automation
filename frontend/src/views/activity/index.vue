<template lang='pug'>
 div
  h2 Activity
  create-activity(:timeofWeek='timeOfWeek')
</template>

<script>
// import Calendar from 'vue2-slot-calendar'
import createActivity from './create.vue'

export default {
  components: {
    // Calendar,
    'create-activity': createActivity
  },
  data () {
    return {
      timeOfWeek: '',
      activities: []
    }
  }
}
</script>

<style lang='stylus'>
</style>
