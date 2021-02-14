<template>
  <section class="job-container">
    <div class="job-search-box bg-second border-second">
      <div class="job-search-form flex-center">
        <div class="job-search-form__item job-search-form__item--lg flex-center">
          <label for="description">
            <i class="fa fa-search" aria-hidden="true"></i>
          </label>
          <input class="search-input"
                  id="description"
                  name="description"
                  v-model="description"
                  maxlength="100"
                  placeholder="Filter by title, companies, experties..">
        </div>
        <div class="job-search-form__item flex-center">
          <label for="location">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
          </label>
          <input class="search-input"
                  id="location"
                  name="location"
                  v-model="location"
                  maxlength="100"
                  placeholder="Filter by location...">
        </div>
        <div class="job-search-form__item flex-center space-between">
            <label class="checkbox-container">
              <span>Fulltime Job Only</span>
              <input type="checkbox" checked="checked" v-model="full_time">
              <span class="checkmark"></span>
            </label>
            <button class="primary-btn">Search</button>
        </div>
      </div>
    </div>

    <div class="loader" v-if="loading" ></div>
    <div class="job-list-box" v-if="!loading" v-cloak>
      <ul class="job-list-wrap">
        <li class="job-list-item bg-second border-second" v-for="(job,index) in jobs" :key="index">
          <a class="job-list-item-link" :href="'/job-detail/?id=' + job.id">
            <div class="flex-grow-1">
              <div class="job-list-job-img-wrap" v-if="job.company_logo">
                <img width="40" height="40" :src="job.company_logo">
              </div>
              <p class="job-list-job-info">{{getTimeAway(job.created_at)}} · {{job.type}}</p>
              <h2 class="job-list-job-title">{{job.title}}</h2>
              <p class="job-list-job-info">{{job.company}}</p>
            </div>
            <p class="job-list-job-location">{{job.location}}</p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
  @import "../styles/main.scss";
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
      description: '',
      location: '',
      full_time: false,
      jobs: [],
      error: '',
      loading: false
    }
  },
  mounted () {
    this.searchUser()
  },
  methods: {
    searchUser () {
      this.loading = true
      Vue.axios.get('https://jobs.github.com/positions.json')
        .then((response) => {
          if (response.data && response.data.length > 0) {
            this.jobs = response.data
          }
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.errors = 'Can not get the data at this time, please check your search input or try again later.'
          this.loading = false
        })
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
    }
  }
}

</script>
