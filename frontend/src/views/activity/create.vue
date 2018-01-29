<template>
  <div class="create-activity"
       @click.self="close"
       @keyup.enter="submit"
       @keyup.esc="close">
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
              v-validate="'min:0|max:255'"
              @keyup.esc="close" />
    <span class="invalid-feedback"
          v-show="errors.has('description')"
          v-html="errors.first('description')" />
    <button class="btn btn-primary btn-block"
            @click="submit"
            @disabled="errors.any() || isLoading">
      <transition appear
                  name="list-in"
                  mode="out-in">
        <span v-if="isNew">Save</span>
        <span v-else>Update</span>
      </transition>
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
    },
    isCleared() {
      return this.form.model.id && !this.form.model.description
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
      if (this.isNew || this.isUpdated) {
        this.save()
      } else {
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
  padding: 35px
  border: 1px solid rgba(0, 0, 0, 0.1)
  background-color: #fff
  text-align: center
  border-radius: 4px
}
</style>
