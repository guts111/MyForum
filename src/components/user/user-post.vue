<template>
  <div class="main">
    <div class="header">
      <input type="radio" name="pc" id="post" :value="true" checked v-model="picked">
      <input type="radio" name="pc" id="comment" :value="false" v-model="picked">
      <label for="post">主题</label>
      <label for="comment">回复</label>
    </div>
    <div class="platform">
      <div class="no-subject" v-show="picked && posts.length==0">该用户未发表过主题</div>
      <post-title :list='posts' v-show="picked"></post-title>
      <div class="no-subject" v-show="!picked && comments.length==0">该用户未发表过回复</div>
      <ul class="comments" v-show="!picked">
        <post-comment :content="it.content.split('\n')" :comment="it" v-for="it in comments" :key="it.id"></post-comment>
      </ul>
    </div>
  </div>
</template>

<script>
import postTitle from '../common/post-title'
import postComment from '../common/post-comment'
export default {
  props: ['posts', 'comments'],
  data () {
    return {
      picked: true
    }
  },
  components: {
    postTitle,
    postComment
  }

}
</script>

<style lang="stylus" scoped>
  .no-subject
    color: #ddd
    font-size 2rem
    padding-top 5rem
    text-align center
  .header
    input
      display none
      &:checked + * + label
        color #666
      &:checked + * + label:after
        content ""
        margin-top .3rem
        display block
        background-color #bbb
        width 100%
        height 2px
    label
      font-size 1.4rem
      padding-right 1rem
      transition .3s
      color #ccc
      &:hover
        color #000 !important
      &:after
        content ""
        background-color #fff0
        transition .4s
</style>
