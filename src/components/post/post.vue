<template>
  <div v-show="!loading">
    <post-subject :subject="post"></post-subject>
    <post-comments :subject="post" :comments="comments"></post-comments>
    <comment-new v-show="uname" :subject="post"></comment-new>
    <recommend></recommend>
  </div>
</template>

<script>
import axios from 'axios'
import postSubject from './post-subject'
import postComments from './post-comments'
import { mapState, mapMutations } from 'vuex'
import commentNew from './comment-new'
import recommend from './recommend'
export default {
  components: {
    postSubject,
    postComments,
    commentNew,
    recommend
  },
  computed: {
    ...mapState(['uname', 'post', 'comments', 'loading'])
  },
  methods: {
    ...mapMutations(['setApiInfo', 'setLoading', 'setUname', 'setUid']),
    getData () {
      this.setLoading(true)
      axios.get('/api/post.json?id=' + this.$route.params.id).then(val => {
        val = JSON.parse(val.data)
        this.setApiInfo({post: val.post, comments: val.comments})
        this.setLoading(false)
        this.setUname(val.uname)
        this.setUid(val.uid)
      }, () => {
        this.setLoading(false)
        this.$router.push('/')
      })
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    '$route' (to, from) {
      this.getData()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
