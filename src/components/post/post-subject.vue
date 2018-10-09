<template>
  <div class="post-sbuject">
    <h4>{{subject.title}}</h4>
    <button v-show="!uname" class="post-action btn btn-light" @click="handleShowLR(1)">登录回帖</button>
    <button v-show="uname"  class="post-action btn btn-light" @click="goBottom">回复帖子</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: ['subject'],
  methods: {
    ...mapMutations(['handleShowLR', 'changeEditFocus']),
    goBottom () {
      this.changeEditFocus(true)
      var start = document.documentElement.scrollTop || document.body.scrollTop
      var height = document.documentElement.offsetHeight || document.body.Height
      var inner = document.documentElement.clientHeight
      var distance = height - start - inner
      var step = distance / 100
      var sum = 0
      ;(function jump () {
        if (distance > 0) {
          distance -= step
          sum += step
          // document.documentElement.scrollTop = sum + start
          // document.body.scrollTop = sum + start
          window.scrollTo(0, sum + start)
          setTimeout(jump, 5)
        }
      })()
    }
  },
  computed: {
    ...mapState(['uname'])
  }
}
</script>

<style lang="stylus" scoped>
  .post-sbuject
    padding .8rem
    h4
      line-height 2.5rem
    .post-action
      border 1px solid #ddd
      margin-left 1rem
      padding .5rem
      color #777
</style>
