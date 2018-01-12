<template lang='pug'>
  .row
    .col-lg-6.offset-lg-3
      .card.text-black.bg-light
        .card-body
          h2 Register
          p Please provide required information to create an account.
          br
          vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
          router-link.btn-link(to='/auth/login') Already have an account?
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        form: {
          model: {
            password: 'tim-password',
            confirmPassword: 'tim-password',
            username: 'tim',
            name: 'Minion'
          },
          schema: {
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Username',
                model: 'username',
                placeholder: 'username',
                required: true,
                min: 3,
                max: 16,
                validator: ['required', 'string']
              },
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
                validator: ['required', 'string']
              },
              {
                type: 'input',
                inputType: 'password',
                autocomplete: true,
                label: 'Confirm Password',
                model: 'confirmPassword',
                placeholder: 'Password',
                min: 8,
                max: 16,
                required: true,
                validator: [
                  'required',
                  'string',
                  (value, field, model) =>
                    value === model.password
                      ? []
                      : ['Password and Confirm Password fields does not match']
                ]
              },
              {
                type: 'submit',
                buttonText: 'Register',
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
      ...mapActions(['register']),
      onSubmit () {
        this.register(this.form.model)
      }
    }
  }
</script>

<style lang='stylus'>
</style>
