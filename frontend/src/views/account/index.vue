<template lang='pug'>
  .row
    .col-lg-6.offset-lg-3
      h2 Account
      hr
      h5 Username
      username-view
      hr
      h5 Password
      password-view
</template>

<script>
import passwordView from './password.vue'
import usernameView from './username.vue'

export default {
  components: {
    'password-view': passwordView,
    'username-view': usernameView
  }
}
</script>

<style lang='stylus'>
</style>
