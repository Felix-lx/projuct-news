<template>
  <div class="newsList" @click="$router.push(`/newsDetail/${post.id}`)">
    <!-- 视频的显示模式 -->
    <div class="info info-video" v-if="post.type===2" >
      <div class="top">
        <p class="two-txt-cut">{{post.title}}</p>
      </div>
      <div class="middle">
        <img class="pic" :src="post.cover[0].url">
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="bottom">
        <div class="other">
          <span class="name">{{post.user.nickname}}</span>
          <span class="follow">{{post.comments.length}}跟帖</span>
        </div>
      </div>
    </div>
    <!-- 小于三张图片的显示模式 -->
    <div class="info info-pic1" v-else-if="post.cover.length < 3">
      <div class="left">
        <p class="two-txt-cut">{{post.title}}</p>
        <div class="other">
          <span class="name">{{post.user.nickname}}</span>
          <span class="follow">{{post.comments.length}} 跟帖</span>
        </div>
      </div>
      <div class="right">
        <img class="pic" :src="post.cover[0].url">
      </div>
    </div>
    <!-- 大于等于三张图片的显示模式 -->
    <div class="info info-pic3" v-else >
      <div class="top">
        <p class="two-txt-cut">{{post.title}}</p>
      </div>
      <div class="middle">
        <img class="pic" :src="post.cover[0].url">
        <img class="pic" :src="post.cover[1].url">
        <img class="pic" :src="post.cover[2].url">
      </div>
      <div class="bottom">
        <div class="other">
          <span class="name">{{post.user.nickname}}</span>
          <span class="follow">{{post.comments.length}}跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}

</script>

<style lang="scss" scoped>
.info{
  padding:20px 10px 10px;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  .other{
    font-size: 14px;
    color: #ccc;
    span{
      padding-right:10px;
    }
  }
  p{
    font-size: 18px;
    margin-bottom:10px;
  }
  img{
  object-fit: cover;
  }
}
.info-pic1{
  display: flex;
  .right{
    .pic{
      width: 120px;
      height: 75px;
    }
  }
}
.info-pic3{
  .middle{
    display: flex;
    margin-bottom:10px;
    .pic{
      flex: 1;
      width: 30%;
      height: 75px;
    }
  }
}
.info-video{
  .middle{
    position:relative;
    .pic{
      width:100%;
      height: 170px;
    }
    .iconshipin{
      width: 50px;
      height: 50px;
      background-color: rgba(0,0,0,0.4);
      position: absolute;
      left:50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      color: #fff;
      font-size: 30px;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
