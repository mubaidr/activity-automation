<template>
  <div class="create-activity"
       @keyup.enter="submit"
       @keyup.esc="close">
    <span class="title"
          v-html="day" />
    <textarea class="form-control"
              type="text"
              placeholder="Details"
              rows="6"
              name="description"
              ref="txt_description"
              v-model.trim="form.model.description"
              @keyup.esc="close" />
    <span class="invalid-feedback"
          v-show="errors.has('description')"
          v-html="errors.first('description')" />
    <button class="btn btn-block btn-primary"
            :class="{'btn-danger': isCleared}"
            @click="submit"
            @disabled="errors.any() || isLoading">
      <span v-if="isEmpty || !isUpdated">Close</span>
      <span v-else-if="isUpdated || isCleared">Update</span>
      <span v-else>Save</span>
    </button>
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
      },
      activity: null
    }
  },
  computed: {
    isNew() {
      return !this.form.model.id
    },
    isUpdated() {
      return (
        !this.isNew && this.form.model.description !== this.activity.description
      )
    },
    isCleared() {
      return this.isUpdated && !this.form.model.description
    },
    isEmpty() {
      return this.isNew && !this.form.model.description
    },
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
          this.activity = null
          swal('Oops!', err.message, 'error')
        })
        .then(res => {
          this.activity = res.data.length
            ? res.data[0]
            : {
                id: null,
                description: '',
                time: val
              }

          this.$set(this.form.model, this.activity)
        })
    },
    activity(a) {
      if (a) {
        this.form.model.description = a.description
        this.form.model.id = a.id
      } else {
        this.form.model.description = ''
        this.form.model.id = null
      }
    }
  },
  methods: {
    ...mapActions(['postActivity', 'removeActivity', 'getActivity']),

    submit() {
      if (this.isEmpty) {
        this.close()
      } else if (this.isCleared) {
        swal({
          title: `Clear activity for this day?`,
          text: `${this.day}`,
          icon: 'warning',
          buttons: {
            cancel: {
              text: 'Cancel',
              visible: true
            },
            confirm: {
              text: 'Yes'
            }
          },
          dangerMode: true
        }).then(confirm => {
          if (confirm) {
            this.remove()
          } else {
            this.close()
          }
        })
      } else {
        this.save()
      }
    },

    save() {
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
      this.$emit('close')
      this.form.model.id = ''
      this.form.model.description = ''
    }
  }
}
</script>

<style lang="stylus">
.create-activity {
  min-width: 272px
  padding: 15px
  border: 3px solid rgba(0, 0, 0, 0.05)
  border-radius: 4px
  background-color: #fff
  text-align: center

  .title {
    display: block
    font-size: large
    color: #000
    margin-top: 15px
    margin-bottom: 27px
  }
}
</style>
