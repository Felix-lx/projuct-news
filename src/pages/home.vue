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
      <van-tabs v-model="active" sticky animated swipeable>
        <van-tab v-for="item in tabList" :key="item.id" :title="item.name">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check=false
              :offset="50"
              ref="check"
            >
              <tt-newsList v-for="post in item.newsList" :key="post.id" :post="post"></tt-newsList>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      active: localStorage.token ? 1 : 0,
      tabList: [],
      // 分页加载组件的数据
      loading: false,
      // 事情分页加载，发送请求时需要的数据
      pageSize: 5,
      refreshing: false
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
          item.pageIndex = 1
          item.finished = false
        })
        this.tabList = data
      }
    },

    async getNewsList () {
      const res = await this.$axios.get('/post', {
        params: {
          category: this.tabList[this.active].id,
          pageIndex: this.tabList[this.active].pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data

      if (statusCode === 200) {
        data.forEach(item => {
          item.comments = {
            length: item.comment_length
          }
        })
        this.tabList[this.active].newsList = [...this.tabList[this.active].newsList, ...data]
        // console.log(this.tabList[this.active].newsList)
        // 下拉刷新功能的内容
        this.refreshing = false
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        // console.log(data.length)
        if (data.length < this.pageSize) {
          this.tabList[this.active].finished = true
        }
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      console.log('onload事件触发了')
      // 解决bug：一进来如果没有在头条页面先触发一次load事件，就直接切换到其他tab页面的时候，
      // 一旦开始在其他页面触发load事件，load事件就停不下来了。
      // 解决方式一：
      // if (this.tabList[this.active].finished) {
      //   console.log('onload事件不执行')
      //   return
      // }
      // 解决方式二：
      //
      setTimeout(() => {
        this.tabList[this.active].pageIndex++
        this.getNewsList()
      }, 1000)
    },
    onRefresh () {
      // 清空列表数据
      this.tabList[this.active].finished = false
      this.tabList[this.active].pageIndex = 1
      this.tabList[this.active].newsList = []
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.getNewsList()
    }
  },
  watch: {
    active (value) {
      this.loading = true
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
