// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Customers from './components/Customers'
import About from './components/About'
import VueResource from 'vue-resource'
import Add from './components/Add'
import UserDetails from './components/UserDetails'
import Edit from './components/Edit'
import Sql from './components/sqlweb'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode:"history",
  base:__dirname,
  routes:[
    {path:"/",component:Customers},
    {path:"/about",component:About},
    {path:"/add",component:Add},
    {path:"/customer/:id",component:UserDetails},
    {path:"/edit/:id",component:Edit},
    {path:"/sql",component:Sql}

  ]
})
/* eslint-disable no-new */
new Vue({
  router,
  template:`
     <div id="app">
        <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">用户管理系统</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/">主页</router-link></li>
            <!-- <li><a href="/about">关于我们</a></li> -->
            <li><a href="https://user.qzone.qq.com/768069291">QQ</a></li>
            <li><a href="http://127.0.0.1:8848/test01/src/js/index.html">关于我们</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/add">添加用户</router-link></li>

          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
        <router-view></router-view>
     </div>
     `
}).$mount("#app")
