<template lang='pug'>
  .row
    .col-lg-6.offset-lg-3
      .card.text-black.bg-light
        .card-body
          h2 Login
          p Please provide username and password to continue.
          br
          vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
          router-link.btn-link(to='/auth/recover') Forgot password?
          | &nbsp;
          router-link.btn-link(to='/auth/register') Don't have an account?
</template>

<script>
  export default {
    data () {
      return {
        form: {
          model: {
            username: 'tim',
            password: 'tim-password'
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
                min: 6,
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
                type: 'submit',
                buttonText: 'Login',
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
      onSubmit () {}
    }
  }
</script>

<style lang='stylus'>
</style>
