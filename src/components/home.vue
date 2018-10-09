<template>
  <div class="home" v-show="!loading">
    <div class="home-header">
      <div class="category">
        <select class="form-control form-control-sm select" v-model="cate">
          <option>全部</option>
          <option>灌水</option>
          <option>Bugs</option>
          <option>Help</option>
        </select>
      </div>
      <div class="orderB">
        <input type="checkbox" id="check"  v-model="orderB">
        <label v-show="orderB" for="check" class="btn button">倒序</label>
        <label v-show="!orderB" for="check" class="btn button">正序</label>
      </div>
      <div class="loginreg">
        <button class="loginreg-item btn btn-info" @click="handleShowLR(1)" v-show="!uname">登录发帖</button>
        <button class="loginreg-item btn" @click="handleShowLR(0)" v-show="!uname">注册</button>
        <router-link to="/post" tag="button" class="loginreg-item btn btn-info" v-show="uname" >发表新帖</router-link>
      </div>
    </div>
    <div class="order">
      <input type="radio" id="order-1" :value="1" v-model="order">
      <input type="radio" id="order-2" :value="0" v-model="order">
      <input type="radio" id="order-3" :value="2" v-model="order">
      <label for="order-1" class="btn button">按回复时间</label>
      <label for="order-2" class="btn button">按发布时间</label>
      <label for="order-3" class="btn button">热门</label>
    </div>
    <post-title :order="order" :list="neededList"></post-title>
  </div>
</template>
<script>
import axios from 'axios'
import postTitle from './common/post-title'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    postTitle
  },
  data () {
    return {
      show: false,
      clickLogin: true
    }
  },
  methods: {
    ...mapMutations(['updateOrderB', 'updateCate', 'updateOrder', 'setApiInfo', 'handleShowLR', 'setUname', 'setUid', 'setLoading']),
  },
  computed: {
    ...mapGetters(['neededList']),
    ...mapState(['uname', 'obj', 'loading']),
    order: {
      get () {
        return this.obj.order
      },
      set (value) {
        this.updateOrder(value)
      }
    },
    cate: {
      get () {
        return this.obj.cate
      },
      set (value) {
        this.updateCate(value)
      }
    },
    orderB: {
      get () {
        return this.obj.orderB
      },
      set (value) {
        this.updateOrderB(value)
      }
    }
  },
  mounted () {
    this.setLoading(true)
    axios.get('api/home.json').then(val => {
      val = JSON.parse(val.data)
      this.setLoading(false)
      this.setApiInfo({ list: val.posts })
      this.setUname(val.uname)
      this.setUid(val.uid)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .home
    padding 1rem 4%
    .home-header
      display flex
      align-items flex-end
      padding-bottom 1.2rem
      .select
        height 2.4rem
        font-size 1rem

      .orderB
        input
          display none
        .button
          border 1px solid #ccc
          background-color #fff
          margin-left .4rem
          margin-bottom 0
      .loginreg
        flex-grow 1
        .loginreg-item
          float right
          margin-left .5rem
    .order
      margin-bottom .8rem
      input
        display none
        &:checked + * + * + label
          background-color #e9e9e9
          border 1px solid #9aa
      .button
        border 1px solid #ccc
        background-color #fff
        margin-right .4rem

</style>
