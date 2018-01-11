<template lang='pug'>
  div
    h1 Basic Information
    p All information is required unless stated otherwise.
    .two-columns
      vue-form-generator(:schema='form.schema' :model='form.model' :options='form.options' @validated="onValidated")
    p The information collected through our service shall be kept private and limited to the purpose of providing the service.
</template>

<script>
  export default {
    name: 'candidate',
    data () {
      return {
        form: {
          model: {
            cnic: '',
            name: '',
            fatherName: '',
            genderId: null,
            maritalStatusId: null,
            religionId: null,
            nationality: '',
            dob: '',
            birthPlace: '',
            domicileDistrict: '',
            postalCity: '',
            postalTehsil: '',
            postalDistrict: '',
            postalAddress: '',
            mobileNo: '',
            phoneNo: '',
            drivingLicenseId: null,
            licenseExpiryDate: '',
            achievements: '',
            primeInterestField: ''
          },
          schema: {
            groups: [
              {
                legend: 'Personal',
                fields: [
                  {
                    model: 'name',
                    type: 'input',
                    inputType: 'text',
                    label: 'Name',
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    model: 'fatherName',
                    type: 'input',
                    inputType: 'text',
                    label: 'Father Name',
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    model: 'genderId',
                    type: 'select',
                    label: 'Gender',
                    values: [
                      {
                        id: 2,
                        name: 'Female'
                      },
                      {
                        id: 1,
                        name: 'Male'
                      },
                      {
                        id: 3,
                        name: 'Unspecified'
                      }
                    ],
                    required: true,
                    validator: 'required',
                    hideNoneSelectedText: true
                  },
                  {
                    model: 'maritalStatusId',
                    type: 'select',
                    label: 'Marital Status',
                    values: [
                      {
                        id: '1',
                        name: 'Single'
                      },
                      {
                        id: '2',
                        name: 'Married'
                      }
                    ],
                    required: true,
                    validator: 'required',
                    hideNoneSelectedText: true
                  },
                  {
                    model: 'dob',
                    type: 'FlatPickrVfg',
                    label: 'Date of Birth',
                    required: true,
                    validator: ['required', 'string', 'date'],
                    placeholder: 'Pick a date'
                  },
                  {
                    model: 'birthPlace',
                    type: 'input',
                    inputType: 'text',
                    label: 'Birth Place',
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    // TODO: get list of cities for domicile, city, tehsil
                    model: 'domicileDistrict',
                    type: 'input',
                    inputType: 'text',
                    label: 'Domicile District',
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    type: 'cleave',
                    autocomplete: true,
                    label: 'CNIC',
                    model: 'cnic',
                    cleaveOptions: {
                      numericOnly: true,
                      blocks: [5, 7, 1],
                      delimiter: '-'
                    },
                    placeholder: '',
                    min: 15,
                    max: 15,
                    required: true,
                    validator: ['required', 'string']
                  }
                ]
              },
              {
                legend: 'Contact',
                fields: [
                  {
                    type: 'cleave',
                    autocomplete: true,
                    label: 'Mobile Number',
                    model: 'mobileNo',
                    cleaveOptions: {
                      numericOnly: true,
                      blocks: [4, 7],
                      delimiter: '-'
                    },
                    placeholder: '',
                    min: 12,
                    max: 12,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    type: 'cleave',
                    autocomplete: true,
                    label: 'Phone Number',
                    model: 'phoneNo',
                    cleaveOptions: {
                      numericOnly: true,
                      blocks: [3, 7],
                      delimiter: '-'
                    },
                    placeholder: '',
                    min: 11,
                    max: 11,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    model: 'postalProvince',
                    type: 'input',
                    inputType: 'text',
                    label: 'Province',
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    model: 'postalDistrict',
                    type: 'input',
                    inputType: 'text',
                    label: 'District',
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    model: 'postalCity',
                    type: 'input',
                    inputType: 'text',
                    label: 'City',
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    model: 'postalTehsil',
                    type: 'input',
                    inputType: 'text',
                    label: 'Tehsil',
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  },
                  {
                    model: 'postalAddress',
                    type: 'textArea',
                    label: 'Postal Address',
                    rows: 6,
                    max: 255,
                    required: true,
                    validator: ['required', 'string']
                  }
                ]
              },
              {
                legend: 'Other',
                fields: [
                  {
                    model: 'achievements',
                    type: 'textArea',
                    label: 'Achievements',
                    rows: 5,
                    max: 256,
                    required: true
                  },
                  {
                    model: 'primeInterestField',
                    type: 'textArea',
                    label: 'Interests/ Hobbies',
                    rows: 5,
                    max: 256,
                    required: true
                  }
                ]
              },
              {
                legend: '',
                fields: [
                  {
                    type: 'submit',
                    buttonText: 'Back',
                    validateBeforeSubmit: false,
                    onSubmit: this.onBack,
                    fieldClasses: 'btn btn-default btn-submit-custom'
                  },
                  {
                    type: 'submit',
                    buttonText: 'Save & Continue',
                    validateBeforeSubmit: true,
                    onSubmit: this.onSubmit,
                    disabled: this.disableSubmit,
                    fieldClasses: 'btn btn-primary btn-submit-custom'
                  }
                ]
              }
            ]
          },
          options: {
            validateAfterLoad: false,
            validateAfterChanged: true
          }
        },
        endpoint: '/api/candidate'
      }
    },
    watch: {
      cache (val) {
        const [cand] = val

        if (cand) {
          this.form.model = cand
        }
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style lang='stylus'>
</style>
