<template>
  <transition name="loading-fade">
    <div class="loading" @touchmove.prevent>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .loading-fade-enter-active {
    transition:  .2s
  }
  .loading-fade-leave-active {
    transition: .2s
  }
  .loading-fade-enter, .loading-fade-leave-to{
    opacity: 0
  }
  .loading
    position fixed
    top: 4.5rem
    left: 0%
    right: 0%
    bottom: 0%
    z-index 0
    background url('~@/assets/cloud.svg') center 30% no-repeat #f8f8f8
</style>
