import Vue from 'vue'

const mixin = {
  data () {
    return {
      isValid: true
    }
  },
  methods: {
    // Generic form properties
    onValidated (validity) {
      this.isValid = validity
    }
  },
  computed: {
    disableSubmit () {
      return !this.isValid || this.$store.getters.isLoading
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    isLoading () {
      return this.$store.getters.isLoading
    },
    user () {
      return this.$store.getters.user
    }
  }
}

Vue.mixin(mixin)
