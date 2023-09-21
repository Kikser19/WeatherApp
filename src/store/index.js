import { createStore } from 'vuex'
import VueCookies from 'vue-cookies'

export default createStore({
    state: {
      $cookies: VueCookies,
      location: {
        locationKey: $cookies.get("locationKey") ? $cookies.get("locationKey") : null,
        locationName: $cookies.get("locationName") ? $cookies.get("locationName") : null,
        latitude: null,
        longitude: null,
        search: false,
      },
      user: {
        ipAddress: null
      },
      api: {
        apiKey: "dZc50Q6cqA9mHCbG3ufvaTzU6RMXXY1N",
        lang: "en-en"
      },
      weather: {
        hourData: null,
        fiveDayData: null,
        sunRise: null,
        sunSet: null,
        humidity: null,
        wind: null,
        feelsLike: null,
      },
    }
})
