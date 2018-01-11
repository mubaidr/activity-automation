<template lang='pug'>
  div
    p(class='text-center')
      |Application for {{vacancy.CAT_DESIG.description + '-' + vacancy.CAT_DESIG.CAT_PAYSCALE.description}}
    br
    h3
      small(class="text-muted") Step {{applicationStep}} of {{applicationSteps}}
    transition-group(name='slide-left' mode='out-in')
      candidate(v-if='applicationStep === 1' key='applicationStep')
      academic(v-if='applicationStep === 2' key='applicationStep')
      experience(v-if='applicationStep === 3' key='applicationStep')
      course(v-if='applicationStep === 4' key='applicationStep')
      publication(v-if='applicationStep === 5' key='applicationStep')
      submit(v-if='applicationStep === 6' key='applicationStep')
</template>

<script>
  import candidate from './candidate.vue'
  import academic from './academic.vue'
  import experience from './experience.vue'
  import course from './course.vue'
  import publication from './publication.vue'
  import submit from './submit.vue'

  export default {
    components: {
      candidate,
      academic,
      experience,
      course,
      publication,
      submit
    },
    computed: {
      vacancy () {
        return this.$store.getters.getVacancy
      }
    }
  }
</script>

<style lang='stylus'>
  .text-underline {
    text-decoration underline
  }
</style>
