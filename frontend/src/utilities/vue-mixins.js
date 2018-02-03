import Vue from 'vue'
import { mapGetters } from 'vuex'

const mixin = {
  computed: {
    ...mapGetters(['randomQuote', 'isLoading', 'isAuthenticated', 'user'])
  },
  methods: {
    hasClass(el, className) {
      if (el.classList) return el.classList.contains(className)
      return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`))
    },

    addClass(el, classNames) {
      classNames.forEach(className => {
        if (el.classList) el.classList.add(className)
        else if (!this.hasClass(el, className))
          // eslint-disable-next-line
          el.className += ` ${className}`
      })
    },

    removeClass(el, classNames) {
      classNames.forEach(className => {
        if (el.classList) el.classList.remove(className)
        else if (this.hasClass(el, className)) {
          const reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
          // eslint-disable-next-line
          el.className = el.className.replace(reg, ' ')
        }
      })
    }
  }
}

Vue.mixin(mixin)
