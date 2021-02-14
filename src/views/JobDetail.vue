<template>
  <section class="job-detail-container">
    <div class="job-detail-company-profile flex-center border-second bg-second" v-cloak>
      <img class="job-detail-company-profile-img" :src="job.company_logo">
      <div class="job-detail-company-profile-info flex-center space-between">
        <div>
          <h2 class="job-detail-company-profile-name">{{job.company}}</h2>
          <p class="job-detial-company-profile-url" v-if="job.company_url">{{job.company_url}}</p>
        </div>
        <a :href="job.company_url" class="secondary-btn" target="_blank">Company Site</a>
      </div>
    </div>

    <div class="job-description-wrap border-second bg-second" v-cloak>
      <div class="job-description-summary flex-center space-between">
        <div class="job-description-summary-left">
            <p class="job-list-job-info">{{getTimeAway(job.created_at)}} · {{job.type}}</p>
            <h2 class="job-list-job-title">{{job.title}}</h2>
            <p class="job-list-job-location">{{job.location}}</p>
        </div>
        <a :href="job.company_url" class="primary-btn" target="_blank">Apply Now</a>
      </div>
      <div id="job-description"></div>
    </div>

    <div class="job-description-wrap job-how-to-apply-wrap border-second" v-cloak>
        <h2>How to Apply</h2>
        <div id="how-to-apply"></div>
    </div>
  </section>
</template>

<style lang="scss">
  @import "../styles/main.scss";
  @import "../styles/components/jobDetail.scss";
  @import "../styles/components/home.scss";
</style>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  data () {
    return {
      jobId: this.$route.query.id ? this.$route.query.id : '',
      job: {},
      applyURL: '',
      errors: ''
    }
  },
  mounted () {
    this.getJobDetials()
  },
  methods: {
    getJobDetials () {
      if (this.jobId !== '') {
        Vue.axios.get('https://jobs.github.com/positions/' + this.jobId + '.json')
          .then((response) => {
            this.job = response.data
            if (this.job.description !== '') {
              this.addDescription()
            }
            if (this.job.how_to_apply !== '') {
              this.addHowToApply()
            }
          })
          .catch(error => {
            console.log(error)
            this.errors = 'Can not get the data at this time, please check your search input or try again later.'
          })
      }
    },
    getTimeAway (date) {
      const now = new Date()
      const past = new Date(date)
      const gap = now - past
      const msPerHour = 60 * 1000 * 60
      const msPerDay = msPerHour * 24

      if (gap < msPerDay) {
        const count = Math.round(gap / msPerHour)
        return count === 1 ? (count + ' hour ago') : (count + ' hours ago')
      } else {
        const count = Math.round(gap / msPerDay)
        return count === 1 ? (count + ' day ago') : (count + ' days ago')
      }
    },
    addDescription () {
      const parent = document.getElementById('job-description')
      parent.innerHTML = this.job.description
    },
    addHowToApply () {
      const parent = document.getElementById('how-to-apply')
      parent.innerHTML = this.job.how_to_apply
    }
  }
}

</script>
