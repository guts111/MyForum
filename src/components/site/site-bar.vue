<template>
  <transition name="slide-fade">
    <div class="site-bar" touchmove.prevent>
      <div class="site-btn-wrapper" v-show="!uname">
        <button type="button" class="btn btn-info" @click="handleShowLR(1)">登录</button>
      </div>
      <div class="site-btn-wrapper" v-show="!uname">
        <button type="button" class="btn btn-light" @click="handleShowLR(0)">注册</button>
      </div>
      <div class="site-btn-wrapper" v-show="uname">
        <router-link to="/settings" @click="console.log(1)" tag="button" type="button" class="btn btn-info">设置</router-link>
      </div>
      <div class="site-btn-wrapper" v-show="uname">
        <button type="button" class="btn btn-light" @click="handleLogout">退出</button>
      </div>
      <div class="site-btn-wrapper">
        <button type="button" class="btn btn-light" @click="about">关于</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['handleShowLR', 'changeClickL', 'sendInfo', 'setUname', 'hideAll', 'setWaitFor']),
    handleLogout () {
      this.setUname(null)
      document.cookie = 'uid=;Expires=' + new Date()
      this.hideAll()
      this.sendInfo('退出成功')
      setTimeout(() => this.hideAll(), 700)
    },
    about () {
      this.sendInfo('为了更好的发展,需要您的赞助')
      this.setWaitFor('nevermind')
    }
  },
  computed: {
    ...mapState(['uname'])
  },
  beforeRouterLeave (to, from, next) {
    console.log(1)
  }
}
</script>

<style lang="stylus" scoped>
  .slide-fade-enter-active {
  transition: all .4s cubic-bezier(.49,.04,.42,1.04);
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(.49,.04,.42,1.04);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(-60%);
    opacity: 0;
  }
  .site-bar
    position fixed
    top 0
    bottom 0
    z-index 100
    left 0
    width 60%
    max-width 15rem
    background-color #fff
    padding-top 2rem
    box-shadow 0px 2px 20px #0003
    .site-btn-wrapper
      height 4.5rem
      line-height 4.5rem
      text-align center
      button
        font-size 1.2rem
        padding 0.5rem 3rem


</style>
