<template lang='pug'>
  div
    vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated" ref="form")
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
        },
        schema: {
          groups: [
            {
              legend: '',
              fields: [
                {
                  model: 'description',
                  type: 'textArea',
                  placeholder: 'Activity details',
                  id: 'txt_description',
                  rows: 6,
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
    timeOfWeek(val) {
      this.form.model.time = val

      this.$nextTick(() => {
        document.getElementById('txt_description').focus()
      })

      if (!val) return

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
    onSubmit() {
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

<style lang='stylus'>
  .form-group.field-submit{
    display: inline-block;

    .btn:not(.btn-primary){
      margin-left: 10px;
    }
  }
</style>
