<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label>Password</label>
      <input class="form-control"
             type="password"
             autocomplete="new-password"
             placeholder="Password"
             name="password"
             v-model="form.model.password"
             v-validate="'required|min:6|max:16'">
      <span class="invalid-feedback"
            v-show="errors.has('password')"
            v-html="errors.first('password')" />
    </div>

    <div class="form-group">
      <label>Confirm Password</label>
      <input class="form-control"
             type="password"
             autocomplete="new-password"
             placeholder="Confirm Password"
             name="confirmPassword"
             v-model="form.model.confirmPassword"
             v-validate="'confirmed'">
      <span class="invalid-feedback"
            v-show="errors.has('confirmPassword')"
            v-html="errors.first('confirmPassword')" />
    </div>

    <button class="btn btn-dark btn-block"
            type="submit"
            :disabled="errors.any()">
      <span class="fi fi-check" /> Change Password
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PasswordView',

  data() {
    return {
      form: {
        model: {
          password: '',
          confirmPassword: ''
        }
      }
    }
  },

  methods: {
    ...mapActions(['updateLogin']),

    submit() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.updateLogin(this.form.model)
        } else {
          swal(
            'Not so fast!',
            'Please provide required data in valid format',
            'warning'
          )
        }
      })
    }
  }
}
</script>

<style lang='stylus'>
</style>
