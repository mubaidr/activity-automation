<template lang='pug'>
 div
  h2 Activities
  p Please select a date to view activities or add a new one.
  button(@click='timeOfWeek = ""') Remove Date
  .columns.clearfix(:class='{split : enableAdd}')
    .left
      flat-pickr(v-model="timeOfWeek" :config='datePciker.config' @on-change='onDateChange')
    .right
      pre {{$data}}
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
  padding-top: 25px;

  .left, .right{
    float: left;
    will-change: width;
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
    transition: width 0.25s ease-out, opacity 0.25s ease-out;
  }
}

.columns.split{
  .left{
    width: 25%;
    padding-right: 20px;
    transform: scale(1)
  }

  .right{
    width: 75%;
    padding-left: 20px;
    opacity: 1;
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
