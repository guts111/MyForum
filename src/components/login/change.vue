<template>
  <div class="change-wrapper">
      <div class="body">
        <div class="header">重置密码</div>
        <div class="content">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" >新的密码</span>
            </div>
            <input type="password" class="form-control" placeholder="New password" v-model="password">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">确认密码</span>
            </div>
            <input type="password" class="form-control" placeholder="Confirm password" v-model="confirmPw">
          </div>
        </div>
        <div class="footer"><button class="btn btn-success" @click="confirm">确认重置</button></div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      password: '',
      confirmPw: ''
    }
  },
  methods: {
    ...mapMutations(['sendInfo']),
    confirm () {
      if (this.password === '' || this.confirmPw === '') {
        this.sendInfo('密码不能为空')
      } else if (this.password.includes(' ') || this.confirmPw.includes(' ')) {
        this.sendInfo('密码不能有空格')
      } else {
        var params = new URLSearchParams()
        params.append('password', this.password)
        axios.post('/change/' + this.$route.params.qs, params).then(val => {
          this.password = ''
          this.confirmPw = ''
          this.$router.push('/')
          this.sendInfo('重置成功请重新登录')
          console.log('ok')
        }, () => {
          this.sendInfo('重置失败')
          this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .change-wrapper
    padding 2rem 4% 0
    .header
      text-align center
      font-weight 500
      font-size 1.5rem
      height 3.5rem
      line-height 3.5rem
      margin-bottom .5rem
    .body
      padding 0 1rem
      border 1px solid #ddd
      border-radius .5rem
      background-color #fff
      color #000
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder
        color #ccc
      .header
        font-size 1.1rem
        padding-bottom .3rem
      .content
        padding 2rem 1rem 1rem
        border-top 1px solid #ccc
        border-bottom 1px solid #ccc
      .footer
        padding 1rem

</style>
