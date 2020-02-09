<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center">
        <div class="search">
          <span class="iconfont iconsearch"></span>
          搜索新闻
        </div>
      </div>
      <div class="right" @click="$router.push('/profile')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check=false
      :offset="50"
    >
      <van-tabs v-model="active" sticky animated swipeable>
      <van-tab v-for="item in tabList" :key="item.id" :title="item.name">
        <tt-newsList v-for="post in item.newsList" :key="post.id" :post="post"></tt-newsList>
      </van-tab>
      </van-tabs>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      tabList: [],
      // 分页加载组件的数据
      loading: false,
      finished: false,
      // 事情分页加载，发送请求时需要的数据
      pageIndex: 1,
      pageSize: 5
    }
  },
  async created () {
    await this.getTabList()
    this.getNewsList()
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get(`/category`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        data.forEach(item => {
          item.newsList = []
        })
        this.tabList = data
      }
    },

    async getNewsList () {
      const tabListId = this.tabList[this.active].id
      const res = await this.$axios.get('/post', {
        params: {
          category: tabListId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      console.log(data)

      if (statusCode === 200) {
        data.forEach(item => {
          item.comments = {
            length: item.comment_length
          }
        })
        this.tabList[this.active].newsList = [...this.tabList[this.active].newsList, ...data]
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (data.length < this.pageSize) {
          this.finished = true
        }
        console.log(this.tabList)
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.pageIndex++
        this.getNewsList()
      }, 1000)
    }
  },
  watch: {
    active (value) {
      if (this.tabList[this.active].newsList.length > 0) {
        return
      }
      this.getNewsList()
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: 50px;
  line-height: 50px;
  background-color: red;
  display: flex;
  color:#fff;
  text-align: center;
  .left,
  .right{
    width: 70px;
  }
  .center{
    flex: 1;
    .search{
      height: 36px;
      line-height: 36px;
      background-color: rgba(255,255,255,0.5);
      border-radius: 18px;
      margin-top: 7px;
      font-size: 14px;
    }
  }
  .iconnew{
    font-size: 50px;
  }

  .iconwode {
    font-size: 24px;
  }
}
</style>
