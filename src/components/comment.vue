<template>
  <div class="comment">
    <div class="title">
      <img :src="this.$axios.defaults.baseURL+comment.user.head_img" alt="">
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | time}}</div>
      </div>
      <div class="reply" @click="reply(comment.id,comment.user.nickname)">回复</div>
    </div>
    <!-- 评论组件给楼层组件注册reply事件，newsDetail组件给评论组件注册reply事件，相当于孙传子，子传父 -->
    <tt-floor v-if="comment.parent" :comment="comment.parent" :index="index" @reply="reply"></tt-floor>
    <div class="content">
      {{comment.content}}
    </div>
  </div>
</template>

<script>
import ttFloor from './floor'
export default {
  props: {
    comment: Object
  },
  data () {
    return {
      index: this.getCommentLength(0, this.comment)
    }
  },
  methods: {
    reply (id, nickname) {
      console.log('我是comment组件')
      // 子传父，将要回复的数据id传给父组件用于发请求，comment传newsdetail
      this.$emit('reply', id, nickname)
    },
    // 反向给出楼层数，传入comment用于条件判断
    getCommentLength (num, comment) {
      if (comment.parent) {
        return this.getCommentLength(num + 1, comment.parent)
      } else {
        return num
      }
    }
  },
  components: {
    ttFloor
  }
}
</script>

<style lang="scss" scoped>
.comment{
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title{
    display: flex;
    margin-bottom: 10px;
    img{
      width:40px;
      height: 40px;
      border-radius: 50%;
    }
    .info{
      flex: 1;
      padding-left: 10px;
      .name{
        font-size: 16px;
      }
    }
    .reply{
      width: 40px;
      text-align: right;
    }
  }
  .content{
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
