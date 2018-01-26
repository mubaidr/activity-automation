<template>
  <div class="create-activity">
    <div>
      <p>
        <span class="badge badge-info">{{ day }}</span>
      </p>
      <textarea
        class="form-control"
        type="text"
        placeholder="Details"
        rows="5"
        name="description"
        ref="txt_description"
        v-model="form.model.description"
        v-validate="'min:0|max:255'"
      />
      <span
        class="invalid-feedback"
        v-show="errors.has('description')"
        v-html="errors.first('description')"
      />
      <button
        class="btn btn-primary btn-block"
        @click="submit"
        @disabled="errors.any() || isLoading"
      >
        Save
      </button>
      <br>
      <button
        class="btn btn-default btn-sm"
        @click="close"
      >
        Cancel
      </button>
      <button
        class="btn btn-danger btn-sm"
        @click="remove"
        @disabled="errors.any() || isLoading"
        v-show="form.model.id"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateActivity',
  props: {
    timeOfWeek: {
      type: String,
      default: ''
    },
    activity: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        model: {
          id: null,
          description: '',
          time: this.timeOfWeek
        }
      }
    }
  },
  computed: {
    day() {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      const d = this.form.model.time
        ? new Date(this.form.model.time)
        : new Date()
      return `${days[d.getDay()]} - ${d.getDate()}/${d.getMonth() +
        1}/${d.getFullYear()}`
    }
  },
  watch: {
    timeOfWeek(val) {
      this.form.model.time = val

      if (!val) return

      this.$nextTick(() => {
        this.$refs.txt_description.focus()
      })

      this.getActivity(this.form.model)
        .catch(err => {
          swal('Oops!', err.message, 'error')
        })
        .then(res => {
          this.form.model = res.data.length
            ? res.data[0]
            : {
                id: null,
                description: '',
                time: val
              }
        })
    }
  },
  methods: {
    ...mapActions(['postActivity', 'removeActivity', 'getActivity']),

    submit() {
      this.postActivity(this.form.model)
        .catch(err => {
          swal('Oops!', err.message, 'error')
        })
        .then(() => {
          this.close()
        })
    },

    remove() {
      this.removeActivity(this.form.model)
        .catch(err => {
          swal('Oops!', err.message, 'error')
        })
        .then(() => {
          this.close()
        })
    },

    close() {
      this.form.model.id = ''
      this.form.model.description = ''
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus">
.create-activity {
  background-color: #fff
  border: 1px solid rgba(0, 0, 0, 0.1)
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5)
  max-width: 480px
  min-width: 340px
  padding: 15px
  text-align: center
  width: 100%
}
</style>
