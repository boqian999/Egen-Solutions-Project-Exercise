<template>
  <section class="job-container" id="theme-control">
    <div class="job-search-box bg-second border-second">
      <div class="job-search-form flex-center">
        <div class="job-search-form__item job-search-form__item--lg flex-center">
          <label for="description">
            <i class="fa fa-search desktop-view" aria-hidden="true"></i>
          </label>
          <input class="search-input"
                  id="description"
                  name="description"
                  v-model="description"
                  maxlength="100"
                  placeholder="Filter by title, companies, experties..">
          <i class="fa fa-filter mobile-view job-search-form__filter-icon" aria-hidden="true" @click="showFilter = !showFilter"></i>
          <button type="submit" class="mobile-view job-search-btn--mobile" @click.prevent="searchUser"><i class="fa fa-search" aria-hidden="true"></i></button>
        </div>
        <div class="job-search-form__item desktop-flex flex-center" :class="{showFlex : showFilter}">
          <label for="location">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
          </label>
          <gmap-autocomplete class="search-input"
                  id="location"
                  name="location"
                  :value="location"
                  @place_changed="setPlace"
                  maxlength="100"
                  @click.prevent="locateMylocation"
                  placeholder="Filter by location...">
          </gmap-autocomplete>
        </div>
        <div class="job-search-form__item desktop-flex flex-center space-between" :class="{showFlex : showFilter}">
            <label class="checkbox-container">
              <span>Fulltime Job Only</span>
              <input type="checkbox" checked="checked" v-model="full_time">
              <span class="checkmark"></span>
            </label>
            <button type="submit" class="primary-btn" @click.prevent="searchUser">Search</button>
        </div>
      </div>
    </div>

    <div class="loader" v-if="loading" ></div>
    <div class="job-list-box" v-if="!loading" v-cloak>
      <ul class="job-list-wrap" v-if="jobs.length > 0">
        <li class="job-list-item bg-second border-second" v-for="(job,index) in jobs" :key="index">
          <a class="job-list-item-link" :href="'/job-detail/?id=' + job.id" target="_blank">
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
      <p v-else class="errorMsg">{{error}}</p>
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
Vue.axios.defaults.withCredentials = true;

export default {
  title: 'Devjobs | Job Board',
  data () {
    return {
      description: '',
      location: '',
      full_time: false,
      jobs: [],
      error: '',
      loading: false,
      showFilter: false,
      firstInti: true
    }
  },
  mounted () {
    this.searchUser();
    this.syncLocation();
  },
  computed: {
    axiosParams () {
      const params = new URLSearchParams();
      if (this.description !== '') {
        params.append('description', this.description);
      }
      if (this.location !== '') {
        params.append('location', this.location);
      }
      if (this.full_time) {
        params.append('full_time', this.full_time);
      }
      return params;
    }
  },
  methods: {
    searchUser () {
      this.error = '';
      this.loading = true;
      const requestUrl = 'https://localhost:8080/positions.json';
      Vue.axios.get(requestUrl, {
        params: this.axiosParams
      })
        .then((response) => {
          if (response.data && response.data.length > 0) {
            this.jobs = response.data;
          } else {
            this.error = 'No result found. Please update your search filter and try again.';
            this.jobs = [];
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error.message);
          this.error = 'Can not get the result at this time. Please try again later.';
          this.loading = false;
        })
    },
    locateMylocation() {
      if (this.firstInti) {
        this.firstInti = false;
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            this.getAddressFrom(position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.log(error.message);
          })
        } else {
          console.log("The browser does not support geolocation API");
        }
      }
    },
    setPlace(place) {
      this.location = place.formatted_address;
    },
    getAddressFrom(lat, long) {
      const googleApiURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                          lat + ',' + long + '&key=AIzaSyAqIwVp3r48kEanahmSl439x4cPXhOSJvA'
      Vue.axios.get(googleApiURL)
        .then(reponse => {
          if (reponse.data.error_message) {
            console.log(reponse.data.error_message);
          } else {
            this.location = reponse.data.results[0].formatted_address;
          }
        })
        .catch(error => {
          console.log(error.message);
        })
    },
    syncLocation () {
      // fix location field not update issue
      let el = document.getElementById("location");
      el.addEventListener('change', (evt) => {
        if (!el.value || el.value == '') {
          this.location = '';
        }
      });
    },
    getTimeAway (date) {
      const now = new Date();
      const past = new Date(date);
      const gap = now - past;
      const msPerHour = 60 * 1000 * 60;
      const msPerDay = msPerHour * 24;

      if (gap < msPerDay) {
        const count = Math.round(gap / msPerHour);
        return count === 1 ? (count + ' hour ago') : (count + ' hours ago');
      } else {
        const count = Math.round(gap / msPerDay);
        return count === 1 ? (count + ' day ago') : (count + ' days ago');
      }
    }
  }
}

</script>
