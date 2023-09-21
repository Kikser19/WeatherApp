<template>
  <section>
    <Header page="Home" :location="location?.locationName" />
    <div v-if="weather?.hourData && weather.fiveDayData" class="content fullheight centerpage" id="content">
      <div class="left">
        <p class="forecast"><b>FORECAST</b></p>
        <div class="days">
          <div class="day" v-for="(day, index) in weather.fiveDayData.forecast.forecastday" :key="index">
            <div class="denovi">{{ day.date }}</div>
            <div class="denovi">{{ day.day.avgtemp_c }}°C</div>
            <div class="denovi">{{ day.day.condition.text }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="temperature-holder">
          <span class="value">{{ weather?.hourData.Temperature.Value }}°C</span>
          <span class="feelsLike">Feels like {{ weather?.feelsLike.current.feelslike_c }}</span>
          <span class="phrase">{{ weather?.hourData.IconPhrase }}</span>
        </div>

        <div class="sunset_sunrise">
          <div class="sunrise">
            <img class="sun" :src="require('../images/sunrise.png')">
            <div class="sunsInfo"> {{ weather.sunRise.astronomy.astro.sunrise }} </div>
          </div>
          <div class="sunset">
            <img class="sun" :src="require('../images/sunset.png')">
            <div class="sunsInfo">{{ weather.sunRise.astronomy.astro.sunset }}</div>
          </div>
        </div>
        <div class="rain">
          <img class="rw" :src="require('../images/rain.png')">
          <div class="humidityInfo">{{ weather.humidity.current.humidity }}%</div>
        </div>
        <div class="wind">
          <img class="rw" :src="require('../images/wind.png')">
          <div class="windInfo"> {{ weather.wind.current.wind_kph }} km/h <b>{{ weather.wind.current.wind_dir }}</b></div>
        </div>
      </div>
    </div>
    <Loading v-else />
    <Footer />
  </section>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Loading from "@/components/Loading"
import axios from "axios"

export default {
  components: { Header, Footer, Loading },
  computed: {
    location() {
      return this.$store.state.location
    },
    user() {
      return this.$store.state.user
    },
    api() {
      return this.$store.state.api
    },
    weather() {
      return this.$store.state.weather
    }
  },
  mounted() {
    if (!this.location.search) {
      if (!navigator.geolocation) {
        if (!this.location.locationKey && !this.location.locationName) {
          this.getIpAddress(true);
        } else {
          this.checkLocation();
        }
      } else {
        navigator.geolocation.getCurrentPosition(this.success, this.error)
      }
    } else {
      this.location.search = false;
      this.checkLocation();
    }
  },
  methods: {
    getIpAddress(param = false) {
      axios
        .get("https://api.ipify.org?format=json")
        .then((Response) => {
          this.user.ipAddress = Response.data.ip;
          if (param) { this.getIpLocation() }
        })
        .catch((error) => {
        })
    },
    getIpLocation() {
      axios
        .get("http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + this.api.apiKey + "&q=" + this.user.ipAddress + "&language=" + this.api.lang + "&details=false")
        .then((Response) => {
          this.location.locationKey = Response.data.ParentCity.Key,
            this.location.locationName = Response.data.ParentCity.EnglishName
          this.getWeatherData();
          this.get5DayWeatherData();
          this.getSunRiseSunSet();
          this.getHumidityAndWind();
        })
        .catch((error) => {
        })
    },
    getMeridianLocation() {
      axios
        .get("http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + this.api.apiKey + "&q=" + this.location.latitude + "," + this.location.longitude + "&language=" + this.api.lang + "&details=false&toplevel=false")
        .then((Response) => {
          this.location.locationKey = Response.data.Key,
            this.location.locationName = Response.data.LocalizedName
          this.getWeatherData();
          this.get5DayWeatherData();
          this.getSunRiseSunSet();
          this.getHumidityAndWind();
        })
        .catch((error) => {
        })
    },
    getWeatherData() {
      axios
        .get("https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/" + this.location.locationKey + "?apikey=" + this.api.apiKey + "&language=" + this.api.lang + "&details=false&metric=true")
        .then((Response) => {
          this.weather.hourData = Response.data[0];
        })
        .catch((error) => {
        })
    },
    getHumidityAndWind() {
      axios
        .get("http://api.weatherapi.com/v1/current.json?key=237255f7afd94a7d8a5225105232102&q=" + this.location.locationName + "&aqi=no")
        .then((Response) => {
          this.weather.humidity = Response.data;
          this.weather.wind = Response.data;
          this.weather.feelsLike = Response.data;
        })
        .catch((error) => {
        })
    },
    getSunRiseSunSet() {
      axios
        .get("https://api.weatherapi.com/v1/astronomy.json?key=237255f7afd94a7d8a5225105232102&q=" + this.location.locationName)
        .then((Response) => {
          this.weather.sunRise = Response.data;
          this.weather.sunSet = Response.data;
        })
        .catch((error) => {
        })
    },
    get5DayWeatherData() {
      axios
        .get("http://api.weatherapi.com/v1/forecast.json?key=237255f7afd94a7d8a5225105232102&q=" + this.location.locationName + "&days=5&aqi=yes&alerts=no")
        .then((Response) => {
          console.log(Response.data)
          this.weather.fiveDayData = Response.data;
        })
        .catch((error) => {
        })
    },
    checkLocation() {
      if (this.weather.hourData != null && this.weather.hourData.Link.search(this.location.locationKey) == -1) {
        this.weather = null;
        this.getWeatherData();
        this.get5DayWeatherData();
        this.getSunRiseSunSet();
        this.getHumidityAndWind();
      } else {
        this.getWeatherData();
        this.get5DayWeatherData();
        this.getSunRiseSunSet();
        this.getHumidityAndWind();
      }
    },
    success(position) {
      this.location.latitude = position.coords.latitude;
      this.location.longitude = position.coords.longitude;
      this.getMeridianLocation();
      this.getSunRiseSunSet();
      this.getHumidityAndWind();
    },
    error() {
      !this.location.locationKey && !this.location.locationName ? this.getIpAddress(true) : this.checkLocation();
    },
  },
};
</script>