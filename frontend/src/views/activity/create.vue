<template lang='pug'>
  div
    vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'create-activity',
  props: ['timeOfWeek'],
  data () {
    return {
      form: {
        model: {
          id: null,
          description: '',
          time: Date.now()
        },
        schema: {
          groups: [
            {
              legend: 'Add activity',
              fields: [
                {
                  model: 'description',
                  type: 'textArea',
                  // label: 'Description',
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
                  onSubmit: this.cancel,
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
          validateAfterChanged: true
        }
      },
      activity: null
    }
  },
  watch: {
    timeOfWeek () {
      this.time = this.timeOfWeek
    }
  },
  created () {
    if (this.timeOfWeek) {
      this.time = this.timeOfWeek
    }
  },
  methods: {
    ...mapActions(['postActivity', 'removeActivity']),
    onSubmit () {
      this.postActivity(this.form.model)
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.$emit('cancel')
        })
    },
    cancel () {
      this.description = ''
      this.$emit('cancel')
    },
    remove () {
      this.removeActivity(this.form.model)
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.$emit('cancel')
        })
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
