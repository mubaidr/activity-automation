<template>
  <div>
    <h2>Activities</h2>
    <p>Please select a date to view or add activity details.</p>
    <div
      class="columns clearfix"
      :class="{split : enableAdd}">
      <div class="left">
        <flat-pickr
          v-model="timeOfWeek"
          :config="datePciker.config"/>
      </div>
      <div class="right">
        <create-activity
          :time-of-week="timeOfWeek"
          @close="timeOfWeek = ''"/>
      </div>
    </div>
    <br>
    <blockquote class="blockquote text-center">
      <p class="mb-0">{{ quote }}</p>
    </blockquote>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import createActivity from './create.vue'

export default {
  components: {
    createActivity
  },
  data() {
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
  computed: {
    enableAdd() {
      return !!this.timeOfWeek
    }
  },
  created() {
    this.getRandomQuote()
    setInterval(this.getRandomQuote, 7500)
  },
  methods: {
    ...mapGetters(['getQuotes']),
    getRandomQuote() {
      const quotes = this.getQuotes()
      const types = Object.keys(quotes)
      const rand = Math.floor(Math.random() * types.length)
      const list = quotes[types[rand]]
      const randQ = Math.floor(Math.random() * list.length)
      this.quote = list[randQ]
    }
  }
}
</script>

<style lang="stylus">
/* Calendar input style*/
.columns{
  margin: 25px 0;
  min-height: 304px;

  .left, .right{
    float: left;
    overflow: hidden;
  }

  .left{
    width: 63%;
    padding-right: 1%;
    text-align: right;
    transition: width 0.5s ease;
  }

  .right{
    width: 36%;
    opacity: 0;
    z-index: 999;
    padding: 37px 15px;
    border-radius: 5px;
    background-color: #fff;
    border:1px solid rgba(0,0,0,0.1);
    transition: width 0.5s ease, opacity 0.5s ease;
    position: relative;

    &:before{
      content: '';
      width: 25px;
      height: 25px;
      position: absolute;
      top: 45%;
      left: -25px;
      border: 10px solid red;
    }
  }
}

.columns.split{
  .left{
    width: 36%;
  }

  .right{
    width: 64%;
    opacity: 1;
  }
}

@media (max-width: 990px) {
.columns{
    .left{
      top: 5%;
    }

    .right{
      top: 5%;
      box-shadow: 0 0 40px rgba(0,0,0,0.25);
    }
  }
}

@media (max-width: 767px) {
  .columns{
    position: relative;

    .left{
      text-align: center;
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
      //transition: opacity 0.15s ease-out;
      z-index: auto;
    }
  }
}

/*flatpickr customization*/
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
