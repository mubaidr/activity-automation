<template>
  <div class="create-activity">
    <p>
      <span class="badge badge-secondary">{{ day }}</span>
    </p>
    <textarea class="form-control"
              type="text"
              placeholder="Details"
              rows="5"
              name="description"
              ref="txt_description"
              v-model.trim="form.model.description"
              v-validate="'min:0|max:255'" />
    <span class="invalid-feedback"
          v-show="errors.has('description')"
          v-html="errors.first('description')" />
    <button class="btn btn-primary btn-block"
            @click="submit"
            @disabled="errors.any() || isLoading">
      <transition appear
                  name="list-in"
                  mode="out-in">
        <span v-if="isNew">Save & Close</span>
        <span v-else-if="isUpdated">Update & Close</span>
        <span v-else>Delete & Close</span>
      </transition>
    </button>

    <!-- <br>
    <button class="btn btn-default btn-sm"
            @click="close">
      Cancel
    </button>
    <button class="btn btn-danger btn-sm"
            @click="remove"
            @disabled="errors.any() || isLoading"
            v-show="form.model.id">
      Delete
    </button> -->
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
    },
    isNew() {
      return !this.form.model.id
    },
    isUpdated() {
      return this.form.model.id && this.form.model.description
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
      if (!this.form.model.description) {
        this.remove()
      } else {
        this.postActivity(this.form.model)
          .catch(err => {
            swal('Oops!', err.message, 'error')
          })
          .then(() => {
            this.close()
          })
      }
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
  min-width: 272px
  padding: 35px
  border: 1px solid rgba(0, 0, 0, 0.1)
  background-color: #fff
  text-align: center
  border-radius: 4px
}
</style>
