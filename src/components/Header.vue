<template>
  <header>
    <div class="location-holder">
      <div class="location-icon icon">
        <img>
      </div>
      <a v-if="location" :href="'https://www.google.com/maps/place/' + location" rel="noopener noreferrer" target="_blank" class="location" v-text="location"></a>
      <router-link class="location" v-else to="/" v-text="page"></router-link>
    </div>
    <nav>
      <ul>
        <li>
          <a href="#" v-if='mode == true' v-on:click="changeMode">
            <button>Light Mode</button>
          </a>
          <a href="#" v-else v-on:click="changeMode">
            <button>Dark Mode</button>
          </a>
        </li>
        <li v-if='page == "Home"'>
          <router-link to="/search">
            <button>Change Location</button>
          </router-link>
        </li>
        <li v-else>
          <router-link to="/home">
            <button>Home Page</button>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    location: null,
    page: null,
  },
  data(){
    return {
      mode: false
    }
  },
  methods: {
    changeMode: function(){
      var body = document.querySelector("body");
      if(this.mode){
        this.mode = false;
        body.classList.remove("dark");
        this.$store.state.$cookies.set("theme", "default")
      }else{
        this.mode = true;
        body.classList.add("dark");
        this.$store.state.$cookies.set("theme", "dark")
      }
    }
  },
  mounted(){
    var body = document.querySelector("body");
    console.log(this.$store.state.$cookies)
    if(this.$store.state.$cookies.get("theme")){
      if(this.$store.state.$cookies.get("theme") == "default"){
        this.mode = false;
        body.classList.remove("dark");
      }else{
        this.mode = true
        body.classList.add("dark");
      }
    }else{
      this.$store.state.$cookies.set("theme", "default");
    }
  }  
};
</script>
