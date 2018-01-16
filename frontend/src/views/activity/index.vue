<template lang='pug'>
 div
  h2 Activities
  p Please select a date to view activities or add a new one.
  .columns.clearfix(:class='{split : enableAdd}')
    .left
      flat-pickr(v-model="timeOfWeek" :config='datePciker.config' @on-change='onDateChange')
    .right
      create-activity(@cancel='timeOfWeek = ""')
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
      timeOfWeek: '',
      activities: []
    }
  },
  computed: {
    enableAdd () {
      return !!this.timeOfWeek
    }
  },
  methods: {
    onDateChange (selectedDates) {
      if (selectedDates.length > 0) {
        // swal('yo')
      }
    }
  }
}
</script>

<style lang='stylus'>
.columns{
  margin-top: 25px;
  overflow: hidden;
  min-height: 500px;

  .left, .right{
    float: left;
    padding: 0;
    will-change: width, transform, opacity;
  }

  .left{
    width: 100%;
    text-align: center;
    transition: width 0.25s ease-out, transform 0.25s ease-out;
    transform: scale(1.5) translateY(25%)
  }

  .right{
    width: 0;
    opacity: 0;
  }
}

.columns.split{
  .left{
    width: 33%;
    padding-right: 20px;
    transform: scale(1)
  }

  .right{
    width: 66%;
    opacity: 1;
    padding-left: 20px;
    transition: opacity 0.25s ease-out 0.25s;

    &:before{
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 0;
      height: 0;
      border-top: 135px solid transparent;
      border-bottom: 135px solid transparent;
      border-right: 20px solid rgba(0,0,0,0.1);
    }
  }
}

@media (max-width: 540px) {
  .columns{
    .left, .right{
      float: none;
      display: block;
      width: 100%!important;
      transform: scale(1);
      padding: 20px;
    }
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
