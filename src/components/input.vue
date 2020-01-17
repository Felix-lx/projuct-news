<template>
    <div>
        <input :type="type" :placeholder="placeholder" @input="handleInput" :value="value">
        <span class="tip"><slot></slot></span>
    </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput () {
      console.log(111)
      this.$emit('input')
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  position:relative;
  padding-bottom: 18px;
  input{
    width: 100%;
    height: 38px;
    background: #f7f7f7;
    border-bottom: 1px solid #666;
    font-size: 18px;
  }
  .tip{
    color: red;
    position: absolute;
    left: 0;
    bottom: 0;
  }

}

</style>
