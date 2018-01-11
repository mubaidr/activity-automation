<template lang='pug'>
  div
    transition(name='slide-up' mode='out-in' appear)
      header-template(v-if='isAuthenticated')
      header-template-anonymous(v-else)
    div.beta-banner
      .alert.alert-info
        span.badge.badge-info Beta
        | &nbsp;
        strong This is a new service &ndash; your &nbsp;
          router-link.alert-link(to='/feedback') feedback
        | &nbsp; will help us to improve it.
    .container.body
      transition(appear :name='transitionName' mode='out-in')
        router-view
    footer-template
</template>

<script>
  import headerAnonymous from './views/templates/header-anonymous.vue'
  import header from './views/templates/header.vue'
  import footer from './views/templates/footer.vue'

  export default {
    name: 'app',
    data () {
      return {
        transitionName: 'slide-up'
      }
    },
    components: {
      'header-template': header,
      'header-template-anonymous': headerAnonymous,
      'footer-template': footer
    },
    watch: {
      isAuthenticated (val) {
        if (val) {
          swal('You have successfuly logged in.', 'welcome!', 'success')
          if (this.$route.query.redirect) {
            this.$router.push({
              path: this.$route.query.redirect,
              query: {}
            })
          } else {
            this.$router.push('/home')
          }
        } else {
          swal('You have been logged out.', 'Good bye!', 'info')
          this.$router.push('/home')
        }
      },
      $route (to, from) {
        this.setTransition(to, from)
        // Trigger data fetch from mixins
        this.getCache()
      }
    },
    computed: {},
    methods: {
      setTransition (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth === fromDepth) {
          this.transitionName = 'slide-up'
        } else {
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
    }
  }
</script>

<style lang='stylus'>
</style>
