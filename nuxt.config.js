export default {
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nverine',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'},
    ],
    bodyAttrs: {
      class: '' // Add `white-content` class here to enable "white" mode.
    },
  },
  router: {
    linkExactActiveClass: 'active'
  },
  /*
   ** Global JS
   */
  script: [
    {src: "assets/js/bootstrap-material-design.js",},
    {src: "assets/js/bootstrap-notify.js",},
    {src: "assets/js/bootstrap-datetimepicker.js",},
  ],

  /*
   ** Global CSS
   */
  css: [
    'assets/css/FA/css/all.css',
    'assets/css/bootstrap.min.css',
    'vue-select/dist/vue-select.css',
    'assets/css/material-dashboard.css',
    'assets/css/demo.css',
    'assets/css/theme.css',
    'assets/css/spinner.css',
    'assets/css/dumper.css',
    'assets/css/mensagens.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/dashboard-plugin',
    '~/plugins/extensions/backend',
    '~/plugins/bootstrap',
    '~/plugins/filter',
    '~/plugins/helpers',
    '~/plugins/extensions/notifications',
    '~/plugins/extensions/persistedState.client.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          // onlyOnRoot: true,  // recommended
          redirectOn: 'root',  // recommended
          alwaysRedirect: true
        },
      }
    ],
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
  ],
  gtm: {
    id: 'GTM-XXXXXXX', // Used as fallback if no runtime config is provided
    enabled: false
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en',
        file: 'en.js',
      },
      {
        code: 'pt',
        name: 'Português',
        iso: 'pt-BR',
        file: 'pt-br.js',
      },
      {
        code: 'es',
        name: 'Español',
        iso: 'es',
        file: 'es.js',
      },
    ],
    strategy: 'prefix',
    langDir: 'lang/',
    defaultLocale: 'en'
  },
  publicRuntimeConfig: {
    urlApi: process.env.VUE_APP_API_URL || 'error',
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    },
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
        [
          'component',
          {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
          }
        ]
      ]
    }
  }
}
