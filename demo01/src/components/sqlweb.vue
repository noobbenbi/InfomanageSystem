<template>
    <div id="app">
  <input type="text" placeholder="请输入姓名" @keyup.enter="addList()" v-model="name"><button @click="addList">添加</button>
  <table border="1" cellpadding="0" cellspacing="0" id="list">
    <caption>
      <h3>我们的花名册</h3>
    </caption>
    <tr>
      <th>序号</th>
      <th>姓名</th>
      <th>操作</th>
    </tr>
    <tr v-for="(val,key) in list" :key="val.id">
      <td>{{val.id}}</td>
      <td>{{val.name}}</td>
      <td>
        <button @click="deleteList(key)" :data-key="key">删除</button>
        <button @click="updateList(key)" :data-key="key">修改</button>
      </td>
    </tr>
    <tr id="item1" class="item" v-if="list.length==0">
      <td colspan="3">暂无数据</td>
    </tr>
  </table>
</div>
</template>

<script src="https://cdn.staticfile.org/vue/2.2.6/vue.min.js"></script>
<script>
var DB = (function() {
  var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024 * 1024);
  var defOption = {
    param: [],
    success: function() {},
    error: function() {},
  }
  var glob = {
    query: function(option) {
      if (option.hasOwnProperty("sql")) {

        option.param = option.param || defOption.param;
        option.success = option.success || defOption.success;
        option.error = option.error || defOption.error;
        db.transaction(function(tx) {
          tx.executeSql(option.sql, option.param, function(transaction, result) {
            option.success.call(this, transaction, result);
          }, function(transaction) {
            option.error.call(this, transaction);
          });
        })

      }
    }
  }
  return glob;
})();
   export default{
  data: function() {
    return {
      name: "sql",
      isName: false,
      list: [
        //{"id":1,"name":"peter"}
      ],
    }
  },
  created: function() {
    DB.query({
      sql: "CREATE TABLE IF NOT EXISTS LIST (id integer primary key AutoIncrement,name)"
    })
    this.getList();
  },
  watch: {
    "name": {
      handler: function(val, oldVal) {
        this.isName = val.length > 0
      }
    }
  },
  methods: {
    addList: function() {
      var than = this;
      if (than.isName) {
        DB.query({
          sql: 'INSERT INTO LIST (name) VALUES (?)',
          param: [than.name],
          success: function() {
            than.name ="";
            than.getList();
          }
        })
      } else {
        alert("请输入姓名");
      }
    },
    updateList: function(key) {
      var than = this;
      var valName = window.prompt("请输入名字", than.list[key].name);
      if (valName !== "" && valName !== null) {
        var val = than.list[key].id;
        DB.query({
          sql: "UPDATE LIST SET name = ? WHERE ID = ?",
          param: [valName, val],
          success: function() {
            console.log("update success");
            than.getList();
          }
        })
      } else if (valName !== null) {
        window.alert("请输入要修改的名字")
      }
    },
    deleteList: function(key) {
      var than = this;
      var val = this.list[key].id;
      DB.query({
        sql: "DELETE FROM LIST WHERE ID = ?",
        param:[val],
        success: function() {
          than.getList();
        }
      })
    },
    getList: function() {
      var than = this;
      DB.query({
        sql: "SELECT * FROM LIST",
        success: function(transaction, result) {
          than.list = [];
          if (result.rows.length > 0) {
            for (var i = 0; i < result.rows.length; i++) {
              than.list.push({
                "id": result.rows[i].id,
                "name": result.rows[i].name
              });
            }
          }
        }
      })
    }
  }
};
</script>
<style>
input {
  border: 1px solid #41B883;
  outline: none;
  height: 35px;
  text-indent: 1em;
  width: 200px;
  margin-right: 10px;
}

button {
  height: 37px;
  width: 100px;
  outline: none;
  background-color: #41B883;
  border: 1px solid #41B883;
  color: #fff;
  margin-right: 10px;
}

button:hover {
  background-color: #41B666
}

td {
  text-align: center;
}

tr td:nth-child(1) {
  width: 50px;
}

tr td:nth-child(3) {
  min-width: 150px;
  width: 10%;
}

tr td:nth-child(3) button {
  width: 50px;
  height: 20px
}

table {
  width: 100%;
}

tr {
  line-height: 40px;
}

td {
  text-align: center;
}
</style>