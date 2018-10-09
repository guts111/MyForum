<template>
  <div class="comment-new">
    <div class="form-group post-edit">
      <textarea ref="edit" v-model="content" v-focus="editInFocus" @blur="changeEditFocus(false)" class="form-control" placeholder="Type here to input content ..."></textarea>
      </div>
    <div class="post-submmit">
      <button class="btn btn-success" @click="submmit">提交</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  props: ['subject'],
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState(['editInFocus'])
  },
  methods: {
    ...mapMutations(['addComments', 'changeEditFocus', 'sendInfo', 'hideAll']),
    submmit () {
      if (this.content.trim() === '') {
        this.sendInfo('你忘记写内容啦')
      } else {
        var params = new URLSearchParams()
        params.append('pid', this.subject.id)
        params.append('content', this.content)
        this.sendInfo('正在拼命提交')
        axios.post('/comment', params).then(val => {
          this.sendInfo('提交成功')
          this.content = ''
          this.addComments(JSON.parse(val.data))
          setTimeout(() => this.hideAll(), 700)
        }, () => {
          this.sendInfo('提交失败')
        })
      }
    }
  },
  directives: {
    focus: {
      update: (el, {value}) => {
        if (value) {
          el.focus()
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .comment-new
    padding .5rem
    .post-submmit
      margin-top -.3rem
      padding-left .5rem

</style>
