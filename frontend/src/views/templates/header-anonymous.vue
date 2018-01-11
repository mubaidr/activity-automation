<template lang='pug'>
  nav.navbar.navbar-expand-lg.navbar-dark.bg-primary
    ul.navbar-nav
      li.nav-item
        span.navbar-brand ORS Node.js
      li.nav-item
        router-link.nav-link(to='/home') Home
      li.nav-item
        router-link.nav-link(to='/about') About
      li.nav-item
        router-link.nav-link(to='/careers') Careers
    ul.navbar-nav.ml-auto
      li.nav-item
        router-link.nav-link(to='/auth/login') Login
      li.nav-item
        router-link.nav-link(to='/auth/register') Register
</template>

<script>
  export default {
    name: 'header-template-anonymous'
  }
</script>

<style lang='stylus'>
</style>
