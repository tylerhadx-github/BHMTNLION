// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'lionDark',
    themes: {
      lionDark: {
        dark: true,
        colors: {
          background: '#0b0b10',
          surface: '#14141c',
          'surface-bright': '#1c1c28',
          primary: '#ffb454',
          'primary-darken-1': '#e89a3c',
          secondary: '#3ddc97',
          accent: '#ffb454',
          info: '#5ab0ff',
          success: '#3ddc97',
          warning: '#ffb454',
          error: '#ff5d73',
          'on-background': '#f4f4f8',
          'on-surface': '#f4f4f8',
        },
        variables: {
          'border-color': '#ffffff',
          'theme-on-surface-variant': '#a7a7b4',
        },
      },
    },
  },
})
