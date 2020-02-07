<template>
  <div class="myFollow">
    <tt-header>我的关注</tt-header>
    <div class="item" v-for="(item,index) in myFollowList" :key="item.id">
      <div class="left">
        <img :src="avatar(index)" alt="">
      </div>
      <div class="center">
        <p class="name">{{item.nickname}}</p>
        <p class="time">{{item.create_time | time}}</p>
      </div>
      <div class="right" @click="cancelFollow(item.id)">取消关注</div>
      </div>
  </div>
</template>

<script>
import img from '../assets/avatar.jpg'
export default {
  data () {
    return {
      myFollowList: ''
    }
  },
  created () {
    this.getMyFollowList()
  },
  methods: {
    async getMyFollowList () {
      // const id = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user_follows`)
      if (res.data.statusCode === 200) {
        this.myFollowList = res.data.data
      }
      // console.log(this.myFollowList)
    },
    avatar (index) {
      if (this.myFollowList[index].head_img) {
        return this.$axios.defaults.baseURL + this.myFollowList[index].head_img
      } else {
        return img
      }
    },
    cancelFollow (id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要取消关注该用户吗？'
      }).then(async () => {
        // on confirm
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        // console.log(res)
        if (res.data.statusCode === 200) {
          this.$toast.success('取消关注成功')
          this.getMyFollowList()
        }
      }).catch(() => {
        // on cancel
        this.$toast('取消操作')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.myFollow{
  .item{
    display: flex;
    padding:20px;
    border-bottom: 1px solid #ccc;
    align-items:center;
    .left{
      width: 40px;
      height: 40px;
      img{
        width:100%;
        height: 100%;
        border-radius:50%;
      }
    }
    .center{
      flex:1;
      padding-left:10px;
      .name{
        font-size: 18px;
      }
      .time{
        font-size: 14px;
        color: #999;
      }
    }
    .right{
      height:30px;
      border-radius:15px;
      line-height: 30px;
      padding: 0 10px;
      background-color: #ccc;
      color: #333;
      font-size: 14px;
    }
  }
}
</style>
