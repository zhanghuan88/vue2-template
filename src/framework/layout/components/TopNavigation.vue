<template>
  <div class="top-navigation">
    <el-popover v-if="contextmenuFlag" v-model="isShowPopover" :reference="popoverReference" placement="bottom"
                width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                popper-class="tab-contextmenu" @hide="contextmenuFlag=false">
      <div>
        <el-button-group>
          <el-button>主要按钮</el-button>
          <el-button>主要按钮</el-button>
          <el-button>主要按钮</el-button>
        </el-button-group>
        <el-button-group>
          <el-button>主要按钮</el-button>
          <el-button>主要按钮</el-button>
        </el-button-group>
      </div>
    </el-popover>
    <el-tabs ref="tabs" v-model="currentTagPath" class="top-navigation-tabs top-navigation-tabs--smooth"
             type="card" @tab-remove="removeTab" @tab-click="tabClick" @contextmenu.native="tabContextMenu">
      <el-tab-pane v-for="(item,index) in showTags" :key="item.path" :label="item.name"
                   :name="item.path" :closable="index!==0">
      </el-tab-pane>
    </el-tabs>
    <el-dropdown class="top-navigation-tool" size="small" @visible-change="toolVisibleChange" @command="handleCommand">
      <span class="top-navigation-tool--icon" :class="{'top-navigation-tool-show':isToolShown}">
        <i class="box box-t"></i>
        <i class="box"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-close" command="closeOther">关闭其他</el-dropdown-item>
        <el-dropdown-item icon="el-icon-right" command="closeRight">关闭右侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-back" command="closeLeft">关闭左侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-close" command="closeAll">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import projectSetting from '@/project-setting'

export default {
  name: "TopNavigation",
  data() {
    return {
      currentTagPath: undefined,
      isToolShown: false,
      contextmenuFlag: false,
      isShowPopover: false,
      popoverReference: undefined

    }
  },
  computed: {
    ...mapState({
      tags: state => state.menu.tags,
      topMenuId: state => state.menu.activeMainSidebarId
    }),
    showTags() {
      return [
        {
          name: projectSetting.homeTitle,
          componentName: 'Home',
          path: '/home'
        }, ...this.tags
      ]
    }
  },
  watch: {
    "$route": {
      handler() {
        if (this.$route.name === 'Reload') return; // 刷新页面时不切换tab
        this.currentTagPath = this.$route.fullPath;
        if (this.$route.name === 'Home') return; // 首页不新增tab
        // 当前tag是否在所有tags中
        let isTagInAll = this.tags.some(item => item.path === this.currentTagPath);
        if (!isTagInAll) {
          this.addTab();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setActiveMainSidebarId: 'SET_ACTIVE_MAIN_SIDEBAR_ID',
      setTags: 'SET_TAGS'
    }),
    showContextMenu(target) {
      this.popoverReference = target; // popover的参照元素
      this.contextmenuFlag = true; // 初始化popover
      this.$nextTick(() => {
        this.isShowPopover = true; // 显示popover
      })
    },
    tabContextMenu(e) {
      let target = e.target;
      let flag = false;
      if (target.className.indexOf("el-tabs__item") > -1) flag = true;
      else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
        target = target.parentNode;
        flag = true;
      }
      if (flag) {
        e.preventDefault();
        e.stopPropagation();
        if (this.isShowPopover) {
          this.contextmenuFlag = false;
          this.isShowPopover = false;
          this.$nextTick(() => this.showContextMenu(target))
        } else {
          this.showContextMenu(target);
        }
      }

    },
    handleCommand(command) {
      let tags = [];
      switch (command) {
        case 'closeOther':
          tags = this.showTags.filter(item => item.path === this.$route.fullPath && item.componentName !== 'Home')
          break;
        case 'closeRight':
          this.showTags.find(item => {
            if (item.componentName !== 'Home') tags.push(item);
            return item.path === this.$route.fullPath;
          })
          break;
        case 'closeLeft':
          this.showTags.findLast(item => {
            if (item.componentName !== 'Home') tags.unshift(item);
            return item.path === this.$route.fullPath;
          })
          break;
        case 'closeAll':
          this.$router.push({name: 'Home'});
          break;
        default:
          break;
      }
      this.setTags(tags);

    },
    toolVisibleChange(visible) {
      this.isToolShown = visible;
    },
    tabClick() {
      this.$router.push(this.currentTagPath);
      let currentTag = this.tags.find(item => item.path === this.currentTagPath);
      if (currentTag?.topMenuId) {
        this.setActiveMainSidebarId(currentTag.topMenuId)
      }
    },
    addTab() {
      let tags = [...this.tags];
      tags.push({
        name: this.$route.meta['title'],
        componentName: this.$route.name,
        path: this.$route.fullPath,
        topMenuId: this.$route.name !== 'PersonalCenter' ? this.topMenuId : undefined // 个人中心页面不需要设置顶部菜单
      });
      this.setTags(tags);
    },
    removeTab(targetName) {
      let currentIndex;
      const tags = this.showTags.filter((item, index) => {
        if (item.path === targetName) {
          currentIndex = index;
        }
        return item.path !== targetName && item.componentName !== 'Home';
      })
      if (this.showTags[currentIndex].path === this.currentTagPath) {
        this.$router.push(currentIndex + 1 < this.showTags.length ?
          this.showTags[currentIndex + 1].path :
          this.showTags[currentIndex - 1].path);
      }
      this.setTags(tags);
    }
  }
}
</script>
<style lang="scss">
.tab-contextmenu {
  padding: 0;
}
</style>
<style scoped lang="scss">

