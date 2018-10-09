<template>
  <transition>
    <div class="info-warpper" >
      <div class="header">
         {{infoLR}}
      </div>
      <div class="footer">
        <button v-show="waitFor" class="btn btn-secondary confirm" @click="confirmAction">确定</button>
        <button class="btn btn-light ok" @click="hideAll">关闭</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  computed: {
    ...mapState(['infoLR', 'waitFor'])
  },
  methods: {
    ...mapMutations(['setUname', 'deleteComment', 'deletePost', 'hideAll', 'sendInfo', 'setWaitFor']),
    confirmAction () {
      if (this.infoLR === '为了更好的发展,需要您的赞助') {
        this.setWaitFor(null)
        this.sendInfo('开个玩笑...')
        setTimeout(() => this.hideAll(), 700)
      } else if (this.infoLR === '\uD83D\uDE1C 其实也能恢复,确认删除?') {
        this.setWaitFor(null)
        this.sendInfo('正在提交,请稍后...')
        var params = new URLSearchParams()
        params.append('del', true)
        axios.post('/settings', params).then(val => {
          this.sendInfo('删除账户成功')
          this.setUname(null)
          document.cookie = 'uid=;Expires=' + new Date()
          this.$router.push('/')
          setTimeout(() => this.hideAll(), 700)
        }, () => {
          this.sendInfo('删除账户失败')
        })
      } else {
        var id = this.waitFor
        params = new URLSearchParams()
        var flag, withFloor
        if (this.infoLR === '请确认是否删除此回复') {
          flag = 'cid'
        } else if (this.infoLR === '请确认是否删除此主题') {
          flag = 'pid'
          withFloor = false
        } else if (this.infoLR === '请确认是否删除此主楼') {
          flag = 'pid'
          withFloor = true
        }
        params.append(flag, this.waitFor)
        this.setWaitFor(null)
        this.sendInfo('正在拼命提交')
        axios.post('/delete', params).then(val => {
          this.sendInfo('成功删除')
          if (flag === 'cid') {
            this.deleteComment(id)
          } else if (flag === 'pid') {
            this.deletePost(id)
            if (withFloor) {
              this.$router.push('/')
            }
          }
          setTimeout(() => this.hideAll(), 700)
        }, () => {
          this.sendInfo('删除失败')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cover-fade-enter-active {
    transition: .3s
  }
  .cover-fade-leave-active {
    transition: .4s
  }
  .cover-fade-enter, .cover-fade-leave-to{
    opacity: 0
  }
  .info-warpper
    z-index 150
    position fixed
    bottom 35%
    left 3%
    right 3%
    max-width 500px
    margin 0 auto
    background-color #fff
    border-radius .8rem
    .header
      text-align center
      height 3rem
      line-height 3rem
    .footer
      border-radius 0 0 .5rem .5rem
      background-color #999
      text-align right
      .confirm
        margin-right .3rem
      button
        padding .2rem .7rem
        margin .5rem 1.2rem

</style>
