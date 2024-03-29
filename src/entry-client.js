import { createApp } from './main.js';

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
 // Add router hook for handling asyncData.
 // Doing it after initial route is resolved so that we don't double-fetch
 // the data that we already have. Using `router.beforeResolve()` so that all
 // async components are resolved.
  router.beforeEach((to, from, next) => {
    if (!store.state.initialized && !to.meta.validatePage) {
      console.log('initializing...')
      store.dispatch('init', (status) => {
        if (status) {
          // console.log('login page')
          router.push('login')
        } else {
          // router.replace('/my/page')
          next()
        }
      })
    }
    else {
      next()
    }
  })
 
 router.beforeResolve((to, from, next) => {
   const matched = router.getMatchedComponents(to)
   const prevMatched = router.getMatchedComponents(from)

   // we only care about non-previously-rendered components,
   // so we compare them until the two matched lists differ
   let diffed = false
   const activated = matched.filter((c, i) => {
     return diffed || (diffed = (prevMatched[i] !== c))
   })

   if (!activated.length) {
     return next()
   }

   // this is where we should trigger a loading indicator if there is one

   Promise.all(activated.map(c => {
     if (c.asyncData) {
       return c.asyncData({ store, route: to })
     }
   })).then(() => {

     // stop loading indicator

     next()
   }).catch(next)
 })

 app.$mount('#app')
})