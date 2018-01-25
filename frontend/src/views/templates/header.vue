<template lang='pug'>
  nav.navbar.navbar-expand-lg.navbar-dark.bg-dark
    ul.navbar-nav
      li.nav-item
        span.navbar-brand AMS
      li.nav-item
        router-link.nav-link(to='/home') Home
      li.nav-item
        router-link.nav-link(to='/about') About
      li.nav-item
        router-link.nav-link(to='/activity') Activities
    ul.navbar-nav.ml-auto
      li.nav-item
        router-link.nav-link(to='/account') My Account
      li.nav-item
        span.nav-link.custom-link(@click='confirmLogout') Logout
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HeaderTemplate',
  methods: {
    ...mapActions(['logout']),
    confirmLogout() {
      swal({
        title: 'Are you sure you want to logout?',
        text: '',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancel',
            visible: true
          },
          confirm: {
            text: 'Yes'
          }
        },
        dangerMode: true
      }).then(confirm => {
        if (confirm) {
          this.logout()
        }
      })
    }
  }
}
</script>

<style lang='stylus'>
  .custom-link {
    cursor pointer
  }
</style>
