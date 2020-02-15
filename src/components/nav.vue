<template>
  <div class="nav" @click='handleclick'>
    <div class="name">{{name}}</div>
    <div class="desc">{{desc}}</div>
    <div class="icon">
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  },
  methods: {
    handleclick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  font-size: 14px;
  color: #999;
  .name {
    color: #000;
    font-size: 16px;
  }
  .desc {
    flex: 1;
    text-align: right;
  }
}
</style>
