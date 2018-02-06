<template>
  <div class="create-activity">
    <button class="close custom"
            @click="close">
      <span class="fi-x" />
    </button>
    <span class="title"
          v-html="day" />
    <textarea class="form-control"
              type="text"
              placeholder="Enter activities performed on this day"
              rows="4"
              name="description"
              ref="txt_description"
              v-model.trim="form.model.description"
              @keyup.esc="close()" />
    <span class="invalid-feedback"
          v-show="errors.has('description')"
          v-html="errors.first('description')" />

    <div class="form-check custom">
      <label class="form-check-label"
             v-for="status in activityStatus"
             :key="status.id">
        <input type="radio"
               class="form-check-input"
               name="rb_status"
               v-model="form.model.activityStatusId"
               :value="status.id"
               checked=""> {{ status.description }}
      </label>
    </div>
    <button class="btn btn-block btn-dark"
            :class="{'btn-danger': toDelete}"
            @click="submit"
            @disabled="errors.any() || isLoading">
      <span v-if="toClose">
        <span class="fi fi-x" /> Close
      </span>
      <span v-else-if="toSave">
        <span class="fi fi-download" /> Save Log
      </span>
      <span v-else-if="toUpdate && toDelete">
        <span class="fi fi-minus" /> Delete Log
      </span>
      <span v-else>
        <span class="fi fi-plus" /> Update Log
      </span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CreateActivity',

  props: {
    activity: {
      type: Object,
      default() {
        return {
          time: new Date()
        }
      }
    }
  },

  data() {
    return {
      form: {
        model: {
          id: null,
          description: '',
          activityStatusId: 2,
          time: new Date()
        }
      }
    }
  },

  computed: {
    ...mapGetters(['activityStatus']),

    toClose() {
      return (
        (!this.form.model.id && !this.form.model.description) ||
        (this.form.model.id &&
          this.form.model.description === this.activity.description &&
          this.form.model.activityStatusId === this.activity.activityStatusId)
      )
    },

    toSave() {
      return !this.form.model.id && this.form.model.description
    },

    toUpdate() {
      return (
        this.form.model.id &&
        (this.form.model.description !== this.activity.description ||
          this.form.model.activityStatusId !== this.activity.activityStatusId)
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
      return `${days[d.getDay()]}<span>${d.getDate()}/${d.getMonth() +
        1}/${d.getFullYear()}</span>`
    }
  },

  watch: {
    activity(a) {
      const cloned = JSON.parse(JSON.stringify(a))
      this.$set(this.form, 'model', cloned)

      this.$nextTick(() => {
        this.$refs.txt_description.focus()
      })
    }
  },

  methods: {
    ...mapActions(['postActivity', 'removeActivity']),

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
      this.postActivity({ ...this.form.model })
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
    }
  }
}
</script>

<style lang="stylus">
.create-activity {
  min-width: 272px
  padding: 15px 25px
  border: 1px solid rgba(0, 0, 0, 0.25)
  border-radius: 4px
  background-color: #fff
  text-align: center
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5)

  .title {
    display: block
    font-size: large
    color: #000
    // margin-top: 10px
    margin-bottom: 15px
    text-align: left
    opacity: 0.5

    span {
      display: block
      font-size: 0.75rem
      opacity: 0.75
    }
  }

  textarea {
    font-size: 1rem
  }
}

.form-check.custom {
  margin-bottom: 25px

  .form-check-label {
    padding-right: 48px
    cursor: pointer
  }

  .form-check-input {
  }
}

.close.custom {
  padding: 20px
  position: absolute
  top: 0
  right: 0
  z-index: 1
}
</style>
