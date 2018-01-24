<template>
  <div class="row">
    <div class="col-lg-6 offset-lg-3">
        <div class="card text-black bg-light">
            <div class="card-body">
                <form>
                    <h2>Register</h2>
                    <p>Please provide required information to create an account.</p>
                      <div class="form-group">
                        <label>Username</label>
                        <input class="form-control" type="text" placeholder="Username" v-validate="'required|min:3|max:16'" /></div>
                      <div class="form-group">
                        <label>Password</label><input class="form-control" type="password" placeholder="Password" /></div>
                      <div class="form-group"><label>Confirm Password</label><input class="form-control" type="password" placeholder="Confirm Password" /></div>
                      <b4></b4><input class="btn btn-primary" type="submit" value="Register" />
                      <router-link class="btn-link" to="/auth/login">Already have an account?</router-link>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        model: {
          password: 'tim-password',
          confirmPassword: 'tim-password',
          username: 'tim',
          name: 'Minion'
        },
        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              label: 'Username',
              model: 'username',
              placeholder: 'username',
              required: true,
              min: 3,
              max: 16,
              validator: ['required', 'string']
            },
            {
              type: 'input',
              inputType: 'password',
              autocomplete: true,
              label: 'Password',
              model: 'password',
              placeholder: 'Password',
              min: 8,
              max: 16,
              required: true,
              validator: ['required', 'string']
            },
            {
              type: 'input',
              inputType: 'password',
              autocomplete: true,
              label: 'Confirm Password',
              model: 'confirmPassword',
              placeholder: 'Password',
              min: 8,
              max: 16,
              required: true,
              validator: [
                'required',
                'string',
                (value, field, model) =>
                  value === model.password
                    ? []
                    : ['Password and Confirm Password fields does not match']
              ]
            },
            {
              type: 'submit',
              buttonText: 'Register',
              validateBeforeSubmit: true,
              onSubmit: this.onSubmit,
              disabled: this.disableSubmit,
              fieldClasses: 'btn btn-primary btn-block'
            }
          ]
        },
        options: {
          validateAfterLoad: false,
          validateAfterChanged: true
        }
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onSubmit () {
      this.register(this.form.model)
    }
  }
}
</script>

<style lang='stylus'>
</style>
