<template lang='pug'>
  .row
    .col-lg-6.offset-lg-3
      h2 Account
      br
      h5 Profile Picture
      picture-view
      hr
      h5 Email Address
      email-view
      hr
      h5 Password
      password-view
</template>

<script>
  import pictureView from './picture.vue'
  import passwordView from './password.vue'
  import emailView from './email.vue'

  export default {
    components: {
      'picture-view': pictureView,
      'password-view': passwordView,
      'email-view': emailView
    }
  }
</script>

<style lang='stylus'>
</style>
