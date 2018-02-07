<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label>Username</label>
      <input class="form-control"
             type="text"
             autocomplete="username"
             placeholder="Username"
             name="username"
             v-model="form.model.username"
             v-validate="'required|min:3|max:16'">
      <span class="invalid-feedback"
            v-show="errors.has('username')"
            v-html="errors.first('username')" />
    </div>

    <button class="btn btn-dark btn-block"
            type="submit"
            :disabled="errors.any()">
      <span class="fi fi-check" /> Change Username
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UsernameView',

  data() {
    return {
      form: {
        model: {
          username: ''
        }
      }
    }
  },

  created() {
    this.form.model.username = this.user.username
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
