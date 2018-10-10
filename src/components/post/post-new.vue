<template>
  <div class="post-new">
    <div class="post-header">发布新主题</div>
    <div class="post-body">
      <div class="body-hint">
        <label for="post-title">请填写主题内容并选择一个分类</label>
      </div>
      <div class="cate-wrapper">
        <select class="cate form-control form-control-sm" v-model="cate">
          <option>灌水</option>
          <option>Bugs</option>
          <option>Help</option>
        </select>
      </div>
      <div class="input-group mb-3 boder-title">
        <div class="input-group-prepend">
          <span class="input-group-text">主题</span>
        </div>
        <input type="text" class="form-control" placeholder="Thread title" id="post-title" v-model="title">
      </div>
      <div class="form-group post-edit">
        <label for="edit-cotent">请输入内容</label>
        <textarea class="form-control" placeholder="Type here to input content ..." id="edit-cotent" rows="3" v-model="content"></textarea>
        </div>
      <div class="post-submmit">
        <button class="btn btn-success" @click="submmit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      title: '',
      content: '',
      cate: '灌水'
    }
  },
  methods: {
    ...mapMutations(['sendInfo', 'setUname', 'hideAll', 'addPosts']),
    submmit () {
      if (this.title.trim() === '') {
        this.sendInfo('你忘记写标题啦')
      } else if (this.content.trim() === '') {
        this.sendInfo('你忘记写内容啦')
      } else {
        var params = new URLSearchParams()
        params.append('title', this.title)
        params.append('content', this.content)
        params.append('cate', this.cate)
        this.sendInfo('正在拼命提交')
        axios.post('/topost', params).then(val => {
          this.addPosts(JSON.parse(val.data))
          this.sendInfo('提交成功')
          setTimeout(() => this.hideAll(), 700)
          this.$router.push('/')
        }, () => {
          this.sendInfo('提交失败')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .post-new
    padding .5rem 4% 0
    .post-header
      text-align center
      font-weight 500
      font-size 1.5rem
      height 3.5rem
      line-height 3.5rem
      margin-bottom .5rem
    .post-body
      padding 1rem
      border 1px solid #ddd
      border-radius .5rem
      background-color #fff
      color #000
      .body-hint
        padding .5rem 0
      .cate-wrapper
        padding .5rem 0
        .cate
          width auto
          padding .2rem 1.5rem
      .boder-title
        padding .5rem 0
    .post-edit
      margin-top 0rem
</style>
