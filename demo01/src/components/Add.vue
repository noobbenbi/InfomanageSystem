<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:msg="alert"></Alert>
     <h1>添加用户</h1>
     <form v-on:submit="addCustomer">
       <div class="well">
         <h4>用户信息</h4>
         <div class="form-group">
           <label>姓名</label>
           <input type="text" class="form-control" placeholder="name" v-model="customer.name"/>
         </div>
         <div class="form-group">
           <label>电话</label>
           <input type="text" class="form-control" placeholder="phone" v-model="customer.phone"/>
         </div>
         <div class="form-group">
           <label>邮箱</label>
           <input type="text" class="form-control" placeholder="email" v-model="customer.email"/>
         </div>
         <div class="form-group">
           <label>学历</label>
           <input type="text" class="form-control" placeholder="education" v-model="customer.education"/>
         </div>
         <div class="form-group">
           <label>毕业学校</label>
           <input type="text" class="form-control" placeholder="graduationschool" v-model="customer.graduationschool"/>
         </div>
         <div class="form-group">
           <label>职业</label>
           <input type="text" class="form-control" placeholder="profession" v-model="customer.profession"/>
         </div>
         <div class="form-group">
           <label>个人简介</label><br/>
           <!-- <input type="text" class="form-control" placeholder="description" v-model="customer.description"/> -->
           <textarea rows="10" class="form-control" v-model="customer.description"></textarea>
         </div>
         <button type="submit" class="btn btn-primary">提交</button>
       </div>
     </form>
  </div>
</template>

<script>
  import Alert from './Alert'
export default {
  name: 'add',
  data () {
    return {
      customer:{},
      alert:""
    }
  },
  methods:{
    addCustomer(e){
      // console.log(123);
      if (!this.customer.name||!this.customer.phone||!this.customer.email) {
        // console.log("必要信息不能空！")
        this.alert = "请填写对应信息";
      }else{
        let newCustomer = {
          name:this.customer.name,
          phone:this.customer.phone,
          email:this.customer.email,
          education:this.customer.education,
          graduationschool:this.customer.graduationschool,
          profession:this.customer.profession,
          description:this.customer.description
        }

        this.$http.post("http://localhost:3000/users",newCustomer)
            .then(function(response){
              // console.log(response)
              this.$router.push({path:"/",query:{alert:"用户信息添加成功！"}})
            })
      }
      e.preventDefault();
    }
  },
  components:{
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
