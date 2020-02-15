<template>
    <div>
        <input class="ttinput" :class="[status]" :type="type" :placeholder="placeholder" @input="handleInput" :value="value">
        <span class="tip" v-show = "showTips">{{errMsg}}</span>
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
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  data () {
    return {
      status: ''
    }
  },
  methods: {
    handleInput (e) {
      // 注册input时间的子传父时间是必须使用input作事件名，否则在父组件中不能使用v-model作语法糖
      this.$emit('input', e.target.value)
      // 判断是否传了values值
      if (!this.rules) return
      if (this.rules.test(e.target.value)) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    }
  },
  computed: {
    showTips () {
      return this.status === 'error' && this.errMsg
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  position:relative;
  padding-bottom: 18px;
  .ttinput{
    width: 100%;
    height: 38px;
    background: #f7f7f7;
    border-bottom: 1px solid #666;
    font-size: 18px;
    &.error{
      border-bottom:1px solid red;
    }
    &.success{
      border-bottom:1px solid green;
    }
  }
  .tip{
    color: red;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
