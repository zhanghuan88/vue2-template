<template>
  <div class="top-toolbar">
    <div class="top-toolbar-left">
      <div class="sidebar-collapse" :class="{'is-collapse':sidebarCollapse}" @click="toggleCollapse">
        <svg-icon name="collapse"/>
      </div>
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="list of breadcrumbList" :key="list.path" :to="list.path">{{ list.name }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="top-toolbar-right">
      <div class="tools">
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <span v-if="isFullscreenEnable" class="item" @click="fullscreen">
            <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"/>
          </span>
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新页面" placement="bottom">
          <span class="item reload" @click="reload(2)">
            <svg-icon name="reload"/>
          </span>
        </el-tooltip>
      </div>
      <el-dropdown class="user-container" @command="handleCommand">
        <div class="user-wrapper">
          <el-avatar size="medium" :src="avatar">
            <i class="el-icon-user-solid"/>
          </el-avatar>
          {{ nickname }}
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="home">{{ homeTitle }}</el-dropdown-item>
          <el-dropdown-item command="setting">个人中心</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import projectSetting from '@/project-setting'
import {trimSlash} from '@/utils/menu'
import {isEmpty} from 'lodash-es'
import screenfull from 'screenfull';

export default {
  name: "TopToolbar",
  inject: ['reload'],
  data() {
    return {
      homeTitle: projectSetting.homeTitle,
      isFullscreenEnable: screenfull.isEnabled,
      isFullscreen: screenfull.isFullscreen,
      breadcrumbList: []
    }
  },
  computed: {
    ...mapState({
      sidebarCollapse: state => state.menu.sidebarCollapse,
      allMenus: state => state.menu.allMenus,
      nickname: state => state.user.userInfo.nickname,
      avatar: state => state.user.userInfo.avatar ?? ""
    })
  },
  watch: {
    "$route": {
      handler() {
        this.getBreadcrumb();
      },
      immediate: true
    }
  },
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on('change', this.fullscreenChange)
    }
  },
  beforeDestroy() {
    if (screenfull.isEnabled) {
      screenfull.off('change', this.fullscreenChange)
    }
  },
  methods: {
    ...mapMutations({
      setSidebarCollapse: "SET_SIDEBAR_COLLAPSE"
    }),
    getBreadcrumb() {
      const [first, last] = this.$route.matched;
      if (last.name === 'Reload') return;
      let breadcrumbList = [
        {
          path: "/",
          name: projectSetting.homeTitle
        }
      ]
      if (first.path) { // 不是单层菜单
        // 找到所有菜单从后往前匹配
        const matched = this.allMenus.findLast(item => {
          return item.path === first.path
        });
        if (matched) {
          breadcrumbList.push({
            path: matched.path,
            name: matched['title']
          });
          const childrenPath = trimSlash(last.path.replace(first.path, ''));
          // 根据菜单找到当前路由层级
          const childrenList = this.findChildrenList(childrenPath, matched.children);
          // 处理路径
          const lastChild = childrenList.reduce((pre, cur) => {
            if (!isEmpty(cur.children)) {
              breadcrumbList.push({
                name: cur['title'],
                path: `/${trimSlash(pre.path)}/${trimSlash(this.getChildPath(cur))}`
              })
            }
            return {
              name: cur['title'],
              path: `/${trimSlash(pre.path)}/${trimSlash(cur.path)}`
            };
          }, {
            path: trimSlash(matched.path)
          });
          breadcrumbList.push(lastChild);
        }
      } else {
        // 单层菜单首页直接返回
        if (last.name === "Home") {
          this.breadcrumbList = breadcrumbList
          return;
        }
        breadcrumbList.push({
          path: last.path,
          name: last.meta['title']
        })
      }
      this.breadcrumbList = breadcrumbList;
    },
    fullscreen() {
      screenfull.toggle()
    },
    fullscreenChange() {
      this.isFullscreen = screenfull.isFullscreen
    },
    handleCommand(command) {
      switch (command) {
        case 'home':
          this.$router.push('/home');
          break
        case 'setting':
          this.$router.push({
            name: 'PersonalCenter'
          })
          break
        case 'logout':
          this.$store.dispatch('FedLogOut')
          this.$router.push("/sign-in");
          break
        default:
          break;
      }
    },
    getChildPath(cur) {
      if (!isEmpty(cur.children)) {
        return `${trimSlash(cur.path)}/${trimSlash(this.getChildPath(cur.children[0]))}`
      }
      return cur.path;
    },
    toggleCollapse() {
      this.setSidebarCollapse(!this.sidebarCollapse);
    },
    findChildrenList(childrenPath, children) {
      let childrenList = [];
      children.findLast(item => {
        const re = new RegExp(`^${trimSlash(item.path)}`)
        if (re.test(childrenPath)) {
          // 判断剩余路径是否为空
          const remainingPath = trimSlash(childrenPath.replace(re, ''));
          if (remainingPath === '') {
            childrenList.unshift(item);
            return true
          } else {
            const list = this.findChildrenList(remainingPath, item.children);
            if (list.length > 0) {
              childrenList.unshift(...list);
              childrenList.unshift(item);
            }
            return list.length > 0;
          }
        }
      });
      return childrenList
    }
  }
}
</script>

<style scoped lang="scss">
.top-toolbar {
  height: $g-top-toolbar-height;
  background-color: $g-top-toolbar-bg;
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  .top-toolbar-left {
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    mask: linear-gradient(to left, transparent, #000 100px);

    .sidebar-collapse {
      height: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-shrink: 0;

      &:hover {
        background-image: linear-gradient(to right, #ddd, transparent);
      }

      ::v-deep .svg-icon {
        transition: transform 0.3s;
      }

      &.is-collapse ::v-deep .svg-icon {
        transform: rotateZ(-180deg);
      }
    }

    .el-breadcrumb {
      flex-shrink: 0;
    }

    // 面包屑动画
    .breadcrumb-enter-active {
      transition: all 0.25s;
    }

    .breadcrumb-enter,
    .breadcrumb-leave-active {
      opacity: 0;
      transform: translateX(30px) skewX(-50deg);
    }

  }

  .top-toolbar-right {
    display: flex;
    align-items: center;
    padding: 0 18px;
    flex-shrink: 0;

    .tools {
      margin-right: 20px;

      .item {
        padding: 6px 8px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
      }

      @keyframes reload-animation {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }

      .reload:focus {
        display: inline-block;
        animation: reload-animation 0.3s linear;
      }

      .reload:active {
        /* 加上这个才可以连续点击 */
        animation: none;
      }
    }

    .user-container {
      .user-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;

        .el-avatar {
          margin-right: 4px;
        }
      }
    }

  }
}
</style>
