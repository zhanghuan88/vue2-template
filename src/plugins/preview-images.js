import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { isEmpty, isString } from "lodash-es";

let instance = null;
export default {
  install(Vue) {
    const ImageViewerConstructor = Vue.extend(ElImageViewer);
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
            console.log(instance);
            instance.$destroy();
            instance = null;
          },
        },
      });
    };
  },
};
