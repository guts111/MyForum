<template>
  <li class="comment">
    <div class="img-info">
      <router-link :to="'/user/' + comment.uid" tag="div" class="img-wrapper">
        <div class="img-border">
          <img :src="'/static/72/p'+ (97 * comment.uid % 61 + 1) +'.png'">
        </div>
      </router-link>
      <div class="info">
        <div class="user">{{comment.uname}}</div>
        <div class="time">{{new Date(comment.createdAt).toLocaleString()}}</div>
      </div>
    </div>
    <div class="content">
      {{comment.content}}
    </div>
    <div class="footer">
      <span class="share"  @click="sendInfo('https://vps.hnh.me/post/'+ (comment.pid || comment.id))">share</span>
      <span class="dele" v-show="uname === comment.uname || uname === '云生'" @click="deleteAction">delete</span>
    </div>
    <div class="floor">{{floor}}</div>
  </li>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['sendInfo', 'setWaitFor']),
    deleteAction () {
      if (this.comment.pid) {
        this.sendInfo('请确认是否删除此回复')
        this.setWaitFor(this.comment.id)
      } else {
        this.sendInfo('请确认是否删除此主楼')
        this.setWaitFor(this.comment.id)
      }
    }

  },
  props: ['comment', 'floor'],
  computed: {
    ...mapState(['uname'])
  }
}
</script>


<style lang="stylus" scoped>
  .comment
    padding .8rem
    border-top 1px solid #ddd
    border-bottom 1px solid #ddd
    box-shadow 0 1px 1px 0px #0001
    transition .3s
    position relative
    background-color #fff
    &:hover
      transform translateY(-1px)
      box-shadow 0 2px 10px 2px #0002
    .img-info
      display flex
      .img-wrapper
        width 4rem
        height 4rem
        padding .5rem
        .img-border
          border-radius .5rem
          overflow hidden
          img
            width 100%
      .info
        padding .5rem
        .user
          font-weight 700
          color #666
        .time
          padding-top .2rem
          color #555
          font-size .9rem
  .content
    color #555
    padding 0 .5rem
  .footer
    color #999
    padding-top .5rem
    &:after
      content ''
      height 0
      display block
      clear both
    .share, .dele
      padding-right 3%
      float right
  .floor
    position absolute
    right .8rem
    top .5rem
    color #777
</style>

