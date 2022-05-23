import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { isEmpty, isString } from "lodash-es";
import Vue from "vue";

let instance = null;
const ImageViewerConstructor = Vue.extend(ElImageViewer);

export default {
  install() {
    Vue.prototype.$previewImages = (pics) => {
      if (isEmpty(pics) || instance) return;
      let urlList = [];
      if (isString(pics)) urlList.push(pics);
      else urlList = pics;
      instance = new ImageViewerConstructor({
        el: document.createElement("div"),
        propsData: {
          urlList,
          onClose: () => {
            instance.$destroy();
            instance = null;
          },
        },
      });
    };
  },
};
