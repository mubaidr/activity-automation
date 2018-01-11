<template lang='pug'>
  div
    transition-group(name='slide-up' mode='out-in')
      div(v-if='hasListing' key='0')
        p.lead What's your passion? Check out all our open spots below.
        // p Choose a vacancy below to start application.
        br
        .row
          .col-lg-4.col-md-6(v-for='vacancy in vacancies')
            .list-group.vacancy-item(@click='selectVacancy(vacancy)')
              a.list-group-item.list-group-item-action.flex-column.align-items-start(href='#')
                small {{vacancy.CAT_ADVERTISEMENT.advNumber}}
                hr
                .d-flex.w-100.justify-content-between
                  h5.mb-1 {{vacancy.CAT_DESIG.description}}
                hr
                p.mb-1 {{vacancy.description}}
                small 3 days ago
      div(v-else-if='isLoading' key='1')
        p.lead Loading...
        .progress
          .progress-bar.progress-bar-striped.progress-bar-animated(role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%')
      div(v-else key='2')
        .alert.alert-warning
          strong
            strong Thank you for your interest.
            br
            |All positions are currently filled. Please visit our site again for future job postings that may relate to your experience and talents.
</template>

<script>
  export default {
    name: 'vacancies',
    data () {
      return {
        vacancies: null,
        endpoint: '/api/vacancy'
      }
    },
    watch: {
      cache (list) {
        this.vacancies = list
        // Debug code start
        this.vacancies = [
          {
            id: 1,
            CAT_DESIG: {
              description: 'Frontend Developer',
              CAT_DESIG_GROUP: {
                description: 'Web Developer'
              },
              CAT_PAYSCALE: {
                description: 'ABC-01'
              }
            },
            CAT_ADVERTISEMENT: {
              advNumber: 'ABC-02-99'
            },
            description: 'Frontend Web Developer (Vue.js)',
            question: '3 years of experience',
            checkAcademicDetails: 0,
            CAT_APP_STATUS: {
              id: 1
            }
          },
          {
            id: 2,
            CAT_DESIG: {
              description: 'Backend Developer',
              CAT_DESIG_GROUP: {
                description: 'Web Developer'
              },
              CAT_PAYSCALE: {
                description: 'ABC-01'
              }
            },
            CAT_ADVERTISEMENT: {
              advNumber: 'ABC-01-2099'
            },
            description: 'Backend Web Developer (Node.js)',
            question: '3 years of experience',
            checkAcademicDetails: 0,
            CAT_APP_STATUS: {
              id: 1
            }
          },
          {
            id: 3,
            CAT_DESIG: {
              description: 'Full Stack Web Developer',
              CAT_DESIG_GROUP: {
                description: 'Web Developer'
              },
              CAT_PAYSCALE: {
                description: 'ABC-01'
              }
            },
            CAT_ADVERTISEMENT: {
              advNumber: 'ABC-01-2099'
            },
            description: 'Full Stack Web Developer (Node.js, Vue.js)',
            question: '3 years of experience',
            checkAcademicDetails: 0,
            CAT_APP_STATUS: {
              id: 1
            }
          },
          {
            id: 4,
            CAT_DESIG: {
              description: 'Junior Software Engineer',
              CAT_DESIG_GROUP: {
                description: 'Engineers'
              },
              CAT_PAYSCALE: {
                description: 'ABC-01'
              }
            },
            CAT_ADVERTISEMENT: {
              advNumber: 'ABC-02-99'
            },
            description: 'Software Engineer',
            question: '2 years of experience',
            checkAcademicDetails: 0,
            CAT_APP_STATUS: {
              id: 1
            }
          }
        ]
        // Debug code end
      }
    },
    computed: {
      hasListing () {
        return !this.isLoading && this.vacancies && this.vacancies.length > 0
      }
    },
    methods: {
      selectVacancy (vac) {
        this.$store.commit('setApplicationStep', 1)
        this.$store.commit('setVacancy', vac)
        this.$router.push('/application')
      }
    }
  }
</script>

<style lang='stylus'>
  .vacancy-item {
    margin-bottom 2rem
    text-align center
    transition transform 250ms ease-out
    will-change transform

    h5 {
      text-align center
      width 100%
    }

    &:hover {
      transform scale(1.05)
    }

    &:active {
      transform scale(1)
      transition-delay 50ms
    }
  }
</style>
