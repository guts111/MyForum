<template>
  <div class="settings">
    <div class="settings-header"> 设置 </div>
    <div class="settings-body">

      <div class="one">
        <div class="title">
          关于我
        </div>
        <div class="hint">
          <span class="del">介绍一下自己吧</span> <span class="del">内容将显示在你的个人页面</span>
        </div>
        <div class="content">
          <div class="form-group">
            <textarea class="form-control" placeholder="About me description" rows="3" v-model="intro"></textarea>
          </div>
        </div>
        <div><button class="btn btn-success" @click="save">保存描述</button></div>
      </div>

      <div class="one-two">
        <div class="title">
          设置邮箱
        </div>
        <div class="hint">
          没绑定过邮箱可以在这里绑定,也可以修改邮箱
        </div>
        <div class="content">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">邮箱</span>
            </div>
            <input type="text" class="form-control" placeholder="Email" v-model="email">
          </div>
          <button class="btn btn-success" @click="changeEmail">确认设置</button>
        </div>
      </div>

      <div class="two">
        <div class="title">
          修改密码
        </div>
        <div class="hint">
          为了安全请先输入您当前的密码
        </div>
        <div class="content">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">当前密码</span>
            </div>
            <input type="password" class="form-control" placeholder="Current password" v-model="oldPw">
          </div>
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
          <div><button class="btn btn-success" @click="change">确认修改</button></div>
        </div>
      </div>

      <div class="three">
        <div class="title">
          删除账户
        </div>
        <div class="hint">
          <span class="del">请仔细确认,删除账户后不可恢复</span>
          <span class="del">将删除账号所有发过的帖子与回复</span>
        </div>
        <div class="content"><button class="btn btn-danger" @click="dele">确认删除</button></div>
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
      oldPw: '',
      password: '',
      confirmPw: '',
      intro: '',
      email: ''
    }
  },
  methods: {
    ...mapMutations(['sendInfo', 'hideAll', 'setWaitFor']),
    changeEmail () {
      if (this.email.trim() === '') {
        this.sendInfo('Email不能为空')
        return null
      }
      var index = this.email.trim().indexOf('@')
      if (index <= 0 || index === this.email.trim().length - 1) {
        this.sendInfo('Email格式不合法')
        return null
      }
      var params = new URLSearchParams()
      params.append('email', this.email)
      this.sendInfo('正在拼命提交...请稍后')
      axios.post('/tosettings', params).then(val => {
        this.sendInfo('绑定成功')
        setTimeout(() => this.hideAll(), 700)
      }, () => {
        this.sendInfo('绑定失败')
      })
    },
    save () {
      if (this.intro.trim() === '') {
        this.sendInfo('内容不能为空')
        return null
      }
      var params = new URLSearchParams()
      params.append('intro', this.intro)
      this.sendInfo('正在拼命提交...请稍后')
      axios.post('/tosettings', params).then(val => {
        this.sendInfo('修改成功')
        setTimeout(() => this.hideAll(), 700)
      }, () => {
        this.sendInfo('修改失败')
      })
    },
    change () {
      if (this.oldPw === '' || this.password === '' || this.confirmPw === '') {
        this.sendInfo('您还有未填密码项')
        return null
      } else if (this.oldPw.includes(' ') || this.password.includes(' ') || this.confirmPw.includes(' ')) {
        this.sendInfo('密码不能含有空格')
        return null
      } else if (this.confirmPw !== this.password) {
        this.sendInfo('新密码和确认密码不一致,请重新输入')
      } else {
        var params = new URLSearchParams()
        params.append('oldPw', this.oldPw)
        params.append('password', this.password)
        params.append('confirmPw', this.confirmPw)
        this.sendInfo('正在拼命提交...请稍后')
        axios.post('/tosettings', params).then(val => {
          this.sendInfo('修改成功,下次需要用新密码登录')
          setTimeout(() => this.hideAll(), 1000)
        }, () => {
          this.sendInfo('原密码不正确')
        })
      }
      this.oldPw = ''
      this.confirmPw = ''
      this.password = ''
    },
    dele () {
      this.sendInfo('\uD83D\uDE1C 其实也能恢复,确认删除?')
      this.setWaitFor(1)
    }
  }


}
</script>

<style lang="stylus" scoped>
  .settings
    padding .5rem 4% 0
    .settings-header
      text-align center
      font-weight 500
      font-size 1.5rem
      height 3.5rem
      line-height 3.5rem
      margin-bottom .5rem
    .settings-body
      padding 0 1rem
      border 1px solid #ddd
      border-radius .5rem
      background-color #fff
      color #000
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder
        color #ccc
      .one, .two, .three, .one-two
        padding 1.5rem 0
        border-bottom 1px solid #ddd
      .title
        font-size 1.1rem
        padding-bottom .3rem
      .hint
        font-size .95rem
        color #999
        padding .4rem 0 .6rem
      .content
        margin-bottom 1rem
      .del
        display inline-block
      button
        margin-left .5rem
</style>
