<template>
  <transition name="fade">
    <div v-show="showSearchPop" class="page-search" @mousedown.self="close">
      <el-autocomplete ref="autocomplete" v-model="state" :fetch-suggestions="querySearchAsync"
                       placeholder="搜索页面，支持标题、URL模糊搜索" :popper-append-to-body="false" value-key="title"
                       prefix-icon="el-icon-search"
                       @select="handleSelect">
        <template #default="{item}">
          <div class="suggestion">
            <svg-icon :name="item.icon"></svg-icon>
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <div class="breadcrumb">
                <div v-for="(o,i) of item.titlePath" :key="o" class="breadcrumb__item">
                  {{ o }}
                  <i v-show="i!==item.titlePath.length - 1" class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="path">{{ item.path }}</div>
            </div>
          </div>
        </template>
      </el-autocomplete>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import {last, toLower} from 'lodash-es'
import {getMenusFullPath} from '@/utils/menu'
import regex from '@/constant/regex'

export default {
  name: "PageSearch",
  data() {
    return {
      state: ''
    }
  },
  computed: {
    ...mapGetters(['allMenuChildrenPaths']),
    ...mapState({
      showSearchPop: state => state.project.showSearchPop,
      allMenus: state => state.menu.allMenus
    }),
    searchAllMenuList() {
      let searchMenuList = [];
      this.allMenuChildrenPaths.forEach(childPaths => {
        const lastChild = last(childPaths)
        if (!lastChild['hideMenu']) {
          let icon;
          const titles = childPaths.map(o => {
            !icon && (icon = o.icon);
            return o.title;
          })
          const isLink = regex.url.test(lastChild.path) && !lastChild.componentName;
          searchMenuList.push({
            title: lastChild.title,
            titlePath: titles,
            icon: icon,
            path: isLink ? lastChild.path : "/" + getMenusFullPath(childPaths)
          })
        }
      });
      return searchMenuList;
    }
  },
  watch: {
    showSearchPop(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.autocomplete.$refs.input.$refs.input.focus()
        }, 300)
      }
    }
  },
  methods: {
    ...mapMutations({
      setShowSearchPop: 'SET_SHOW_SEARCH_POP'
    }),
    close() {
      this.setShowSearchPop(false)
      this.state = '';
    },
    querySearchAsync(queryString, cb) {
      if (queryString === "") {
        cb(this.searchAllMenuList);
      } else {
        const query = toLower(queryString);
        const results = this.searchAllMenuList.filter(menu => {
          return toLower(menu.title).indexOf(query) !== -1 || toLower(menu.path).indexOf(query) !== -1 || menu.titlePath.some(o => toLower(o).indexOf(query) !== -1);
        })
        cb(results)
      }
    },
    handleSelect(item) {
      if (regex.url.test(item.path)) {
        window.open(item.path)
      } else {
        this.$router.push(item.path)
      }
      this.state = '';
      this.setShowSearchPop(false)
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes search-pop-in {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-enter-active {
  animation: search-pop-in 0.2s;
}

.fade-leave-active {
  animation: search-pop-in 0.2s reverse;
}

.page-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  transform: translateZ(0);

  ::v-deep .el-autocomplete {
    margin-top: 40px;
    max-width: 800px;
    width: 80vw;
    height: 60px;

    .el-input__inner {
      height: 60px;
      line-height: 60px;
    }

    .el-autocomplete-suggestion__wrap {
      max-height: calc(100vh - 200px);
      padding: 0;
      @mixin li-highlight() {
        background-color: #D3E1F6;

        .suggestion {
          svg {
            color: #409eff;
            transform: scale(1.2);
          }

          .content {
            border-left-color: #b7cafc;
            color: #606266;
          }
        }
      }

      .highlighted {
        @include li-highlight();
      }

      li {
        padding: 0 20px;

        &:hover {
          @include li-highlight();
        }
      }
    }

    .suggestion {
      display: flex;
      align-items: center;

      svg {
        width: 24px;
        height: 24px;
        margin-right: 20px;
        transition: transform .2s
      }

      .content {
        flex: 1;
        border-left: 1px solid #ebeef5;
        padding: 5px 10px 7px;
        overflow: hidden;
        font-size: 12px;
        color: #c0c4cc;

        .title {
          height: 20px;
          line-height: 20px;
          font-size: 18px;
          font-weight: 700;
          color: #666;

        }

        .breadcrumb {
          display: flex;

          .breadcrumb__item {
            height: 16px;
            line-height: 16px;
          }
        }

        .path {
          height: 16px;
          line-height: 16px;
        }
      }
    }
  }
}

</style>
