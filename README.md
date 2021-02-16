# Egen Solutions Coding Challenge - Job Board Project

## Comment
I spent two and half days on this projects from scratch (I do not have experience in building SPA with Vue (I have SPA experience with Angular), and most of features were done. I did not do the pagination / load more because the given API will only return 21 results at most, no matter you pass 'page' param with api or not, it will only return 21 results.

## PRODCUTION SITE
https://boqian-job-board-challenge.netlify.app/
This page currently has CORS issue and I do not have enough time to debug Netlify CORS setting. Will update this doc once I fixed.

Right now you can get data from local by running npm run serve. I have setup cors-proxy (Have not figured out why  it does not work on Netfily).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
