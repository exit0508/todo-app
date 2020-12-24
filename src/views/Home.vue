<template>
  <div class="home">
    <menu-bar></menu-bar>
    <todo-input @todo-form="addTodo"></todo-input>
    <div class="ui container left aligned todo-list">
      <h3 class="ui header">登録済みタスク</h3>
      <div class="ui grid">
        <div class="row">
          <div class="one column"></div>
          <div class="four wide column">タイトル</div>
          <div class="two wide column">興味</div>
          <div class="two wide column">楽しさ</div>
          <div class="two wide column">複雑度</div>
          <div class="two wide column">重要度</div>
          <div class="three wide column">編集/削除</div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div v-for="(todo, index) in todos" v-bind:key="todo.id" class="macro-todolist">
          <div class="ui grid">
            <div class="row">
              <div class="one column todo-item">
                <input type="checkbox" v-model="todo.completed" v-on:click="completedTodo(index)">
              </div>
            <div class="four wide column todo-item" :class="{completed: todo.completed}">
              <span v-if="!todo.editing">{{ todo.title }}</span>
              <div v-else class="ui input">
                <input type="text" v-model="todo.title" v-show="todo.editing">
              </div>
            </div>
            <div class="two wide column todo-item">
              {{ todo.interest }}
              <vue-slider v-show="todo.editing" v-model.number="todo.interest" :min="0" :max="5"></vue-slider>
            </div>
            <div class="two wide column todo-item">
              {{ todo.pleasant }}
              <vue-slider v-show="todo.editing" v-model.number="todo.pleasant" :min="0" :max="5"></vue-slider>
            </div>
            <div class="two wide column todo-item">
              {{ todo.complexity }}
              <vue-slider v-show="todo.editing" v-model.number="todo.complexity" :min="0" :max="5"></vue-slider>
            </div>
            <div class="two wide column todo-item">
              {{ todo.importance }}
              <vue-slider v-show="todo.editing" v-model.number="todo.importance" :min="0" :max="5"></vue-slider>
            </div>
            <div class="three wide column">
              <div class="buttons">
                <button v-show="!todo.editing" v-on:click="editTodo(todo, index)" class="ui icon button"><i class="edit icon"></i></button>
                <button v-show="todo.editing" v-on:click="doneEdit(todo, index)" class="ui icon button"><i class="check icon"></i></button>
                <button v-on:click="removeTodo(index)" class="ui icon button"><i class="times icon"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="todo.complexity > 2">
          <div class="ui segment">
            <div class="ui grid">
              <div class="row">
                <div class="one column"></div>
                <div class="four wide column">サブタスク</div>
                <div class="two wide column">興味</div>
                <div class="two wide column">楽しさ</div>
                <div class="two wide column">複雑度</div>
                <div class="two wide column">重要度</div>
                <div class="three wide column">編集/削除</div>
              </div>
              <div class="ui divider"></div>
            </div>
            <div v-for="(subtodo, index) in subtodos" v-bind:key="subtodo.id" class="subtodo-list">
              <div v-show="todo.id == subtodo.subid">
                <div class="ui grid">
                  <div class="row">
                    <div class="one column subtodo-item">
                      <input type="checkbox">
                    </div>
                  <div class="four wide column subtodo-item">
                    <span v-if="!subtodo.editing">{{ subtodo.title }}</span>
                    <div v-else class="ui input">
                      <input type="text" v-model="subtodo.title" v-show="subtodo.editing">
                    </div>
                  </div>
                  <div class="two wide column subtodo-item">
                    {{ subtodo.interest }}
                    <vue-slider v-show="subtodo.editing" v-model.number="subtodo.interest" :min="0" :max="5"></vue-slider>
                  </div>
                  <div class="two wide column subtodo-item">
                    {{ subtodo.pleasant }}
                    <vue-slider v-show="subtodo.editing" v-model.number="subtodo.pleasant" :min="0" :max="5"></vue-slider>
                  </div>
                  <div class="two wide column subtodo-item">
                    {{ subtodo.complexity }}
                    <vue-slider v-show="subtodo.editing" v-model.number="subtodo.complexity" :min="0" :max="5"></vue-slider>
                  </div>
                  <div class="two wide column subtodo-item">
                    {{ subtodo.importance }}
                    <vue-slider v-show="subtodo.editing" v-model.number="subtodo.importance" :min="0" :max="5"></vue-slider>
                  </div>
                  <div class="three wide column buttons">
                    <div class="subbuttons">
                      <button v-show="!subtodo.editing" v-on:click="editMicrotodo(subtodo, index)" class="ui icon button"><i class="edit icon"></i></button>
                    <button v-show="subtodo.editing" v-on:click="doneMicroEdit(subtodo, index)" class="ui icon button"><i class="check icon"></i></button>
                    <button v-on:click="removeMicrotodo(subtodo, index)" class="ui icon button"><i class="times icon"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div v-if="display" class="micro-form">
              <subtodo-input @subtodo-form="addMicrotask" @input-focus="focusInput(todo)" @close-form="display = false"></subtodo-input>
            </div>
            <div v-else>
              <div class="ui right aligned grid">
                  <div class="sixteen wide column">
                    <button @click="display = true" class="ui labeled icon blue button">
                      <i class="times icon"></i>
                      フォーム表示
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import MenuBar from '@/components/MenuBar.vue'
import TodoInput from '@/components/TodoInput.vue'
import SubtodoInput from '@/components/SubtodoInput.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'Home',
  components: {
    MenuBar,
    TodoInput,
    SubtodoInput,
    VueSlider
  },
  data(){
    return {
      user: '',
      database: null,
      todosRef: null,
      subtodosRef: null,
      subtodos: [],
      subtodosArry: [],
      microtodo: '',
      subInterest: 0,
      subPleasant: 0,
      subComplexity: 0,
      subImportance: 0,
      subidArry: [],
      subid: 0,
      idForSubtodo: 1,
      newTodo: '',
      idForTodo: 1,
      interest: '0',
      pleasant: '0',
      complexity: '0',
      importance: '0',
      beforeEditCache: '',
      completed: false,
      todos: [],
      display: true
    }
  },
  created: function() {
      //DBのインスタンスを初期化
      this.database = firebase.database(); //DB参照を取得
      this.user = firebase.auth().currentUser.uid;
      this.todosRef = this.database.ref( this.user +'/todos') //データの読み書きを行う
      this.subtodosRef = this.database.ref( this.user + '/subtodos')

      var _this = this;
        //データに変更があると実行される
        this.todosRef.on('value', function(snapshot){ //onメソッド：イベントを監視
          _this.todos = snapshot.val(); //再取得してtodosに格納
      });
      this.subtodosRef.on('value', function(snapshot){
          _this.subtodos = snapshot.val();
      });

      this.subtodosRef.on('value', (data)=>{
          if(data){
              const rootList = data.val();
              //const key = data.key;

              if(rootList != null){
                  Object.keys(rootList).forEach((val) => {
                      //rootList[val].id = val;
                      this.subtodosArry.push(rootList[val])
                  })
              }

          }
      })
  },
  methods: {
    addMicrotask: function(microtodo, interest, pleasant, complexity, importance){
      if (microtodo.trim().length == 0) {
          return
      }

      var now = new Date()

      this.subtodosRef.push({
          id: this.idForSubtodo,
          subid: this.subid,
          title: microtodo,
          interest: interest,
          pleasant: pleasant,
          complexity: complexity,
          importance: importance,
          completed: false,
          editing: false,
          createAt: now,
          completedAt: null
      })

      this.idForSubtodo ++
    },
    focusInput: function(todo) {
        this.subid = todo.id
        console.log(this.subid)
    },
    removeMicrotodo: function(subtodos, index){
      this.subtodosArry.splice(index, 1);
      this.database.ref( this.user  + '/subtodos').child(index).remove();
    },
    editMicrotodo(subtodo, index){
        this.beforeEditCache = subtodo.title
        this.$set(this.subtodos[index], 'editing', true)
        this.subtodosArry.splice(index, 1, subtodo)
    },
    doneMicroEdit(subtodo, index){
        if (subtodo.title.trim() == '') {
        this.title = this.beforeEditCache
        }
        subtodo.editing = false;
        var updates = {};
        updates[index] = subtodo;
        this.subtodosRef.update(updates)
    },
    addTodo: function(todo, interest, pleasant, complexity, importance){
      if (todo.trim().length == 0) {
            return
        }
        const now = Date();
        //console.log(now)

        this.todosRef.push({
          id: this.idForTodo,
          createAt: now,
          title: todo,
          interest: interest,
          pleasant: pleasant,
          complexity: complexity,
          importance: importance,
          completed: false,
          editing: false,
          completedAt: ''
        })
        this.idForTodo++
    },
    removeTodo: function(index) {
          this.database.ref( this.user +'/todos').child(index).remove();
          //this.todos.splice(index, 1)
    },
    editTodo(todo, index){
      this.beforeEditCache = todo.title
      this.$set(this.todos[index], 'editing', true)
    },
    doneEdit(todo, index){
      if (todo.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      todo.editing = false
      var updates = {};
      updates[ this.user +'/todos/' + index] = todo;
      this.database.ref().update(updates);
    },
    completedTodo(index){
      const now =  Date()

      var updates = {};
      updates[ index + '/completedAt'] = now

      this.todosRef.update(updates);
    }
    
  },
  computed: {
    checkMicrotasks: function(){
        if(this.subtodosArry.length > 3){
            return this.subtodosArry.every(item => item.complexity < 3)
        }else{
            return false
        }
    }
  }
}
</script>

<style lang="scss">
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


  .todo-list {
    font-size: 17px;
    margin-top: 5%;
    margin-bottom: 3%;
  }

  .todo-title {
      width: 30%;
    }

  .todo-param {
      width: 13%;
  }

  .todo-item {
    padding-top: 2%;
    padding-bottom: 1%;
      align-items:center;
      justify-content:center;
      font-weight: 700;
  }
  
  .param-label {
      font-size: small;
  }

  .param-level {
      font-size: large;
      font-weight: 600;
  }

  .subtodo-list {
    margin-top: 2%;
    .subbuttons {
      margin-bottom: -8%;
    }
  }

  .macro-todolist {
    margin-bottom: 2%;
    .buttons {
      margin-top: 6%;
    }
  }

  .subtodo-item {
    margin-top: 3%;
  }

  .completed {
  text-decoration: line-through;
  color: grey;
}

.target {
  color: red;
}

</style>