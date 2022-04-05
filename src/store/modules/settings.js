export default {
  state: {
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
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        state.mode = 'mobile'
      } else {
        // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
        if (width < 992) {
          state.mode = 'mobile'
        } else {
          state.mode = 'pc'
        }
      }
    }
  }
}
