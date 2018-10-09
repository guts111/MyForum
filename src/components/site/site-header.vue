<template>
  <div class="site-header" touchmove.prevent>
    <i class="site-button" @click="handleShowSide">三</i>
    <router-link to="/" tag="a" class="site-title">My forum</router-link>
    <div class="btn-wrapper" v-show="uname">
      <router-link  :to="'/user/' + uid">
        <span>欢迎</span> <span>{{uname}}</span>
      </router-link>
      <button class="btn btn-light" @click="handleLogout">退出</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['uname', 'uid'])
  },
  methods: {
    ...mapMutations(['handleShowSide', 'sendInfo', 'setUname', 'hideAll']),
    handleLogout () {
      this.setUname(null)
      document.cookie = 'uid=;Expires=' + new Date()
      this.sendInfo('退出成功')
      setTimeout(() => this.hideAll(), 700)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .site-header
    position sticky
    top 0
    z-index 50
    background-color #fff
    box-shadow 0 3px 10px 0px #0001
    vertical-align middle
    .site-button
      height 4rem
      line-height 4rem
      display inline-block
      padding 0 1rem
      text-align center
    .site-title
      font-size 1.5rem
      margin-left 1.5%
      height 3rem
      line-height 3rem
    .btn-wrapper
      float right
      height 4rem
      line-height 4rem
      vertical-align center
      margin-right: 2%
      span
        color #555
        padding-right: .3rem

</style>
