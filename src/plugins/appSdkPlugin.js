import Vue from 'vue'

const appSdkPlugin = new Vue({
  data() {
    return {
      isCimiReady: false,
    }
  },
  methods: {
    checkAppVersion() {
      function isPositiveInteger(x) {
        return /^\d+$/.test(x);
      }

      function compareVersionNumbers(v1, v2) {
        var v1parts = v1.split('.');
        var v2parts = v2.split('.');

        function validateParts(parts) {
          for (var i = 0; i < parts.length; ++i) {
            if (!isPositiveInteger(parts[i])) {
              return false;
            }
          }
          return true;
        }
        if (!validateParts(v1parts) || !validateParts(v2parts)) {
          return false;
        }
        for (var i = 0; i < v1parts.length; ++i) {
          if (v2parts.length == i) {
            return 1;
          }
          if (v1parts[i] == v2parts[i]) {
            continue;
          } else if (v1parts[i] > v2parts[i]) {
            return 1;
          } else {
            return -1;
          }
        }
        if (v1parts.length != v2parts.length) {
          return -1;
        }
        return 0;
      }
      return compareVersionNumbers(this.appVersion, '1.14.0') >= 0;
    },
    closeModal() {
      if (this.isCimiReady) {
        window.$cimiSDK.closeModal();
      }
    },
    openDeepLink() {
      if (this.isCimiReady) {
        window.$cimiSDK.openDeepLink(deeplink);
      }
    },
    getUserInfo() {
      if (this.isCimiReady) {
        window.$cimiSDK.getUserInfo();
      }
    },
    getAppVersion() {
      if (this.isCimiReady) {
        window.$cimiSDK.getAppVersion();
      }
    },
  },
})
export default {
  install(Vue, options) {
    Vue.prototype.$appSdk = appSdkPlugin
  }
}