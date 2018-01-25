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
        router-link.nav-link(to='/auth/login') Login
      li.nav-item
        router-link.nav-link(to='/auth/register') Register
</template>

<script>
export default {
  name: 'HeaderTemplateAnonymous'
}
</script>

<style lang='stylus'>
</style>
