<template>
  <div>
    <button @click='handleClick'><slot></slot></button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  margin:10px 0;
  button{
    width:100%;
    height: 40px;
    font:16px/20px Arial;
    text-align: center;
    border-radius: 23px;
    color: #fff;
    background-color: rgba(204, 51, 0, 1);
  }
}
</style>
