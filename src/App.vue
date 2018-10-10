<template>
  <div class="all">
    <div class="main" :style="filterMobj">
      <site-header :style="'margin: 0 '+ margin +'px'"></site-header>
      <div class="router-wrapper">
        <transition mode="out-in">
          <keep-alive include="home">
            <router-view/>
          </keep-alive>
        </transition>
      </div>
      <footer class="footer">Server running @vps.hnh.me Written by GuiBin</footer>
    </div>
    <div>
      <loading v-show="loading"></loading>
      <login v-show="showLR"></login>
      <cover v-show="showLR"></cover>
      <site-bar v-show="showSide" class="site-bar"></site-bar>
      <cover v-show="showSide"></cover>
      <notice v-show="showLRC"></notice>
      <cover v-show="showLRC" class="LRCcover"></cover>
      <scroll-top v-show="showScroll"></scroll-top>
    </div>
  </div>
</template>

<script>
import siteHeader from './components/site/site-header.vue'
import siteBar from './components/site/site-bar.vue'
import cover from './components/common/cover.vue'
import login from './components/login/login'
import notice from './components/common/notice'
import loading from './components/common/loading'
import scrollTop from './components/common/scroll-top'
import { mapState, mapMutations } from 'vuex'

export default{
  name: 'App',
  components: {
    siteHeader,
    siteBar,
    cover,
    login,
    notice,
    loading,
    scrollTop
  },
  data () {
    return {
      mainWidth: document.body.offsetWidth,
      margin: 0,
      clearId: null
    }
  },
  computed: {
    ...mapState(['showLR', 'showSide', 'showLRC', 'filterMobj', 'loading', 'showScroll'])
  },
  watch: {
    mainWidth (val) {
      this.margin = val > 800 ? (800 - val) / 2 : 0
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.margin = this.mainWidth > 800 ? (800 - this.mainWidth) / 2 : 0
    this.setUname(localStorage.uname)
    this.setUid(localStorage.uid)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapMutations(['changeScroll', 'setUname', 'setUid']),
    handleScroll () {
      var dis = document.documentElement.scrollTop || document.body.scrollTop
      if (dis > 600) {
        clearTimeout(this.clearId)
        this.changeScroll(true)
        this.clearId = setTimeout(() => this.changeScroll(false), 2000)
      } else {
        this.changeScroll(false)
      }
    },
    handleResize () {
      this.mainWidth = document.body.offsetWidth
    }
  },
}
</script>

<style lang="stylus" scoped>
  .v-enter-active {
    transition: .3s
  }
  .v-leave-active {
    transition: .3s
  }
  .v-enter, .v-leave-to{
    opacity: 0
  }
  .LRCcover
    z-index 130 !important
    background-color #0008
    transition background-color .5s
  .all
    background-color #f8f8f8
    .main
      max-width 800px
      margin 0 auto
      transition filter .5s
      .router-wrapper
        min-height calc(100vh - 8rem)
      .footer
        color #ccc
        text-align center
        height 3rem
        line-height 3rem

</style>
