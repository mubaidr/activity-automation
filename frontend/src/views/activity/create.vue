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
    data () {
      return {
        form: {
          model: {
            description: '',
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
                type: 'input',
                inputType: 'text',
                label: 'Time',
                model: 'time',
                placeholder: 'Choose a time',
                required: true,
                validator: ['required', 'date']
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
    methods: {
      ...mapActions(['postActivity']),
      onSubmit () {
        this.postActivity(this.form.model)
      }
    }
  }
</script>

<style lang='stylus'>
</style>
