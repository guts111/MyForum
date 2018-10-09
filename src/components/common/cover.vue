<template>
  <transition name="cover-fade">
    <div class="cover" @click="hideAll" @touchmove.prevent>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['hideAll'])
  }
}
</script>

<style lang="stylus" scoped>
  .cover-fade-enter-active {
    transition: .3s
  }
  .cover-fade-leave-active {
    transition: .4s
  }
  .cover-fade-enter, .cover-fade-leave-to{
    opacity: 0
  }
  .cover
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 80
</style>
