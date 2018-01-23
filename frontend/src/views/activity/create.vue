<template lang='pug'>
  div
    vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'create-activity',
  props: ['timeOfWeek', 'activity'],
  data () {
    return {
      form: {
        model: {
          id: null,
          description: '',
          time: this.timeOfWeek
        },
        schema: {
          groups: [
            {
              legend: 'Add activity',
              fields: [
                {
                  model: 'description',
                  type: 'textArea',
                  placeholder: 'Activity details',
                  rows: 4,
                  min: 4,
                  max: 255,
                  required: true,
                  validator: ['required', 'string']
                }
              ]
            },
            {
              legend: '',
              fields: [
                {
                  type: 'submit',
                  buttonText: 'Save',
                  validateBeforeSubmit: true,
                  onSubmit: this.onSubmit,
                  disabled: () =>
                    this.disableSubmit ||
                    (this.activity &&
                      this.form.model.description ===
                        this.activity.description),
                  fieldClasses: 'btn btn-primary'
                },
                {
                  type: 'submit',
                  buttonText: 'Cancel',
                  validateBeforeSubmit: false,
                  onSubmit: this.close,
                  fieldClasses: 'btn btn-default'
                },
                {
                  type: 'submit',
                  buttonText: 'Delete',
                  validateBeforeSubmit: false,
                  onSubmit: this.remove,
                  disabled: () => this.activity,
                  visible: () => this.activity && this.activity.id,
                  fieldClasses: 'btn btn-danger'
                }
              ]
            }
          ]
        },
        options: {
          validateAfterLoad: false,
          validateAfterChanged: false
        }
      }
    }
  },
  watch: {
    timeOfWeek () {
      this.form.model.time = this.timeOfWeek

      if (!this.timeOfWeek) return
      this.getActivity(this.form.model)
        .catch(err => {
          swal('Oops!', err.message, 'error')
        })
        .then(res => {
          if (res.length) {
            this.form.model.id = res[0].id
            this.form.model.description = res[0].description
          }
        })
    },
    activity (val) {
      this.form.model = val
    }
  },
  methods: {
    ...mapActions(['postActivity', 'removeActivity', 'getActivity']),
    onSubmit () {
      this.postActivity(this.form.model)
        .catch(err => {
          swal('Oops!', err.message, 'error')
        })
        .then(() => {
          this.close()
        })
    },
    remove () {
      this.removeActivity(this.form.model)
        .catch(err => {
          swal('Oops!', err.message, 'error')
        })
        .then(() => {
          this.close()
        })
    },
    close () {
      this.description = ''
      this.$emit('close')
    }
  }
}
</script>

<style lang='stylus'>
  .form-group.field-submit{
    display: inline-block;

    .btn:not(.btn-primary){
      margin-left: 10px;
    }
  }
</style>
