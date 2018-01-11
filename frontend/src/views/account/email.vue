<template lang='pug'>
  div.two-columns.must
    vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
</template>

<script>
  export default {
    data () {
      return {
        form: {
          model: {
            email: ''
          },
          schema: {
            groups: [
              {
                legend: '',
                fields: [
                  {
                    model: 'email',
                    type: 'input',
                    inputType: 'text',
                    label: '',
                    max: 255,
                    required: true,
                    validator: ['required', 'string', 'email']
                  },
                  {
                    type: 'submit',
                    buttonText: 'Update',
                    validateBeforeSubmit: true,
                    onSubmit: this.onSubmit,
                    disabled: this.disableSubmit,
                    fieldClasses: 'btn btn-primary btn-block'
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
        endpoint: '/api/account'
      }
    },
    created () {
      this.form.model.email = this.user.email
    },
    methods: {
      onSubmit () {
        this.axios
          .post(this.getEndpoint(), this.form.model)
          .then(res => {
            this.$store.commit('setAuthentication', res.data)
            swal(
              'Success!',
              'Email address has been updated successfuly.',
              'success'
            )
          })
          .catch(() => {
            this.form.model.email = this.user.email
            swal('Error', 'Please try again!', 'error')
          })
      }
    }
  }
</script>

<style lang='stylus'>
</style>
