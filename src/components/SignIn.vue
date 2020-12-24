<template>
    <div class="SignIn">
        <h1>TODOリスト</h1>
        <div class="ui raised very padded text container segment">
            <form class="ui form">
                <ValidationProvider rules="email" v-slot="{ errors }">
                    <div class="field">
                    <label>メールアドレス</label>
                    <input v-model="email" type="email" name="メールアドレス" placeholder="メールアドレス">
                    <p class="error">{{ errors[0] }}</p>
                </div>
                </ValidationProvider>
                <ValidationProvider rules="min:6|alpha_num|required" v-slot="{ errors }">
                    <div class="field">
                        <label>パスワード</label>
                        <input v-model="password" type="password" name="パスワード" placeholder="パスワード">
                        <p class="error">{{ errors[0] }}</p>
                    </div>
                </ValidationProvider>
                <button class="ui primary button" type="submit" @click="signIn">ログイン</button>
            </form>
        </div>
        <h4>アカウントをお持ちの無い方は<router-link to="/SignUp">こちらをクリック</router-link></h4>
    </div>
</template>

<script>
import firebase from 'firebase'
import { ValidationProvider} from 'vee-validate';
import { extend } from 'vee-validate';
import { localize } from 'vee-validate';
import { required, email, min, alpha_num } from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';
//import func from '../../vue-temp/vue-editor-bridge';

localize('ja', ja);

extend('email', email);
extend('min', min)
extend('required', required);
extend('alpha_num', alpha_num);

export default {
    name: 'SignIn',
    components: {
        ValidationProvider
    },
    data: () => ({
        email: '',
        password: ''
    }),
    methods: {
        signIn: function () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {  // eslint-disable-line
                this.$router.push('/')
            })
            .catch(error => {
                alert(error.message)
            })
        }
    }
}

</script>

<style lang="scss">

.error {
    color: #E02828
}

</style>