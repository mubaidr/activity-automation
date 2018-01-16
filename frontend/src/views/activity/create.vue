<template lang='pug'>
  .card.text-black.bg-light
    .card-body
      vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
      button.btn.btn-primary(@click='onSubmit' :disabled='activity && form.model.description === activity.description') Save
      | &nbsp;
      button.btn.btn-link(@click='cancel') Cancel
      | &nbsp;
      button.btn.btn-warning(@click='remove' v-show='activity && activity.id') Delete
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'create-activity',
  props: ['timeOfWeek'],
  data () {
    return {
      form: {
        model: {
          id: null,
          description: '',
          time: Date.now()
        },
        schema: {
          fields: [
            {
              model: 'description',
              type: 'textArea',
              // label: 'Description',
              placeholder: 'Activity details',
              rows: 6,
              max: 255,
              required: true,
              validator: ['required', 'string']
            }
          ]
        },
        options: {
          validateAfterLoad: false,
          validateAfterChanged: true
        }
      },
      activity: null
    }
  },
  watch: {
    timeOfWeek () {
      this.time = this.timeOfWeek
    }
  },
  created () {
    if (this.timeOfWeek) {
      this.time = this.timeOfWeek
    }
  },
  methods: {
    ...mapActions(['postActivity', '']),
    onSubmit () {
      this.postActivity(this.form.model)
        .then(() => {})
        .catch(() => {})
    },
    cancel () {
      this.$emit('cancel')
    },
    remove () {}
  }
}
</script>

<style lang='stylus'>
</style>
