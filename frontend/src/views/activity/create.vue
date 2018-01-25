<template>
  <div>
    <div class="form-group">
      <textarea
        class="form-control"
        type="text"
        placeholder="description"
        rows="6"
        name="description"
        ref="txt_description"
        v-model="form.model.description"
        v-validate="'required|min:2|max:255'"
      />
      <span
        class="invalid-feedback"
        v-show="errors.has('description')"
        v-html="errors.first('description')"
      />
      <button
        class="btn btn-primary"
        @click="submit"
        @disabled="errors.any() || isLoading"
      >
        Save
      </button>
      <button
        class="btn btn-default"
        @click="close"
      >
        Cancel
      </button>
      <button
        class="btn btn-danger"
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
      this.description = ''
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus">
.form-group.field-submit {
  display: inline-block

  .btn:not(.btn-primary) {
    margin-left: 10px
  }
}
</style>
