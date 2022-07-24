export default {
  ssr: false,
  head: {
    title: '회원가입',
    htmlAttrs: {
      lang: 'ko',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: '/',
  },
  build: {},
}
