<template>
  <div class="myCollect">
    <tt-header>我的收藏</tt-header>
    <tt-news-list v-for="item in data" :key="item.id" :post="item" @click="getEssay"></tt-news-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
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
