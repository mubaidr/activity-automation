<template>
  <div class="create-activity"
       @keyup.native.esc="close()">
    <span class="title"
          v-html="day" />
    <textarea class="form-control"
              type="text"
              placeholder="Details"
              rows="4"
              name="description"
              ref="txt_description"
              v-model.trim="form.model.description"
              @keyup.native.esc="close()" />
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
    <br>
    <button class="btn btn-block btn-primary"
            :class="{'btn-danger': toDelete}"
            @click="submit"
            @disabled="errors.any() || isLoading">
      <span v-if="toClose">
        <span class="fi fi-x" /> Close
      </span>
      <span v-else-if="toSave">
        <span class="fi fi-download" /> Save
      </span>
      <span v-else-if="toUpdate && toDelete">
        <span class="fi fi-minus" /> Delete
      </span>
      <span v-else>
        <span class="fi fi-plus" /> Update
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
          this.form.model.description === this.activity.description)
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
      return `${days[d.getDay()]} - ${d.getDate()}/${d.getMonth() +
        1}/${d.getFullYear()}`
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

.form-check.custom {
  .form-check-label {
    padding-right: 32px
  }

  .form-check-input {
  }
}
</style>
