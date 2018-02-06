<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label>Name</label>
      <input class="form-control"
             type="text"
             autocomplete="name"
             placeholder="name"
             name="name"
             v-model="form.model.name"
             v-validate="'required|min:3|max:16'">
      <span class="invalid-feedback"
            v-show="errors.has('name')"
            v-html="errors.first('name')" />
    </div>

    <button class="btn btn-dark btn-block"
            type="submit"
            :disabled="errors.any()">
      <span class="fi fi-check" /> Change Name
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NameView',

  data() {
    return {
      form: {
        model: {
          name: ''
        }
      }
    }
  },

  created() {
    this.form.model.name = this.user.name
  },

  methods: {
    ...mapActions(['updateLogin']),
    onSubmit() {
      this.updateLogin()
    }
  }
}
</script>

<style lang='stylus'>
</style>
