<template>
  <div class="tabManager">
    <tt-header>栏目管理</tt-header>
    <div class="tab">
      <div class="have" >
        <div class="title">点击删除以下频道</div>
        <ul>
          <li
            class="hist"
            v-for="(item,index) in haveList"
            :key="item.id"
            @click="del(item,index)">
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="other">
        <div class="title">点击添加以下频道</div>
        <ul>
          <li
            class="hist"
            v-for="(item,index) in otherList"
            :key="item.id"
            @click="add(item,index)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      haveList: [],
      otherList: []
    }
  },
  created () {
    // 优先在缓存中获取。如果缓存中没有再发请求拿
    const haveList = JSON.parse(localStorage.getItem('haveList'))
    const otherList = JSON.parse(localStorage.getItem('otherList'))
    if (haveList && otherList) {
      this.haveList = haveList
      this.otherList = otherList
    } else {
      this.getTabList()
    }
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get(`/category`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.haveList = data
      }
    },
    del (item, index) {
      if (this.haveList.length <= 3) {
        return this.$toast('不能再少了')
      }
      this.otherList.push(item)
      this.haveList.splice(index, 1)
    },
    add (item, index) {
      this.haveList.push(item)
      this.otherList.splice(index, 1)
    }
  },
  watch: {
    // haveList或者otherList变化对应缓存中要重新存储数据
    haveList () {
      localStorage.setItem('haveList', JSON.stringify(this.haveList))
      localStorage.setItem('otherList', JSON.stringify(this.otherList))
    }
  }
}
</script>

<style lang="scss" scoped>
.tabManager{
  padding: 10px;
  .have{
  padding-bottom: 10px;
}
.hist{
  display: inline-block;
  border: 1px dashed #ccc;
  padding:5px 10px;
  margin: 10px;
  font-size: 14px;
}
.title{
  margin: 20px 0;
  font-size: 12px;
  color: #888;
}
}

</style>
