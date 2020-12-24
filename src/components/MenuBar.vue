<template>
    <div class="MenuBar">
        <div class="ui container">
            <div class="ui secondary pointing huge menu">
                <a class="item active">
                    <router-link to="/home">TODOリスト</router-link>
                </a>
                <a class="item">
                    使い方(準備中です！)
                </a>
                <div class="right menu">
                    <a v-on:click="signOut" class="ui item">
                    ログアウト
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: "MenuBar",
    methods: {
    signOut: function() {
            firebase.auth().signOut().then(() => {
            this.$router.push('/SignIn')
            })
        }
    }
}
</script>