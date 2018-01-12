<template lang='pug'>
  div
    vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
</template>

<script>
  export default {
    data () {
      return {
        form: {
          model: {
            password: '',
            confirmPassword: ''
          },
          schema: {
            groups: [
              {
                legend: '',
                fields: [
                  {
                    type: 'input',
                    inputType: 'password',
                    autocomplete: true,
                    label: 'Password',
                    model: 'password',
                    placeholder: 'Password',
                    min: 8,
                    max: 16,
                    required: true,
                    validator: ['required']
                  },
                  {
                    type: 'input',
                    inputType: 'password',
                    autocomplete: true,
                    label: 'Confirm Password',
                    model: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    min: 8,
                    max: 16,
                    required: true,
                    validator: [
                      'required',
                      (value, field, model) =>
                        value === model.password
                          ? []
                          : [
                              'Password and Confirm Password fields does not match'
                            ]
                    ]
                  },
                  {
                    type: 'submit',
                    buttonText: 'Update password',
                    validateBeforeSubmit: true,
                    onSubmit: this.onSubmit,
                    disabled: this.disableSubmit,
                    fieldClasses: 'btn btn-warning btn-block'
                  }
                ]
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
      onSubmit () {}
    }
  }
</script>

<style lang='stylus'>
</style>
