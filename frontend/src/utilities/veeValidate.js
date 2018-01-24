import vue from 'vue'
import vv from 'vee-validate'

const config = {
  classes: true,
  classNames: {
    valid: 'valid',
    invalid: 'invalid'
  }
}

vue.use(vv, config)
