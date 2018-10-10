<template>
  <div class="recommend">
    <div class="recommend-head">查看更多本板块主题</div>
    <div class="title">
      <span class="left">标题</span>
      <span>创建日期</span>
    </div>
    <router-link :to='"/post/" + it.id' tag="div" class="item" v-for="it in this.$store.getters.neededList.slice(0,4)" :key="it.id">
      <span class="left">{{it.title}}</span>
      <span>{{new Date(it.createdAt).toLocaleDateString()}}</span>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="stylus" scoped>
  .recommend
    padding 1.2rem 1.5rem 2.5rem
    margin-top 2rem
    border-top 1px solid #ddd
    background-color #fff
    .recommend-head
      text-align center
      font-size 1.2rem
      font-weight 500
      margin-bottom 1rem
    .title, .item
      display flex
      padding .7rem 0
      border-bottom 1px solid #ddd
      span
        padding 0 .4rem
      .left
        flex-grow 1
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
    .title
      border-bottom 2px solid #ddd
      font-size 1.05rem
      font-weight 500
</style>

