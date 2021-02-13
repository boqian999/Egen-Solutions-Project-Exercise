<template>
  <section class="job-container">
      <div class="job-search-box">
        <form class="job-search-form flex-center">
          <div class="job-search-form__item job-search-form__item--lg flex-center">
            <label for="name">
              <i class="fa fa-search" aria-hidden="true"></i>
            </label>
            <input class="search-input"
                   id="name"
                   name="filter"
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
                   maxlength="100"
                   placeholder="Filter by location...">
          </div>
          <div class="job-search-form__item flex-center space-between">
              <label class="checkbox-container">
                <span>Fulltime Job Only</span>
                <input type="checkbox" checked="checked">
                <span class="checkmark"></span>
              </label>
              <button class="search-btn">Search</button>
          </div>
        </form>
      </div>
  </section>
</template>
