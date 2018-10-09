<template>
  <transition name="silde-fade">
    <div class="main-login" @touchmove.prevent>
      <div class="login" v-show="clickL">
        <div class="head">登录您的账户</div>
        <div class="inner">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">账号</span>
            </div>
            <input type="text" class="form-control" placeholder="Username" v-model="name">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" >密码</span>
            </div>
            <input type="password" class="form-control" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="footer">
          <button class="btn btn-success" @click="handleLR">确认</button>
          <button class="btn btn-light" @click="changeClickL">注册您的账户</button>
        </div>
      </div>


      <div class="reg" v-show="!clickL">
        <div class="head">创建新的账户</div>
        <div class="inner">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">账号</span>
            </div>
            <input type="text" class="form-control" placeholder="Username" v-model="name">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" >密码</span>
            </div>
            <input type="password" class="form-control" placeholder="Password" v-model="password">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">密码</span>
            </div>
            <input type="password" class="form-control" placeholder="Confirm password" v-model="confirmPw">
          </div>
          <div class="input-group mb-3 email">
            <div class="input-group-prepend">
              <span class="input-group-text">邮箱</span>
            </div>
            <input type="text" class="form-control" placeholder="可不填写 则无法找回密码" v-model="email">
          </div>
        </div>
        <div class="footer">
          <button class="btn btn-success"  @click="handleLR">确认</button>
          <button class="btn btn-light" @click="changeClickL">登录您的账户</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      name: '',
      password: '',
      confirmPw: '',
      email: ''
    }
  },
  components: {
    check
  },
  computed: {
    ...mapState(['clickL'])
  },
  methods: {
    ...mapMutations(['changeClickL', 'sendInfo', 'hideAll', 'setUname']),
    checkEmail () {
      var e = this.email.trim()
      if (e === '') return true
      var index = e.indexOf('@')
      return index > 0 && index < e.length - 1
    },
    handleLR () {
      if (this.password.includes(' ') || this.confirmPw.includes(' ') || this.name.includes(' ')) {
        this.sendInfo('账号密码不能含有空格')
      } else if (this.password === '' || this.name === '') {
        this.sendInfo('还有未填项')
      } else if (this.password.length > 20) {
        this.sendInfo('密码设置过长')
      } else if (this.name.length > 10) {
        this.sendInfo('用户名设置过长')
      } else if (!this.clickL && this.password !== this.confirmPw) {
        this.sendInfo('二次密码输入不一致')
      } else if (!this.clickL && !this.checkEmail()) {
        this.sendInfo('Email格式不正确')
      } else {
        var params = new URLSearchParams()
        params.append('name', this.name)
        params.append('password', this.password)
        params.append('email', this.email)
        this.clickL ? this.sendInfo('正在登录...请稍等') : this.sendInfo('正在注册...请稍等')
        if (this.clickL) {
          axios.post('/login', params).then(val => {
            this.hideAll()
            this.hideAll()
            this.setUname(this.name)
            this.sendInfo('登录成功')
            setTimeout(() => this.hideAll(), 700)
          }, () => {
            this.sendInfo('登录失败,用户名或密码不正确或账户已注销')
          })
        } else {
          axios.post('/reg', params).then(val => {
            this.hideAll()
            this.hideAll()
            this.setUname(this.name)
            this.sendInfo('注册成功')
            setTimeout(() => this.hideAll(), 700)
          }, () => {
            this.sendInfo('注册失败,用户名已存在')
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .silde-fade-enter-active {
    transition:  .4s
  }
  .silde-fade-leave-active {
    transition: .4s
  }
  .silde-fade-enter, .silde-fade-leave-to{
    transform translateY(-6rem)
    opacity: 0
  }

  .main-login
    position fixed
    z-index 120
    bottom 24%
    left 7%
    right 7%
    max-width 600px
    margin 0 auto
    background-color #fff
    border-radius .5rem
    padding 1rem
    box-shadow 0px 2px 20px #0003
    .head
      font-size 1.3rem
      font-weight 600
      line-height 1.5rem
      border-bottom 1px solid #ccc
      padding-bottom .5rem
    .inner
      padding 2rem 5% 1.5rem
      border-bottom 1px solid #ccc
      .email
        margin-bottom .3rem !important
    .footer
      padding 1rem 5% .5rem 5%
</style>
