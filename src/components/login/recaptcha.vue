<template>
  <div>
    <div class="input-group mb-3" v-show="showRecaptcha">
      <div class="input-group-prepend">
        <span class="input-group-text">验证</span>
      </div>
      <input type="text" class="form-control" placeholder="Recaptcha" v-model="recaptcha">
    </div>
    <div class="check-forgot">
      <button class="btn btn-light" @click="changeRecaptcha"><span v-show="showRecaptcha">关闭验证</span><span v-show="!showRecaptcha">开启验证</span></button>
      <span class="checkbox" v-show="showRecaptcha" @click="reload">
        <img :src="'data:image/bmp;base64,'+src">
      </span>
      <button class="forgot btn btn-light" @click="forgot">忘记密码?</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['src', 'showRecaptcha', 'name'],
  data () {
    return {
      recaptcha: ''
    }
  },
  methods: {
    ...mapMutations(['sendInfo', 'setWaitFor', 'hideAll']),
    reload () {
      this.$emit('reload')
    },
    changeRecaptcha () {
      this.$emit('changeRecaptcha')
    },
    forgot () {
      if (this.name === '') {
        this.sendInfo('请在账号区填写你要找回的账号')
      } else {
        this.sendInfo('点击确认会给您发送密钥邮件')
        this.setWaitFor(this.name)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .check-forgot
    vertical-align middle
    .forgot
      float right
</style>
