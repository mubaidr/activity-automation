<template>
  <div class="create-activity"
       @keyup.native.esc="close()">
    <span class="title"
          v-html="day" />
    <textarea class="form-control"
              type="text"
              placeholder="Details"
              rows="6"
              name="description"
              ref="txt_description"
              v-model.trim="form.model.description"
              @keyup.native.esc="close()" />
    <span class="invalid-feedback"
          v-show="errors.has('description')"
          v-html="errors.first('description')" />
    <button class="btn btn-block btn-primary"
            :class="{'btn-danger': toDelete}"
            @click="submit"
            @disabled="errors.any() || isLoading">
      <span v-if="toClose">Close</span>
      <span v-else-if="toSave">Save</span>
      <span v-else-if="toUpdate">Update</span>
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
      activity: {
        id: null,
        description: ''
      }
    }
  },
  computed: {
    toClose() {
      return (
        (!this.form.model.id && !this.form.model.description) ||
        (this.form.model.id &&
          this.form.model.description === this.activity.description)
      )
    },
    toSave() {
      return !this.form.model.id && this.form.model.description
    },
    toUpdate() {
      return (
        this.form.model.id &&
        this.form.model.description !== this.activity.description
      )
    },
    toDelete() {
      return this.toUpdate && !this.form.model.description
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
      this.activity = {
        id: null,
        description: ''
      }
      if (!val) return

      this.$nextTick(() => {
        this.$refs.txt_description.focus()
      })

      this.getActivity(this.form.model)
        .catch(err => {
          swal('Oops!', err.message, 'error')
        })
        .then(res => {
          if (res.data.length) {
            // eslint-disable-next-line
            this.activity = res.data[0]
          }
        })
    },
    activity(a) {
      this.form.model.id = a.id
      this.form.model.description = a.description
    }
  },
  methods: {
    ...mapActions(['postActivity', 'removeActivity', 'getActivity']),

    submit() {
      if (this.toClose) {
        this.close()
      } else if (this.toUpdate && this.toDelete) {
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
      this.activity = {
        id: null,
        description: ''
      }
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
