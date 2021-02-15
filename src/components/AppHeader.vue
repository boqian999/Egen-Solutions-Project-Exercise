<template>
  <header>
      <div class="header flex-center space-between">
        <a href="/"><h1>Devjobs</h1></a>
        <div class="toggle flex-center">
            <i class="fa fa-sun-o" aria-hidden="true"></i>
            <input type="checkbox" id="toggle" v-model="isDarkMode"/>
            <label for="toggle"></label>
            <i class="fa fa-moon-o" aria-hidden="true"></i>
        </div>
      </div>
  </header>
</template>


<script>
export default {
  data () {
    return {
      isDarkMode: false
    }
  },
  mounted () {
    this.checkDarkMode();
  },
  methods: {
    checkDarkMode () {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.isDarkMode = true;
      }
      // keep listening system theme
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          this.isDarkMode = e.matches ? true : false;
      });
    }
  },
  watch: {
    // change theme
    isDarkMode (val) {
      let el = document.getElementById('theme-control');
      let body = document.getElementsByTagName("body")[0];
      if(this.isDarkMode) {
        body.style = 'background-color: #131822;'
        if(!el.classList.contains('dark-theme')) {
          el.classList.add('dark-theme');
        }
      } else {
        body.style = 'background-color: #F5F6F8;'
        if(el.classList.contains('dark-theme')) {
          el.classList.remove('dark-theme');
        }
      }
    }
  }
}
</script>

