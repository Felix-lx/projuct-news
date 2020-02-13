<template>
  <div class="register">
    <div class="closebtn">
      <em class="iconfont iconicon-test"></em>
    </div>
    <div class="logo">
      <em class="iconfont iconnew"></em>
    </div>
    <tt-input type="text" placeholder="用户名/手机号码" v-model="form.username" :rules="/^\d{4,11}$/" err-msg="格式输入有误"></tt-input>
    <tt-input type="text" placeholder="昵称" v-model="form.nickname" :rules="/^\d{4,11}$/" err-msg="格式输入有误"></tt-input>
    <tt-input type="password" placeholder="密码" v-model="form.password" :rules="/^\d{3,12}$/" err-msg="密码格式输入有误"></tt-input>
    <tt-button @click="register">注册</tt-button>
    <div class="register">
      已有账号？返回
      <router-link class="login-tip" to="/login">登陆</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        nickname: '',
        password: ''
      }

    }
  },
  methods: {
    async register () {
      if (!this.form.username || !this.form.nickname || !this.form.password) {
        return this.$toast.fail('请输入正确的注册信息')
      }
      const res = await this.$axios.post(`/register`, this.form)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('注册成功')
        // this.$router.push({
        //   name: 'login',
        //   params: {
        //     username: this.form.username,
        //     password: this.form.password
        //   }
        // })
      } else {
        this.$toast('用户名已存在')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.register {
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
  .login-tip{
    color:rgba(204, 51, 0, 1)
  }
}
</style>
