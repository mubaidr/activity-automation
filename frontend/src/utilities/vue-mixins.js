import Vue from 'vue'
import { mapGetters } from 'vuex'

const mixin = {
  data () {
    return {
      isValid: true
    }
  },
  methods: {
    ...mapGetters(['isLoading', 'isAuthenticated', 'user']),
    // Generic form properties
    onValidated (validity) {
      this.isValid = validity
    }
  },
  computed: {
    disableSubmit () {
      return !this.isValid || this.isLoading
    }
  }
}

Vue.mixin(mixin)
