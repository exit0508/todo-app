<template>
    <div class="TodoInput">
        <div class="ui container left aligned">
            <div class="ui stackable container todo-form">
                <div class="ui tall stacked segment">
                    <h2 class="ui dividing header">タスク登録</h2>
                    <form class="ui form" v-on:submit.prevent="addClick">
                        <div class="row">
                            <div class="field">
                                <div class="ui stackable four column grid">
                                    <div class="two column row">
                                        <div class="column">
                                            <input type="text" v-model="inputTodo" @focus="onFocus" class="todo-input" placeholder="タスク入力">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ui stackable four column grid">
                            <div class="row">
                                <div class="column">
                                    <div class="label">
                                        興味：
                                    </div>
                                    <div class="level">
                                        {{ inputInterest }}
                                    </div>
                                    <vue-slider v-model.number="inputInterest" :min="0" :max="5"></vue-slider>
                                </div>
                                <div class="column">
                                    <div class="label">
                                        楽しさ：
                                    </div>
                                    <div class="level">
                                        {{ inputPleasant }}
                                    </div>
                                    <vue-slider v-model.number="inputPleasant" :min="0" :max="5"></vue-slider>
                                </div>
                                <div class="column">
                                    <div class="label">
                                        複雑さ：
                                    </div>
                                    <div class="level">
                                        {{ inputComplexity }}
                                    </div>
                                    <vue-slider v-model.number="inputComplexity" :min="0" :max="5"></vue-slider>
                                </div>
                                <div class="column">
                                    <div class="label">
                                        重要性：
                                    </div>
                                    <div class="level">
                                        {{ inputImportance }}
                                    </div>
                                    <vue-slider v-model.number="inputImportance" :min="0" :max="5"></vue-slider>
                                </div>
                            </div>
                        </div>
                        <div class="ui right aligned grid">
                            <div class="sixteen wide column">
                                <button class="circular ui icon blue button">
                                    <i class="plus icon"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .todo-form {
        margin-top: 3%;
    }
    .todo-input {
            margin-top: 7%;
            padding: 0% 10%
        }

    .label {
            font-size: small;
        }

    .level {
        font-size: large;
        font-weight: 700;
        }
</style>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'TodoInput',
    components: {
        VueSlider
    },
    data() {
        return {
            inputTodo: '',
            inputInterest: 0,
            inputPleasant: 0,
            inputComplexity: 0,
            inputImportance: 0
        }
    },
    methods: {
        addClick: function(){
                this.$emit('todo-form', this.inputTodo, this.inputInterest, this.inputPleasant, this.inputComplexity, this.inputImportance)
                this.inputTodo = '',
                this.inputInterest = 0,
                this.inputPleasant = 0,
                this.inputComplexity = 0,
                this.inputImportance = 0
        },
        onFocus: function() {
            this.$emit('input-focus')
        }
    }
}
</script>