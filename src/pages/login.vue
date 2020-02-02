<template>
<div class="login">
    <div class="closebtn">
      <em class="iconfont iconicon-test"></em>
    </div>
    <div class="logo">
      <em class="iconfont iconnew"></em>
    </div>
    <tt-input type="text" placeholder="请输入6-16位用户名" v-model="username" :rules="/^1\d{4,10}$/" err-msg="用户名格式输入有误"></tt-input>
    <tt-input type="password" placeholder="请输入3-8位密码" v-model="password" :rules="/^\d{3,12}$/" err-msg="密码格式输入有误"></tt-input>
    <tt-button @click="login">登陆</tt-button>
    <div class="register">
      还没有账号？点击
      <router-link class="register-tip" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ttInput from '../components/input'
import ttButton from '../components/button'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    ttInput,
    ttButton
  },
  methods: {
    async login () {
      console.log(111)
      // 发送请求
      if (!this.username || !this.password) return
      const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
      console.log(res)
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  padding: 20px;
  .closebtn {
      em{
          font-size: 27px;
      }
  }
  .logo{
    text-align: center;
      em{
          font-size: 126px;
          color: rgba(204, 51, 0, 1);
      }
  }
  .register-tip{
    color:rgba(204, 51, 0, 1)
  }
}
</style>
