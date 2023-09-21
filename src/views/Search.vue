<template>
  <section>
    <Header page="Search" :location="false" />
    <div class="content basepage fullheight searchPage" id="content-1">
      <div class="search-input-holder" :class="{ 'focus' : inputFocus }">
        <span class="icon input-iconn">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.2083 21.8761C30.2083 18.9984 27.8766 16.6667 25.001 16.6667C22.1234 16.6667 19.7917 18.9984 19.7917 21.8761C19.7917 24.7516 22.1234 27.0833 25.001 27.0833C27.8766 27.0833 30.2083 24.7516 30.2083 21.8761Z" stroke="#222222" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.999 43.75C22.5022 43.75 9.375 33.1216 9.375 22.0069C9.375 13.3055 16.369 6.25 24.999 6.25C33.629 6.25 40.625 13.3055 40.625 22.0069C40.625 33.1216 27.4958 43.75 24.999 43.75Z" stroke="#222222" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <input @focus="inputFocus = true" @blur="inputFocus = false" autocomplete="off" type="text" id="search" class="search-input" placeholder="Search Location" v-model="searchValue">
      </div>
      <div v-if="searchResult" class="search-result-holder">
        <span v-if="searchResult.length == 0" class="search-result no-result">No Result Found</span>
        <button v-else v-for="(search, index) in searchResult" :key="index" class="search-result" v-on:click="changeLocation(search.Key, search.LocalizedName,search )" > {{ search.LocalizedName }} / {{ search.Country.LocalizedName }}</button>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Footer from "../components/Footer"
import Header from "../components/Header"
import axios from 'axios'

export default {
  components: {Footer, Header},
  data(){
    return{
      searchValue: null,
      searchResult: null,
      inputFocus: false
    }
  },
  computed: {
    location () {
      return this.$store.state.location
    },
    api () {
      return this.$store.state.api
    }
  },
  watch: {
    searchValue(newSearch){
      if(newSearch != null && newSearch.length >= 3){
        axios
          .get("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + this.api.apiKey + "&language=" + this.api.lang + "&q=" + newSearch)        
          .then((Response) => {
            this.searchResult = Response.data
          })
      }
    }
  },
  methods: {
    changeLocation: function (Key ,LocalizedName,search){
      this.location.locationKey = Key,
      this.location.locationName = LocalizedName,
      this.location.search = true;
      this.$store.state.$cookies.set("locationKey", Key),
      this.$store.state.$cookies.set("locationName", LocalizedName),
      this.$router.push({ name: 'Home' })
    },
  }
}
</script>

<style>

</style>