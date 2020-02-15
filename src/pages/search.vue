<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <i class="iconfont iconjiantou"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <input type="text" v-model="keyword" placeholder="请输入搜索关键字" ref="input" @keyup.enter="search">
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 显示新闻列表或者显示搜索记录 -->
    <div class="newsList" v-if="postList.length > 0">
      <tt-newsList v-for="item in postList" :key="item.id" :post="item"></tt-newsList>
    </div>
    <div class="notes" v-else>
      <div class="history" >
        <h3 class="title">历史记录</h3>
        <ul>
          <li
            class="hist"
            v-for="item in historyword"
            :key="item"
            @click="hotAndHistorySearch(item)">
            {{item}}
            <i @click.stop="del(item)"> x </i>
          </li>
        </ul>
      </div>
      <div class="hot">
        <h3 class="title">热门搜索</h3>
        <ul>
          <li v-for="item in hotword" :key="item" @click="hotAndHistorySearch(item)">{{item}} </li>
        </ul>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      postList: [],
      hotword: ['王祖贤', '关晓彤'],
      // 注意要加一个空数组，否则在没有数据的时候historyword无法判断为数组，无法filter，会报错的
      historyword: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  async created () {
    await this.$nextTick()
    this.$refs.input.focus()
  },
  methods: {
    back () {
      if (this.keyword) {
        this.postList = ''
        this.keyword = ''
        return
      }
      this.$router.push('/home')
    },
    // 搜索功能
    async search () {
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        data.forEach(item => {
          item.comments = {
            length: item.comment_length
          }
        })
        this.postList = data
        this.historyword = this.historyword.filter(item => item !== this.keyword)
        this.historyword.unshift(this.keyword)
        localStorage.setItem('history', JSON.stringify(this.historyword))
      }
    },
    // 历史记录和热搜搜索
    hotAndHistorySearch (item) {
      this.keyword = item
      this.search()
    },
    del (value) {
      // 问题：removeItem 用来删除key 希望找到方法可以删除某个key下的某条数据
      this.historyword = this.historyword.filter(item => item !== value)
      localStorage.setItem('history', JSON.stringify(this.historyword))
    }
  },
  watch: {
    keyword (value) {
      if (value === '') {
        this.postList = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  .header {
    display: flex;
    border-bottom: 1px solid #eee;
    height: 50px;
    line-height: 50px;
    .left,
    .right {
      width: 50px;
      text-align: center;
    }
    .center {
      flex:1;
      height: 34px;
      margin-top: 7px;
      border: 1px solid #ccc;
      border-radius: 17px;
      display: flex;
      padding-right: 20px;
      .iconfont {
        width: 40px;
        line-height: 34px;
        text-align: center;
      }
      input {
        flex: 1;
        font-size: 12px;
        background-color: #f7f7f7;
      }
    }
  }
  .notes{
    padding:10px;
    .history{
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      .hist{
        display: inline-block;
        border: 1px dashed #ccc;
        padding:5px;
        margin: 5px;
        border-radius:100px;
        font-size: 14px;
      }
    }
    .title{
      margin: 20px 0;
      font-size: 18px;
      font-weight: 900;
    }
  }
}
</style>
