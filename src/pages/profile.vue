<template>
  <div class="profile">
    <div class="user-info">
      <div class="img">
        <img src="http://00.minipic.eastday.com/20161223/20161223175745_ea9a56ee5e29e14be4b9526a1bbcab55_8.jpeg" alt="">
      </div>
      <div class="info">
        <p>
          <i class="iconfont iconxingbienan"></i>
          <span>火星网友</span>
        </p>
        <p>2020-01-01</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="user-list">
      <tt-nav name="我的关注" desc="关注的用户" @click="fn"></tt-nav>
      <tt-nav name="我得跟帖" desc="跟帖/回复" @click="fn"></tt-nav>
      <tt-nav name="我的收藏" desc="文章/视频" @click="fn"></tt-nav>
      <tt-nav name="设置" @click="fn"></tt-nav>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fn () {
      console.log(111)
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
      img{
      width: 70px;
      height: 70px;
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
