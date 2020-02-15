<template>
  <div class="main">
    <tt-floor v-if="comment.parent" :comment="comment.parent" :index="index-1" @reply="reply"></tt-floor>
    <div class="floor">
      <div class="title">
        <div class="name">{{index}}楼 {{comment.user.nickname}} </div>
        <div class="time">{{comment.create_date | time('YYYY-MM-DD HH:mm:SS')}}</div>
        <div class="reply" @click="reply(comment.id,comment.user.nickname)">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tt-floor',
  props: {
    comment: Object,
    index: Number
  },
  methods: {
    reply (id, nickname) {
      console.log('我是floor组件')
      // 孙传子 floor传comment
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang="scss" scoped>
.floor{
  border-top: 1px solid #ccc;
  padding: 10px;
  background-color: #ddd;
  .title{
    display: flex;
    align-items:flex-end;
    margin-bottom: 10px;
    .name{
      font-size: 14px;
    }
    .time{
      flex:1;
      padding-left: 10px;
    }
    .reply{
      color: #888;
    }
  }
  .content{
    font-size: 14px;
  }

}
</style>
