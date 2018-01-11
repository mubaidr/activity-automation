<template lang='pug'>
  div.two-columns.must
    .text-center
      transition(appear name='slide-left' mode='out-in')
        img(:src='form.model.picture' alt='new picture' v-if='form.model.picture' class='avatar-picture')
        img(:src='form.model.currentPicture' alt='current picture' v-else class='avatar-picture')
    vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
</template>

<script>
  export default {
    data () {
      return {
        form: {
          model: {
            currentPicture: null,
            picture: null
          },
          schema: {
            fields: [
              {
                type: 'image',
                model: 'picture',
                label: '',
                required: true,
                hideInput: true,
                preview: false,
                validator: ['required']
              },
              {
                type: 'submit',
                buttonText: 'Upload',
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
        },
        endpoint: '/api/picture'
      }
    },
    methods: {
      onSubmit () {
        this.axios
          .post(this.getEndpoint(), this.form.model)
          .then(() => {
            swal(
              'Success!',
              'Profile picture has been updated successfuly.',
              'success'
            )
          })
          .catch(() => {
            swal('Error', 'Please try again!', 'error')
          })
      }
    },
    watch: {
      cache (val) {
        this.form.model.currentPicture = val
      }
    }
  }
</script>

<style lang='stylus'>
  .field-image {
    .preview {
      display: none !important; /* Hide preview */
    }
  }
</style>
