<template lang='pug'>
  .card.text-black.bg-light
    .card-body
      h3 Add an activity
      br
      vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
      router-link.btn-link(to='/activity') View activities
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
          description: 'Some Activity',
          time: Date.now()
        },
        schema: {
          fields: [
            {
              model: 'description',
              type: 'textArea',
              label: 'Description',
              rows: 6,
              max: 255,
              required: true,
              validator: ['required', 'string']
            },
            {
              model: 'time',
              type: 'FlatPickrVfg',
              label: 'Day',
              required: true,
              validator: ['required', 'string', 'date'],
              placeholder: 'Pick a date'
            },
            {
              type: 'submit',
              buttonText: 'Add',
              validateBeforeSubmit: true,
              onSubmit: this.onSubmit,
              disabled: this.disableSubmit,
              fieldClasses: 'btn btn-primary btn-block'
            }
          ]
        },
        options: {
          validateAfterLoad: false,
          validateAfterChanged: true
        }
      }
    }
  },
  watch: {
    timeOfWeek () {
      this.time = this.timeOfWeek
    }
  },
  methods: {
    ...mapActions(['postActivity', '']),
    onSubmit () {
      this.postActivity(this.form.model)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>

<style lang='stylus'>
</style>
