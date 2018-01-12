<template lang='pug'>
  div.two-columns.must
    vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        form: {
          model: {
            username: ''
          },
          schema: {
            groups: [
              {
                legend: '',
                fields: [
                  {
                    model: 'username',
                    type: 'input',
                    inputType: 'text',
                    label: '',
                    required: true,
                    min: 3,
                    max: 16,
                    validator: ['required', 'string']
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
        }
      }
    },
    created () {
      this.form.model.username = this.user.username
    },
    methods: {
      ...mapActions(['updateLogin']),
      onSubmit () {
        this.updateLogin()
      }
    }
  }
</script>

<style lang='stylus'>
</style>
