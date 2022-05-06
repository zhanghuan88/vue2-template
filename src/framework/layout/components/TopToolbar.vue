<template>
  <div class="top-toolbar">
    <div class="top-toolbar-left">
      <div class="sidebar-collapse" :class="{'is-collapse':shrink}" @click="toggleCollapse">
        <svg-icon name="collapse"/>
      </div>
      <el-breadcrumb v-if="isShowBreadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="list of breadcrumbList" :key="list.path" :to="list.path">{{ list.name }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="top-toolbar-right">
      <div class="tools">
        <el-tooltip effect="dark" content="搜索" placement="bottom">
          <i class="el-icon-search item" @click="showSearchPop"></i>
        </el-tooltip>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <span v-if="isFullscreenEnable" class="item" @click="fullscreen">
            <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"/>
          </span>
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新页面" placement="bottom">
          <span class="item reload" @click="reload()">
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
import {mapGetters, mapMutations} from 'vuex'
import projectSetting from '@/project-setting'
import {getChildMenuPathsByFullPath, trimSlash} from '@/utils/menu'
import {isEmpty} from 'lodash-es'
import screenfull from 'screenfull';
import regex from '@/constant/regex'

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
    ...mapGetters(['isMobile', 'avatar', 'nickname', 'shrink', 'allMenuChildrenPaths']),
    isShowBreadcrumb() {
      // 如果是移动端，则不显示面包屑
      return !this.isMobile
    }
  },
  watch: {
    "$route.fullPath": {
      handler() {
        this.getBreadcrumb();
      },
      immediate: true
    },
    isMobile() {
      // 模式变换 重置收缩按钮
      this.setShrink(false)
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
      setShrink: "SET_SHRINK",
      setShowSearchPop: "SET_SHOW_SEARCH_POP"
    }),
    showSearchPop() {
      this.setShowSearchPop(true)
    },
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
        // 过滤当层菜单
        const currentMenuPaths = getChildMenuPathsByFullPath(this.allMenuChildrenPaths, last.path)
        // 添加首层菜单 生成路由时增加了重定向不需要处理路径
        breadcrumbList.push({
          path: currentMenuPaths[0].path,
          name: currentMenuPaths[0]['title']
        });
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
        // 可以访问的第一个子路由
        const first = cur.children.find(item => !item['hideMenu'] && !item['newWindow'])
        if (first)
          return `${trimSlash(cur.path)}/${trimSlash(this.getChildPath(first))}`
        return cur.path
      }
      if (regex.url.test(cur.path))
        return cur.componentName
      return cur.path ?? "";
    },
    toggleCollapse() {
      this.setShrink(!this.shrink);
    },
    findChildrenList(childrenPath, children) {
      let childrenList = []
      children.findLast(item => {
        const re = new RegExp(`^${trimSlash(item.path)}`)
        if (re.test(childrenPath)) {
          // 判断剩余路径是否为空
          const remainingPath = trimSlash(childrenPath.replace(re, ''));
          if (remainingPath === '') {
            childrenList.unshift({...item, children: []});// 没有剩余匹配 不处理子路径
            return true
          } else {
            if (isEmpty(item.children)) return false;
            const list = this.findChildrenList(remainingPath, item.children);
            if (list.length > 0) {
              childrenList.unshift(...list);
              childrenList.unshift(item);
            }
            return list.length > 0;
          }
        } else {
          if (regex.url.test(item.path) && childrenPath === item.componentName) {
            childrenList.unshift({...item, path: item.componentName, children: []});
            return true;
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
  transition: height 0.3s;
  transform: translateZ(0);

  .top-toolbar-left {
    padding-right: 50px;
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
