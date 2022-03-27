export default {
  state: {
    enableProgress: true,
    // 页面标题,
    title: ''
  },
  mutations: {
    SET_TITLE: (state, title) => {
      state.title = title;
    }
  }
}
