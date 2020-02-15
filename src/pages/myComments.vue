<template>
  <div class="myComments">
    <tt-header>我的跟帖</tt-header>
    <!-- 使用vant-ui的list组件，实现分页加载功能 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check=false
      :offset="50"
    >
      <div class="list" v-for="item in data" :key="item.id">
        <!-- 过滤器：传了两个参数，一个是item.create_date，一个是'YYYY-MM-DD HH:mm'格式，过滤器写在main.js
        中，详情可以再看vue官网 -->
        <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm') }}</div>
        <div class="parent" v-if="item.parent">
          <p>回复：{{item.parent.user.nickname}}</p>
          <p>{{item.parent.content}}</p>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="origin">
          <span class=" one-txt-cut">原文是：{{item.post.title}}</span>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: '',
      // 分页加载组件的数据
      loading: false,
      finished: false,
      // 事情分页加载，发送请求时需要的数据
      pageIndex: 1,
      pageSize: 5
    }
  },
  created () {
    this.getCommentsList()
  },
  methods: {
    async getCommentsList () {
      // 分页功能分多次发送请求
      // 根据axios中文使用说明，post和push请求发送数据，数据通过data来提供，可以直接写在{}里面
      // get请求提供数据，需要使用params来提供
      const res = await this.$axios.get(`/user_comments`, {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.data = [...this.data, ...data]
        console.log(this.data)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.pageIndex++
        this.getCommentsList()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  border-bottom: 1px solid #ccc;
  padding: 20px;
  font-size: 14px;
  .time{
    color: #888;
  }
  .parent{
    background-color: #ddd;
    padding: 10px;
    margin-top:10px;
    color: #888;
    p{
      font-size:12px;
      &:nth-child(1){
        padding-bottom: 10px;
      }
    }

  }
  .content{
    margin-top:10px;
  }
  .origin{
    margin-top: 10px;
    display: flex;
    color: #888;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
