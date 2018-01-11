import Vue from 'vue'

const mixin = {
  data () {
    return {
      cache: null,
      isValid: true
    }
  },
  methods: {
    // submit handlers
    onStepBack () {
      if (this.applicationStep === 0) {
        swal({
          title: 'Are you sure you want to leave?',
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
          }
        }).then(confirm => {
          if (confirm) {
            this.$store.dispatch('gotoPreviousStep')
          }
        })
      } else {
        this.$store.dispatch('gotoPreviousStep')
      }
    },
    onSubmit () {},
    // Generic form properties
    onValidated (validity) {
      this.isValid = validity
    },
    // Data fetch
    getCache () {
      if (!this.endpoint) return

      this.axios
        .get(this.getEndpoint())
        .then(res => {
          this.cache = res.data
        })
        .catch(() => {
          this.cache = null
        })
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
    },
    applicationSteps () {
      return this.$store.getters.getApplicationSteps
    },
    applicationStep () {
      return this.$store.getters.getApplicationStep
    }
  }
}

Vue.mixin(mixin)
