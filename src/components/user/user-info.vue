<template>
  <div>
    <div class="user-title">用户信息</div>
    <div class="user-info">
      <div class="img-wrapper">
        <div class="img-border">
          <img :src="'/static/72/p'+ (97 * user.id % 61 + 1) +'.png'">
        </div>
      </div>
      <div class="info">
        <div class="user">{{user.name}}</div>
        <div class="time">注册时间 : {{new Date(user.createdAt).toLocaleString()}}</div>
        <div class="content">{{user.sign == null ? '还没有设置签名': user.sign }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style lang="stylus" scoped>
  .user-title
    text-align center
    font-weight 500
    font-size 1.5rem
    height 3.5rem
    line-height 3.5rem
    margin-bottom .5rem
    color #444
  .user-info
    background-color #fff
    border 1px solid #ddd
    box-shadow 0 3px 10px 0px #0001
    border-radius .5rem
    padding .5rem
    transition  .3s
    display flex
    margin-bottom 1.5rem
    .img-wrapper
      width 4rem
      height 4rem
      padding .6rem .3rem 0rem .3rem
      overflow hidden
      .img-border
        border-radius .5rem
        overflow hidden
        img
          width 100%
    .info
      padding .5rem .5rem .5rem 1.5rem
      .user
        font-size: 1.25rem
        font-weight 700
        color #666
      .time
        color #777
        font-size: 1.1rem
      .content
        margin-top .5rem
        color #777
        font-size: 0.95rem
</style>
