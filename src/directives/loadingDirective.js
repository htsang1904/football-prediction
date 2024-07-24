import { Loading } from 'element-ui';
import '@/assets/styles.css';
export default {
  bind(el, binding) {
    if (binding.value) {
      el.loadingInstance = Loading.service({
        target: el,
        lock: true,
        customClass: 'custom-loading', 
        background: 'rgba(0, 0, 0, 0)',
      });
    }
  },
  update(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        el.loadingInstance = Loading.service({
          target: el,
          lock: true,
          customClass: 'custom-loading', 
          background: 'rgba(0, 0, 0, 0)',
        });
      } else {
        el.loadingInstance && el.loadingInstance.close();
      }
    }
  },
  unbind(el) {
    el.loadingInstance && el.loadingInstance.close();
  },
};