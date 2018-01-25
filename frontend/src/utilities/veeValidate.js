import Vue from 'vue'
import VeeValidate from 'vee-validate'

const config = {
  classes: true,
  classNames: {
    valid: 'valid',
    invalid: 'invalid'
  }
}

Vue.use(VeeValidate, config)

const dictionary = {
  en: {
    attributes: {
      confirmPassword: 'confirm password'
    }
  }
}

VeeValidate.Validator.localize(dictionary)
