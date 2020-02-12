<template>
  <div class="newsDetail">
    <!-- 头部粘性布局 -->
    <van-sticky>
      <div class="header">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div class="followed" v-if="post.has_follow" @click="unFollow">已关注</div>
        <div class="follow" v-else @click="hasFollow">关注</div>
      </div>
      </div>
    </van-sticky>
    <!-- 内容区域 -->
    <div class="content">
      <div class="news-title">{{post.title}}</div>
      <div class="news-tips">
        <!-- post数据一开始是空的，需要等到请求回来以后才会有数据填进去，因此在访问post中的直接数据的时候，
        如post.title是不会报错的，而如果要访问 post.user.nickname 中的数据，浏览器会报错说nickname是
        未定义的，但是数据在请求成功以后还是能拿到的，为了解决这个错误，需要在post当中写入 user 对象，这样
        访问 nickname 相当于访问user 的直接数据，就不会报错了-->
        <span class="user-name">{{post.user.nickname}}</span>
        <span class="time">{{post.user.create_date | time('YYYY-MM-DD HH:mm')}}</span>
      </div>
      <div class="news-video" v-if="post.type === 2">
        <video :src="post.content" controls></video>
      </div>
      <div class="news-content" v-else v-html="post.content"></div>
    </div>
    <!-- 点赞和分享 -->
    <div class="btns">
      <div class="good" @click="like">
        <i class="iconfont icondianzan"></i>
        <em v-if="!post.has_like">点赞</em>
        <em v-else>{{post.like_length}}</em>
      </div>
      <div class="share">
        <i class="iconfont iconweixin"></i>
        <em>微信</em>
      </div>
    </div>
    <!-- 底部评论 -->
    <div class="footer">
      <div class="comment-in" v-if="false">
        <input type="text" placeholder="跟帖">
        <div class="pinglun">
          <i class="iconfont iconpinglun-"></i>
          <em class="pinglun-num">12</em>
        </div>
        <i class="iconfont iconshoucang"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
      <div class="comment-textarea" v-else>
        <van-field
          v-model="message"
          rows="3"
          autosize
          type="textarea"
          maxlength="140"
          placeholder="请输入评论"
          show-word-limit
        />
        <van-button round type="warning">发送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      },
      message: ''
    }
  },
  created () {
    this.getNewsDetail()
  },
  methods: {
    // 加载页面
    async getNewsDetail () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    // 关注
    async hasFollow () {
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.post.has_follow = true
      }
    },
    // 取消关注
    async unFollow () {
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.post.has_follow = false
      }
    },
    // 点赞
    async like () {
      const id = this.post.id
      const res = await this.$axios.get(`/post_like/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200 && message === '点赞成功') {
        this.$toast(message)
        this.post.like_length++
        this.post.has_like = true
      } else {
        this.$toast(message)
        this.post.like_length--
        this.post.has_like = false
      }
    }
  },
  watch: {
    // 监听路由的变化，其中路由地址一旦改变，页面需要重新渲染
    $route () {
      this.getNewsDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.newsDetail{
  padding-bottom: 54px;
}
.header{
  height: 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: #f7f7f7;
  .left{
    width: 40px;
  }
  .center{
    flex:1;
    font-weight: 700;
    text-align: left;
    .iconnew{
    font-size: 50px;
    }
  }
  .right{
    padding-right: 10px;
    width:80px;
    .followed,
    .follow{
      height: 30px;
      line-height: 30px;
      // padding: 0 10px;
      border-radius: 15px;
      font-size: 14px;
    }
    .follow{
      border: 1px solid red;
      background-color: red;
      color: #fff;
    }
    .followed{
      border: 1px solid #ccc;
    }
  }
}
.content{
  padding: 10px;
  .news-title{
    font-size: 18px;
    font-weight: 700;
  }
  .news-tips{
    color:#888;
    padding: 10px 0;
    .user-name{
      margin-right: 10px;
    }
  }
  .news-video{
    video{
      width:100%
    }
  }
}
.btns{
  display: flex;
  justify-content: space-around;
  border-bottom:4px solid #ddd;
  padding: 15px 0;
  .good,
  .share{
    border: 1px solid #ccc;
    height:30px;
    line-height: 30px;
    padding: 0 15px;
    border-radius: 15px;
    font-size: 12px;
    .iconfont{
      margin-right: 5px;
      font-size: 14px;
    }
    .iconweixin{
      color:green;
    }
  }
}
.footer{
  width:100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 0;
  background-color: #f7f7f7;
  input{
    width: 180px;
    height: 34px;
    border-radius:17px;
    background-color: #ddd;
    padding-left: 20px;
  }
  .iconfont{
    font-size: 24px;
  }
  .pinglun{
    position: relative;
    .pinglun-num{
      position:absolute;
      background: red;
      height:20px;
      line-height: 20px;
      color: #fff;
      padding: 0 10px;
      border-radius: 10px;
      left: 14px;
    }
  }
  .comment-textarea{
    display:flex;
  }
}
</style>
