<template>
    <div class="logSig">
        <h1>Login</h1>
        <input id="email" type="email" placeholder="Email" v-model="email">
        <br />
        <input id="password" type="password" placeholder="Password" v-model="password">
        <br />
        <button @click="login">Login</button>
        <p>Don't have an account already? <router-link to="signup">Sign Up</router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            initials: "",
        }
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    this.$router.push({ name: "Home" });
                    console.log(user);
                },
                (err) => {
                    alert(err);
                }
            );
        },
    }
}
</script>

<style>

</style>