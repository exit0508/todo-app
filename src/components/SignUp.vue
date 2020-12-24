<template>
    <div class="SignUp">
        <h1>TODOリスト</h1>
        <div class="ui raised very padded text container segment">
            <form class="ui form">
                <ValidationProvider rules="email" v-slot="{ errors }">
                    <div class="field">
                    <label>メールアドレス</label>
                    <input v-model="email" type="text" name="メールアドレス" placeholder="メールアドレス">
                    <p class="error">{{ errors[0] }}</p>
                </div>
                </ValidationProvider>
                <ValidationObserver>
                    <ValidationProvider rules="confirmed:confirmation|min:6|alpha_num|required" v-slot="{ errors }">
                        <div class="field">
                            <label>パスワード(英数字6字以上)</label>
                            <input v-model="password" type="password" name="パスワード" placeholder="パスワード">
                            <p class="error">{{ errors[0] }}</p>
                        </div>
                    </ValidationProvider>
                    
                    <ValidationProvider v-slot="{ errors }" vid="confirmation">
                        <div class="field">
                            <label>パスワード(確認用)</label>
                            <input v-model="confirmation" type="password" name="パスワード" placeholder="パスワード">
                            <p class="error">{{ errors[0] }}</p>
                        </div>
                    </ValidationProvider>
                </ValidationObserver>
                <button class="ui primary button" type="submit" @click="signUp">新規登録</button>
            </form>
        </div>
        <h4>アカウントをお持ちの方は<router-link to="/SignIn">こちらをクリック</router-link></h4>
    </div>
</template>

<script>
import firebase from 'firebase'
import { ValidationProvider, extend } from 'vee-validate';
import { localize } from 'vee-validate';
import { required, email, min, alpha_num, confirmed } from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';

localize('ja', ja);

extend('email', email);
extend('min', min)
extend('required', required);
extend('alpha_num', alpha_num);
extend('confirmed', confirmed);

export default {
    name: 'SignUp',
    components: {
        ValidationProvider
    },
    data: () => ({
        email: '',
        password: '',
    }),
    methods: {
        signUp: function () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert('アカウント作成しました:', user.email)
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