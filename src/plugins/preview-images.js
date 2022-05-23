import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { isEmpty, isString } from "lodash-es";

export default {
  install(Vue) {
    const ImageViewerConstructor = Vue.extend(ElImageViewer);
    Vue.prototype.$previewImages = (pics) => {
      if (isEmpty(pics)) return;
      let urlList = [];
      if (isString(pics)) urlList.push(pics);
      else urlList = pics;
      const instance = new ImageViewerConstructor({
        el: document.createElement("div"),
        propsData: {
          urlList,
          onClose: () => {
            instance.$destroy();
          },
        },
      });
    };
  },
};
