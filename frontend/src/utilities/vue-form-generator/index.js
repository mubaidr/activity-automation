import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
// import 'vue-form-generator/dist/vfg-core.css'

import flatPickrVfg from './flatPickr-vfg.vue'

Vue.component('fieldFlatPickrVfg', flatPickrVfg)

Vue.use(VueFormGenerator)
