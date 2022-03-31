export default {
  state: {
    enableProgress: true,
    // 页面标题,
    title: '',
    // 显示模式，支持：mobile、pc
    mode: 'pc'
  },
  mutations: {
    SET_TITLE: (state, title) => {
      state.title = title;
    },
    SET_MODE: (state, width) => {
      if (width < 992) {
        state.mode = 'mobile'
      } else {
        state.mode = 'pc'
      }
    }
  }
}
