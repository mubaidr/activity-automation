<template lang='pug'>
 div
  //h2 Activity
  div.text-center.scaled-content
    flat-pickr(v-model="timeOfWeek" :config='datePciker.config' :on-change='onDateChange')
  div(v-show='addActivity')
    create-activity(:timeofWeek='timeOfWeek')
</template>

<script>
import createActivity from './create.vue'

export default {
  components: {
    createActivity
  },
  data () {
    return {
      datePciker: {
        config: {
          inline: true,
          static: true
        }
      },
      timeOfWeek: Date.now(),
      addActivity: false,
      activities: []
    }
  },
  methods: {
    onDateChange () {
      swal('yo')
    }
  }
}
</script>

<style lang='stylus'>
@media (min-width: 540px) {
  .scaled-content{
    min-height: 520px;
    padding-top: 10px;
  }

  .flatpickr-wrapper{
    transform: scale(1.5);
    transform-origin: top center;
  }
}

.flatpickr-input{
  display: none!important;
}

.flatpickr-innerContainer{
  margin-top: 10px;
}

.flatpickr-calendar{
  &::before{
    display: none;
  }
  &::after{
    display: none;
  }
}
</style>
