<template>
  <ul class="comments">
    <post-comment :comment="subject" class="sub-comment" :floor="1"></post-comment>
    <post-comment :comment="it" class="com-comment" :floor="i+2" v-for="(it, i) of comments" :key="it.id"></post-comment>
  </ul>
</template>

<script>
import postComment from '../common/post-comment'
export default {
  props: ['comments', 'subject'],
  components: {
    postComment
  }
}
</script>

<style lang="stylus" scoped>

</style>
