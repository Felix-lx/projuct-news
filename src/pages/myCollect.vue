<template>
  <div class="myCollect">
    <tt-header>我的收藏</tt-header>
    <div class="noneContent" v-if="data.length===0">╮（╯＿╰）╭还没有收藏过文章</div>
    <tt-news-list v-else v-for="item in data" :key="item.id" :post="item" @click="getEssay"></tt-news-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    this.getCollectList()
  },
  methods: {
    async getCollectList () {
      const res = await this.$axios.get(`/user_star`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.data = data
        // console.log(this.data)
      }
    },
    getEssay () {
      this.$router.push('/essay')
    }
  }
}
</script>
<style lang="scss" scoped>
.noneContent{
  text-align: center;
  line-height: 70px;
  height: 100px;
  font-size: 14px;
  color: #aaa;
}
</style>
