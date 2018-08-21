module.exports = {
  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css'],

  /*
  ** Add element-ui in our app, see plugins/element-ui.js file
  */
  plugins: ['@/plugins/element-ui'],

  router: {
    middleware: 'auth',
    extendRoutes(routes) {
      routes.push({
        name: 'article-edit',
        path: '/article/:id/edit',
        component: './pages/article/new.vue',
      });
      const categories = ['movie', 'book'];
      categories.forEach(category => {
        routes.push({
          name: `${category}-image-upload`,
          path: `/${category}/:id/upload`,
          component: './pages/upload/index.vue',
        })
      })
    },
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Daydream',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#187cb7' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
