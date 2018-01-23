<template lang='pug'>
 div
  h2 Activities
  p Please select a date to view or add activity details.
  .columns.clearfix(:class='{split : enableAdd}')
    .left
      flat-pickr(v-model="timeOfWeek" :config='datePciker.config')
    .right
      create-activity(:timeOfWeek='timeOfWeek' @close='timeOfWeek = ""')
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
          maxDate: 'today',
          minDate: new Date().fp_incr(-7),
          disable: [
            date => {
              console.log(date.getDay())
              return date.getDay() === 5 || date.getDay() === 6
            }
          ],
          locale: {
            firstDayOfWeek: 1
          },
          inline: true,
          static: true,
          weekNumbers: true
        }
      },
      timeOfWeek: ''
    }
  },
  computed: {
    enableAdd () {
      return !!this.timeOfWeek
    }
  }
}
</script>

<style lang='stylus'>
/* Calendar input style*/
.columns{
  padding: 25px;
  overflow: hidden;
  min-height: 500px;

  .left, .right{
    float: left;
    padding: 0;
    will-change: width, transform, opacity;
  }

  .left{
    text-align: center;
    width: 100%;
    transition: width 0.15s ease-out, transform 0.15s ease-out;
    transform: scale(1.5) translateY(20%)
  }

  .right{
    width: 0;
    opacity: 0;
    padding: 25px;
    background-color: #fff;
    box-shadow: 0 0 40px rgba(0,0,0,0.5);
  }
}

.columns.split{
  .left{
    width: 25%;
    transform: scale(0.6);
  }

  .right{
    width: 75%;
    opacity: 1;
    transition: opacity 0.15s ease-out 0.15s;
  }
}

@media (max-width: 767px) {
  .columns{
    position: relative;

    .left{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      transform: scale(1) translateY(0)
    }

    .right{
      width:100%;
      top:0;
      left:0;
      position: absolute;
      z-index: -1;
    }
  }

  .columns.split{
    .left{
      width: 100%;
    }

    .right{
      width: 90%;
      margin: 5%;
      box-shadow: 0 0 25px rgba(0,0,0,0.25);
      transition: opacity 0.15s ease-out;
      z-index: auto;
    }
  }
}

/*flatpickr customization*/
.flatpickr-input{
  display: none!important;
}

.flatpickr-calendar{
  box-shadow: none;
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
