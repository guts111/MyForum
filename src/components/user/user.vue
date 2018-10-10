<template>
  <div class="user" v-show="!loading">
    <user-info :user="Uuser"></user-info>
    <user-post :posts="Uposts" :comments="Ucomments"></user-post>
  </div>
</template>

<script>
import axios from 'axios'
import userPost from './user-post'
import userInfo from './user-info'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    userInfo,
    userPost
  },
  computed: {
    ...mapState(['Uuser', 'Ucomments', 'Uposts', 'loading'])
  },
  methods: {
    ...mapMutations(['setUid', 'setUname', 'setApiInfo', 'setLoading']),
    getData () {
      this.setLoading(true)
      axios.get('/api/user.json?id=' + this.$route.params.id).then(val => {
        val = JSON.parse(val.data)
        this.setApiInfo({Uposts: val.posts, Ucomments: val.comments, Uuser: val.user})
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
      console.log(123)
      this.getData()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .user
    padding 1rem 4%
</style>