.top-navigation {
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: $g-top-tabs-height;
  padding: 0 20px;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  background-color: $g-top-tabs-bg;

  .top-navigation-tabs {
    width: 0;
    flex: 1;

    ::v-deep .el-tabs__header {
      margin-bottom: 0;
      border-bottom: none;

      .el-tabs__nav-wrap {
        margin-bottom: 0;
      }

      .el-tabs__nav {
        border: none;

        .el-tabs__item {
          box-shadow: none;
          border: none;
        }
      }
    }
  }

  .top-navigation-tabs--smooth {
    align-self: stretch;

    ::v-deep .el-tabs__header {

      .el-tabs__item {
        margin-top: calc(#{$g-top-tabs-height} - 35px);
        height: 35px;
        margin-right: -15px;
        padding: 0 25px;

        .el-icon-close:hover {
          background-color: inherit;
          color: inherit;
        }

        &:not(.is-active):hover {
          color: inherit;
          background-color: #dee1e6;
          mask: url("~@/assets/image/framework/tab-mask.png");
          mask-size: 100% 100%;
        }
      }

      .is-active {
        background-color: #e8f4ff;
        mask: url("~@/assets/image/framework/tab-mask.png");
        mask-size: 100% 100%;
      }
    }
  }

  .top-navigation-tool {
    flex: none;
    margin-left: 20px;

    .top-navigation-tool-show {
      transform: rotate(90deg);

      .box-t:before {
        transform: rotate(45deg);
      }

      .box:before, .box:after {
        background-color: #1890ff !important;
      }
    }

    .top-navigation-tool--icon {
      display: inline-block;
      color: #9a9a9a;
      cursor: pointer;
      transition: transform .3s ease-out;

      &:hover {
        @extend .top-navigation-tool-show
      }

      .box-t:before {
        transition: transform .3s ease-out;
      }

      .box {
        position: relative;
        display: block;
        width: 18px;
        height: 8px;

        &:before {
          position: absolute;
          top: 2px;
          left: 0;
          width: 7px;
          height: 7px;
          content: "";
          background: #9a9a9a;
        }

        &:after {
          position: absolute;
          top: 2px;
          left: 8px;
          width: 7px;
          height: 7px;
          content: "";
          background: #9a9a9a;
        }
      }
    }
  }
}
</style>
