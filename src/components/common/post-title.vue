<template>
  <ul class="post">
    <router-link tag="li" :to="'/post/' + it.id " class="post-item" v-for="it of list" :key="it.id">
      <span class="apply">{{it.applyC}}</span>
      <div class="first-line">
        <div class="first-left">
          <router-link :to="'/user/' + it.uid " tag="div" class="img-border">
            <img :src="'/static/72/p'+ (97 * it.uid % 61 + 1) +'.png'">
          </router-link>
        </div>
        <div class="first-right">
          <div class="first-right-title">{{it.title}}</div>
          <div class="cate-time-wrapper">
            <div class="first-right-cate">
              <i>category</i>
              {{it.cate}}
            </div>
            <div class="first-right-time">
              <span v-show="!order" class="post-time"><i>Created</i> {{new Date(it.createdAt).toLocaleDateString()}}</span>
              <span v-show="order" class="post-time"><i>Updated</i> {{new Date(it.updatedAt).toLocaleDateString()}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content">{{it.content}}</div>
      <div class="footer">
        <router-link :to="'/user/' + it.uid " class="post-user">By {{it.uname}}</router-link>
        <span class="dele" v-show="uname === it.uname || uname == '云生'" @click.stop="deleteAction(it.id)">delete</span>
      </div>

    </router-link>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['order', 'list'],
  computed: {
    ...mapState(['uname'])
  },
  methods: {
    ...mapMutations(['sendInfo', 'setWaitFor']),
    deleteAction (val) {
      this.setWaitFor(val)
      this.sendInfo('请确认是否删除此主题')
    }
  },
}
</script>

<style lang="stylus" scoped>
  .post
    .post-item
      background-color #fff
      border 1px solid #ddd
      box-shadow 0 1px 1px 0px #0001
      border-radius .5rem
      padding 1.5rem .5rem .5rem
      margin-bottom 1.2rem
      transition  .3s
      position relative
      &:hover
        transform translateY(-1px)
        box-shadow 0 2px 10px 2px #0002
      .apply
        position absolute
        right .8rem
        top .5rem
        color #777
      .first-line
        display flex
        font-size .95rem
        .first-left
          width 4rem
          height 4rem
          padding .2rem .6rem .3rem .2rem
          .img-border
            border-radius .5rem
            overflow hidden
            img
              width 100%
        .first-right
          flex-grow 1
          padding-left .2rem
          .first-right-title
            font-size 20px
            font-weight 400
            margin-top .3rem
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          .cate-time-wrapper
            display flex
            .first-right-cate
              i
                color #ccc
            .first-right-time
              margin-left 3%
              flex-grow 1
              .post-user
                i
                  color: #ccc
              .post-time
                margin-left: 3%
                i
                  color: #ccc
      .content
        padding 0 1rem
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      .footer
        color #999
        padding 0 0 .5rem 0
        &:after
          content ''
          height 0
          display block
          clear both
        .dele , .post-user
          padding-right 3%
          float right
          i
            margin-right .2rem
        .post-user
          font-size .9rem
          margin-top .1rem

</style>
