<template>
  <div class="top" @click="toTop">

  </div>
</template>

<script>
export default {
  methods: {
    toTop () {
      var distance = document.documentElement.scrollTop || document.body.scrollTop
      var step = distance / 100
      ;(function jump () {
        if (distance > 0) {
          distance -= step
          // document.documentElement.scrollTop = distance
          // document.body.scrollTop = distance
          window.scrollTo(0, distance)
          setTimeout(jump, 5)
        }
      })()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .top
    position fixed
    width 1.5rem
    height 2.5rem
    bottom 4rem
    right .6rem
    background url('~@/assets/totop.png') center center no-repeat
</style>
