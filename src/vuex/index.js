import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLR: false,
    clickL: true,
    showSide: false,
    showLRC: false,
    infoLR: '',
    uname: null,
    uid: null,
    loading: false,
    showScroll: false,
    editInFocus: false,
    filterMobj: {
      filter: 'blur(0px)'
    },
    waitFor: null,
    list: [],
    post: {},
    comments: [],
    Uuser: {},
    Uposts: [],
    Ucomments: [],
    obj: { order: 1, cate: '全部', orderB: true },

  },
  getters: {
    neededList (state) {
      var arr
      if (state.obj.cate !== '全部') {
        arr = state.list.filter(it => it.cate === state.obj.cate)
      } else {
        arr = state.list
      }
      if (state.obj.orderB) {
        if (state.obj.order === 1) {
          return arr.slice().sort((it, wt) => {
            if (it.updatedAt < wt.updatedAt) {
              return 1
            } else if (it.updatedAt > wt.updatedAt) {
              return -1
            } else {
              return 0
            }
          })
        } else if (state.obj.order === 0) {
          return arr.slice().sort((it, wt) => {
            if (it.createdAt < wt.createdAt) {
              return 1
            } else if (it.createdAt > wt.createdAt) {
              return -1
            } else {
              return 0
            }
          })
        } else if (state.obj.order === 2) {
          return arr.slice().sort((it, wt) => wt.applyC - it.applyC)
        }
      } else {
        if (state.obj.order === 1) {
          return arr.slice().sort((it, wt) => {
            if (it.updatedAt < wt.updatedAt) {
              return -1
            } else if (it.updatedAt > wt.updatedAt) {
              return 1
            } else {
              return 0
            }
          })
        } else if (state.obj.order === 0) {
          return arr.slice().sort((it, wt) => {
            if (it.createdAt < wt.createdAt) {
              return -1
            } else if (it.createdAt > wt.createdAt) {
              return 1
            } else {
              return 0
            }
          })
        } else if (state.obj.order === 2) {
          return arr.slice().sort((it, wt) => it.applyC - wt.applyC)
        }
      }
    }
  },
  mutations: {
    updateOrderB (state, value) {
      state.obj.orderB = value
    },
    updateOrder (state, value) {
      state.obj.order = value
    },
    updateCate (state, value) {
      state.obj.cate = value
    },
    setApiInfo (state, info) {
      for (var i in info) {
        state[i] = info[i]
      }
    },
    addComments (state, val) {
      console.log(state.list, val.pid)
      var ss = state.list.find(it => it.id === +val.pid)
      ss.updatedAt = val.createdAt
      ss.applyC++
      state.comments.push(val)
    },
    addPosts (state, val) {
      state.list.push(val)
    },
    deletePost (state, id) {
      var index = state.list.findIndex(it => it.id === id)
      if (index >= 0) {
        state.list.splice(index, 1)
      }
      var index2 = state.Uposts.findIndex(it => it.id === id)
      if (index2 >= 0) {
        state.Ucomments = state.Ucomments.filter(it => it.pid !== id)
        state.Uposts.splice(index2, 1)
      }
    },
    deleteComment (state, id) {
      var index = state.comments.findIndex(it => it.id === id)
      if (index >= 0) {
        state.comments.splice(index, 1)
      }
      var index2 = state.Ucomments.findIndex(it => it.id === id)
      if (index2 >= 0) {
        state.Ucomments.splice(index2, 1)
      }
    },
    hideAll (state) {
      if (state.showLRC) {
        state.showLRC = false
      } else {
        state.showLR = false
        state.showSide = false
        state.filterMobj.filter = 'blur(0px)'
      }
      setTimeout(() => { state.waitFor = null }, 500)
    },
    handleShowLR (state, which) {
      state.showSide = false
      state.clickL = which
      state.showLR = true
      state.filterMobj.filter = 'blur(3px)'
    },
    changeClickL (state) {
      state.clickL = !state.clickL
    },
    handleShowSide (state) {
      state.showSide = true
      state.filterMobj.filter = 'blur(3px)'
    },
    sendInfo (state, info) {
      state.infoLR = info
      state.showLRC = true
    },
    setUname (state, name) {
      state.uname = name
      localStorage.uname = name
      if (name === null) {
        localStorage.uname = ''
      }
    },
    setUid (state, id) {
      state.uid = id
      localStorage.uid = id
      if (id === null) {
        localStorage.uid = ''
      }
    },
    setLoading (state, boolean) {
      state.loading = boolean
    },
    changeScroll (state, boolean) {
      state.showScroll = boolean
    },
    changeEditFocus (state, boolean) {
      state.editInFocus = boolean
    },
    setWaitFor (state, val) {
      state.waitFor = val
    }
  }
})
