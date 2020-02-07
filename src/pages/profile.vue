<template>
  <div class="profile">
    <div class="user-info" @click="$router.push('/editProfile')">
      <div class="img">
        <!-- loading的作用：img设置了默认图片，在发送axios请求时，会先显示默认图片。等请求成功再显示头像
        因此，在请求过程中不让img显示，解决“闪一下”的问题 -->
        <img v-show="loading" :src="avatar" alt="">
      </div>
      <div class="info">
        <p>
          <!-- 通过返回的数据判断男女显示的图标 -->
          <i v-if="profile.gender===1" class="iconfont iconxingbienan" style="color:skyblue"></i>
          <i v-else class="iconfont iconxingbienv" style="color:pink"></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p>{{profile.create_data | time}}</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="user-list">
      <tt-nav name="我的关注" desc="关注的用户" @click="$router.push('/myFollow')"></tt-nav>
      <tt-nav name="我得跟帖" desc="跟帖/回复" @click="$router.push('/myComments')"></tt-nav>
      <tt-nav name="我的收藏" desc="文章/视频" @click="$router.push('/myCollect')"></tt-nav>
      <tt-nav name="设置" @click="$router.push('/editProfile')"></tt-nav>
      <tt-nav name="退出" @click="logout"></tt-nav>

    </div>
  </div>
</template>

<script>
// 导入默认图片
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
      // 用于存放返回的数据
      profile: {},
      loading: false
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    this.profile = res.data.data
    this.loading = true
    // console.log(this.profile)
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要退出吗？'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('操作取消')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  .user-info{
    padding:20px;
    display: flex;
    border-bottom: 5px solid #ccc;
    .img{
      width:70px;
      height:70px;
      img{
      width: 100%;
      height: 100%;
      border-radius: 35px;
      }

    }
    .info{
      flex:1;
      padding-left:20px;
      p:nth-child(1){
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        color: #000;
      }
      p:last-child {
        font-size: 14px;
        color: #999;
      }
    }
    .icon{
      line-height: 70px;
    }
  }
  .user-list{
  padding: 20px;
  }

}
</style>
