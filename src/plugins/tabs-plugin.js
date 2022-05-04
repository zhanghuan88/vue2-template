import store from '@/store'
import router from '@/router'
import {isEmpty} from 'lodash-es'

const TabsPlugin = {
  install(Vue) {
    Vue.prototype.$tabs = {
      closeTab(path = router['history'].current.fullPath) {
        const tabs = store.state.menu.tabs;
        const currentTabPath = router['history'].current.fullPath;
        let currentIndex; // 当前tab的索引
        const newTabs = tabs.filter((item, index) => {
          if (item.path === path) {
            currentIndex = index;
          }
          return item.path !== path;
        })
        if (currentIndex == null) return;
        if (isEmpty(newTabs)) {
          router.push('/').then()
        } else {
          if (tabs[currentIndex].path === currentTabPath) {
            router.push(currentIndex + 1 < tabs.length ?
              tabs[currentIndex + 1].path :
              tabs[currentIndex - 1].path).then();
          }
        }
        store.commit("SET_TABS", newTabs);
      },
      closeAll() {
        router.push({name: 'Home'}).then()
        store.commit("SET_TABS", []);
      },
      closeOther(path = router['history'].current.fullPath) {
        router.push(path).then();
        const tabs = store.state.menu.tabs;
        const currentTab = tabs.find(item => item.path === path);
        store.commit("SET_TABS", [currentTab]);
      },
      closeRight(path = router['history'].current.fullPath) {
        if (path === "/home") {
          router.push({name: 'Home'}).then()
          store.commit("SET_TABS", []);
          return;
        }
        const tabs = store.state.menu.tabs;
        let newTabs = [];
        // 当前路由是否在未关闭的标签中
        let isRouteInShowTabs = false;
        tabs.find(item => {
          newTabs.push(item);
          if (item.path === router['history'].current.fullPath) isRouteInShowTabs = true;
          return item.path === path;
        })
        if (!isRouteInShowTabs) router.push(path).then();
        store.commit("SET_TABS", newTabs);
      },
      closeLeft(path = router['history'].current.fullPath) {
        const tabs = store.state.menu.tabs;
        let newTabs = [];
        // 当前路由是否在未关闭的标签中
        let isRouteInShowTabs = false;
        tabs.findLast(item => {
          newTabs.unshift(item);
          if (item.path === router['history'].current.fullPath) isRouteInShowTabs = true;
          return item.path === path;
        })
        if (!isRouteInShowTabs) router.push(path).then();
        store.commit("SET_TABS", newTabs);
      }
    }
  }
}
export default TabsPlugin;
