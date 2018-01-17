import Vue from 'vue'
import { mapGetters } from 'vuex'

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
    ...mapGetters(['isLoading', 'isAuthenticated', 'user']),
    disableSubmit () {
      return !this.isValid || this.isLoading
    }
  }
}

Vue.mixin(mixin)
