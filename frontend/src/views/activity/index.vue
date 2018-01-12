<template lang='pug'>
 div
  h2 Activity
  create-activity
</template>

<script>
  import createActivity from './create.vue'

  export default {
    components: {
      'create-activity': createActivity
    },
    data () {
      return {
        activities: []
      }
    }
  }
</script>

<style lang='stylus'>
</style>
