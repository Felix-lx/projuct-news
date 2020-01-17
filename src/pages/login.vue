<template>
<div class="login">
    <div class="closebtn">
      <em class="iconfont iconicon-test"></em>
    </div>
    <div class="logo">
      <em class="iconfont iconnew"></em>
    </div>
    <ttInput type="text" placeholder="请输入6-16位用户名" v-model="username">用户名格式输入有误</ttInput>
    <ttInput type="password" placeholder="请输入3-8位密码" v-model="password">密码格式输入有误</ttInput>
    <ttButton>登陆</ttButton>
    <div class="register">
      还没有账号？点击
      <router-link class="register-tip" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import ttInput from '../components/input'
import ttButton from '../components/button'
export default {
  data () {
    return {

    }
  },
  components: {
    ttInput,
    ttButton
  }
}
</script>

<style lang='scss'>
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
