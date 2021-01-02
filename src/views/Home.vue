<template>
  <div class="home">
    <menu-bar></menu-bar>
    <todo-input @todo-form="addTodo"></todo-input>
    <div class="ui container left aligned">
      <h3 class="ui header">登録済みタスク</h3>
      <div class="todo-wrapper">
        <div class="item-title">
          タイトル
        </div>
        <div class="item">
          興味
        </div>
        <div class="item">
          楽しさ
        </div>
        <div class="item">
          複雑さ
        </div>
        <div class="item">
          重要性
        </div>
        <div class="item">
          締切
        </div>
        <div class="item-edit">
          編集/削除
        </div>
        <hr size="10" width="100%" align="center" class="divider">
      </div>
      <div v-for="(todo, index) in todos" v-bind:key="todo.id" class="todo-wrapper">
        <div class="item-title">
          <input type="checkbox" v-model="todo.completed" v-on:click="completedTodo(index)" class="check-box">
          <div :class="{completed: todo.completed}">
            <div v-if="!todo.editing">{{ todo.title }}</div>
            <div v-else class="ui input">
              <input type="text" v-model="todo.title" v-show="todo.editing">
            </div>
          </div>
        </div>
        <div class="item">
          {{ todo.interest }}
          <vue-slider v-show="todo.editing" v-model.number="todo.interest" :min="0" :max="5"></vue-slider>
        </div>
        <div class="item">
          {{ todo.pleasant }}
          <vue-slider v-show="todo.editing" v-model.number="todo.pleasant" :min="0" :max="5"></vue-slider>
        </div>
        <div class="item">
          {{ todo.complexity }}
          <vue-slider v-show="todo.editing" v-model.number="todo.complexity" :min="0" :max="5"></vue-slider>
        </div>
        <div class="item">
          {{ todo.importance }}
          <vue-slider v-show="todo.editing" v-model.number="todo.importance" :min="0" :max="5"></vue-slider>
        </div>
        <div class="item">
          {{ todo.deadline }}
          <v-date-picker v-model="todo.deadline" :model-config="modelConfig">
            <template v-slot="{ inputValue, inputEvents }">
              <div class="ui input deadline">
                <input type="text" :value="inputValue" v-on="inputEvents" v-show="todo.editing">
              </div>
            </template>
          </v-date-picker>
        </div>
        <div class="item-edit">
          <div class="buttons">
            <button v-show="!todo.editing" v-on:click="editTodo(todo, index)" class="ui icon button"><i class="edit icon"></i></button>
            <button v-show="todo.editing" v-on:click="doneEdit(todo, index)" class="ui icon button"><i class="check icon"></i></button>
            <button v-on:click="removeTodo(index)" class="ui icon button"><i class="times icon"></i></button>
          </div>
        </div>
        <div v-if="todo.complexity > 2">
          <div class="ui container segment subtodo-list">
            <div class="todo-wrapper">
              <div class="item-title">
                タイトル
              </div>
              <div class="item">
                興味
              </div>
              <div class="item">
                楽しさ
              </div>
              <div class="item">
                複雑さ
              </div>
              <div class="item">
                重要性
              </div>
              <div class="item">
                締切
              </div>
              <div class="item-edit">
                編集/削除
              </div>
              <hr size="10" width="100%" align="center" class="divider">
            </div>
            <div v-for="(subtodo, index) in subtodos" v-bind:key="subtodo.id">
              <div v-show="todo.id == subtodo.subid" class="todo-wrapper">
                <div class="item-title">
                  <input type="checkbox" v-model="subtodo.completed" v-on:click="completedTodo(index)" class="check-box">
                    <div :class="{completed: todo.completed}">
                      <div v-if="!subtodo.editing">{{ subtodo.title }}</div>
                      <div v-else class="ui input">
                        <input type="text" v-model="subtodo.title" v-show="subtodo.editing">
                      </div>
                    </div>
                </div>
                <div class="item">
                  {{ subtodo.interest }}
                  <vue-slider v-show="subtodo.editing" v-model.number="subtodo.interest" :min="0" :max="5"></vue-slider>
                </div>
                <div class="item">
                  {{ subtodo.pleasant }}
                  <vue-slider v-show="subtodo.editing" v-model.number="subtodo.pleasant" :min="0" :max="5"></vue-slider>
                </div>
                <div class="item">
                  {{ subtodo.complexity }}
                  <vue-slider v-show="subtodo.editing" v-model.number="subtodo.complexity" :min="0" :max="5"></vue-slider>
                </div>
                <div class="item">
                  {{ subtodo.importance }}
                  <vue-slider v-show="subtodo.editing" v-model.number="subtodo.importance" :min="0" :max="5"></vue-slider>
                </div>
                <div class="item">
                  {{ subtodo.deadline }}
                  <v-date-picker v-model="subtodo.deadline" :model-config="modelConfig">
                    <template v-slot="{ inputValue, inputEvents }">
                      <div class="ui input deadline">
                        <input type="text" :value="inputValue" v-on="inputEvents" v-show="subtodo.editing">
                      </div>
                    </template>
                  </v-date-picker>
                </div>
                <div class="item-edit">
                  <div class="buttons">
                    <button v-show="!subtodo.editing" v-on:click="editMicrotodo(subtodo, index)" class="ui icon button"><i class="edit icon"></i></button>
                    <button v-show="subtodo.editing" v-on:click="doneMicroEdit(subtodo, index)" class="ui icon button"><i class="check icon"></i></button>
                    <button v-on:click="removeMicrotodo(subtodo, index)" class="ui icon button"><i class="times icon"></i></button>
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
                      <i class="pencil alternate icon"></i>
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
//import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';



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
      getIdRef: null,
      todoKey: '',
      idForTodo: 1,
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
      interest: '0',
      pleasant: '0',
      complexity: '0',
      importance: '0',
      beforeEditCache: '',
      completed: false,
      todos: [],
      display: true,
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
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

      if( this.todosRef != null){ //DBがnullじゃなかったら
        this.getIdRef = firebase.database().ref(this.user +'/todos').orderByChild( this.todoKey +'/id').limitToLast(1)
        this.getIdRef.on('child_added', function(snapshot){
          var latestTodo = snapshot.val()
          _this.idForTodo = latestTodo.id + 1  //最後のidをidForTodoに代入する
        })
      }

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
          completedAt: null,
          deadline: '-'
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
        
        if(complexity > 3){
          //this.$toast.open('Howdy!');
        }

        const now = Date();
        //console.log(now)

        this.todoKey = this.todosRef.push({
          id: this.idForTodo,
          createAt: now,
          title: todo,
          interest: interest,
          pleasant: pleasant,
          complexity: complexity,
          importance: importance,
          completed: false,
          editing: false,
          completedAt: '',
          deadline: '-'
        })
        //this.idForTodo++
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
    completedTodo(todo, index){
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

  .subtodo-list {
    margin-top: 10px;
  }

  .todo-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 3px;

    .item-title {
      width: 20%;
      display: flex;

      .check-box {
        margin-right: 10px;
        margin-top: 2px;
      }
    }

    .item {
      width: 13%;
      padding-right: 8px;

      .deadline {
        width: 98%;
      }
    }

    .item-edit {
      width: 15%;
      margin-bottom: 5px;
    }
  }

  .completed {
  text-decoration: line-through;
  color: grey;
}

.target {
  color: red;
}

</style>