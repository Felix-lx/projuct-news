<template>
  <div class="editProfile">
    <tt-header>编辑资料</tt-header>
    <div class="box">
      <div class="img">
        <img v-show="loading" :src="avatar" alt="">
      </div>
      <tt-nav name="昵称" :desc="profile.nickname" @click="nickNameChange"></tt-nav>
      <tt-nav name="密码" desc="******" @click="passWordChange"></tt-nav>
      <tt-nav name="性别" :desc="profile.gender===1?'男':'女'" @click="genderChange"></tt-nav>
    </div>
    <!-- 修改昵称 -->
    <van-dialog v-model="nickNameShow" title="修改昵称" show-cancel-button @confirm="editNickName">
      <van-field v-model="nickNameValue" />
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog v-model="passWordShow" title="修改密码" show-cancel-button @confirm="editPassWord">
      <van-field v-model="passWordValue" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog v-model="genderShow" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="genderValue">
        <van-cell-group>
          <!-- 注意：性别用数字1和0代替，不是字符串 -->
          <van-cell title="男" clickable @click="genderValue = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="genderValue = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>

</template>

<script>
import img from '../assets/avatar.jpg'
export default {
  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  },
  data () {
    return {
      profile: {},
      // 解决图片闪的问题
      loading: false,
      // 修改昵称框的显示与隐藏
      nickNameShow: false,
      // 昵称框的内容
      nickNameValue: '',
      passWordShow: false,
      passWordValue: '',
      genderShow: false,
      genderValue: ''
    }
  },
  // 进页面先渲染
  created () {
    this.getProfile()
  },
  methods: {
    // 将页面渲染封装成方法，以便随时调用
    async getProfile () {
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${userId}`)
      this.profile = res.data.data
      this.loading = true
      // console.log(this.profile)
    },
    // 修改个人信息
    async editProfile (data) {
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res)
      if (res.data.statusCode === 200) {
        this.getProfile()
        this.$toast.success('修改成功')
      }
    },
    nickNameChange () {
      this.nickNameShow = true
      this.nickNameValue = this.profile.nickname
    },
    // 发送请求，将修改的nickname的值传给后台，并重新渲染
    editNickName () {
      this.editProfile({ nickname: this.nickNameValue })
    },
    passWordChange () {
      this.passWordShow = true
      this.passWordValue = this.profile.password
    },
    // 修改密码发送给后台更新
    editPassWord () {
      this.editProfile({ password: this.passWordValue })
    },
    genderChange () {
      this.genderShow = true
      this.genderValue = this.profile.gender
    },
    // 修改性别，发送给后台并更新
    editGender () {
      this.editProfile({ gender: this.genderValue })
    }
  }
}
</script>

<style lang="scss" scoped>
.editProfile{
  .box{
    padding: 0 20px;
    .img{
      padding: 30px 0 ;
      img{
        width: 70px;
        height: 70px;
        margin: 0px auto;
        border-radius: 50%;
      }
    }
  }
  .van-dialog{
    padding: 10px;
    .van-field{
      border: 1px solid #ccc;
      margin-top: 10px;
    }
  }

}

</style>
