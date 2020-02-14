<template>
  <div class="header">
    <div class="left" @click="$router.back()">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  text-align: center;
  .left,.right{
    width: 40px;
  }
  .center{
    flex:1;
    font-weight: 700;
    font-size: 14px
  }
}
</style>
