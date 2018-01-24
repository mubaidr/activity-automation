<template lang='pug'>
 div
  h2 Activities
  p Please select a date to view or add activity details.
  .columns.clearfix(:class='{split : enableAdd}')
    .left
      flat-pickr(v-model="timeOfWeek" :config='datePciker.config')
    .right
      create-activity(:timeOfWeek='timeOfWeek' @close='timeOfWeek = ""')
  br
  blockquote.blockquote.text-center
    p.mb-0 {{quote}}
</template>

<script>
import { mapGetters } from 'vuex'
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
            date =>
              // console.log(date.getDay())
              date.getDay() === 5 || date.getDay() === 6
          ],
          locale: {
            firstDayOfWeek: 1
          },
          inline: true,
          static: true
        }
      },
      timeOfWeek: '',
      quote: ''
    }
  },
  methods: {
    ...mapGetters(['getQuotes']),
    getRandomQuote () {
      const quotes = this.getQuotes()
      const types = Object.keys(quotes)
      const rand = Math.floor(Math.random() * types.length)
      const list = quotes[types[rand]]
      const randQ = Math.floor(Math.random() * list.length)
      this.quote = list[randQ]
    }
  },
  computed: {
    enableAdd () {
      return !!this.timeOfWeek
    }
  },
  created () {
    this.getRandomQuote()
    setInterval(this.getRandomQuote, 7500)
  }
}
</script>

<style lang='stylus'>
/* Calendar input style*/
.columns{
  padding: 25px;
  height: 354px;
  overflow: hidden;

  .left, .right{
    float: left;
    padding: 0;
    will-change: width, opacity;
  }

  .left{
    text-align: center;
    width: 100%;
    transition: width 0.15s ease-out;
  }

  .right{
    width: 0;
    opacity: 0;
    border-radius: 5px;
    background-color: #fff;
    transition: none;
  }
}

.columns.split{
  .left{
    width: 36%;
  }

  .right{
    border:1px solid rgba(0,0,0,0.1);
    padding: 37px;
    width: 64%;
    opacity: 1;
    transition: opacity 0.15s ease-out 0.15s;
  }
}

@media (max-width: 990px) {
  .left{
    top: 5%;
  }
  .right{
    top: 5%;
    box-shadow: 0 0 40px rgba(0,0,0,0.25);
  }
}

@media (max-width: 767px) {
  .columns{
    position: relative;

    .left{
      position: absolute;
      left:0;
      width:100%;
    }

    .right{
      width:100%;
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
      width: 100%;
      padding: 37px 10px;
      box-shadow: none;
      transition: opacity 0.15s ease-out;
      z-index: auto;
    }
  }
}

/*flatpickr customization*/
.flatpickr-input{
  display: none!important;
}

.flatpickr-calendar.inline{
  box-shadow: none;
  top: 0;
  border:1px solid rgba(0,0,0,0.1);
}

.flatpickr-calendar{
  &::before{
    display: none;
  }
  &::after{
    display: none;
  }
}

.flatpickr-innerContainer{
  margin-top: 12px;
}

</style>
