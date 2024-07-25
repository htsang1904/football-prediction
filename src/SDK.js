// Version: 24.05.14  

var isCimiReady = false;
window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
    isCimiReady = true;
});

const $cimiSDK = {
    emit(name, ...args) {
        // console.log('called', name, ...args)
        if (isCimiReady) {
            return window.flutter_inappwebview.callHandler(name, ...args);
        }
    },
    on(eventName, data) {
        let event
        switch (eventName) {
            case 'userInfo':
                event = new CustomEvent('userInfo', {
                    detail: data
                });
                break;
            case 'appVersion':
                event = new CustomEvent('appVersion', {
                    detail: data
                });
                break;
            case 'onShakedDevice':
                event = new CustomEvent('onShakedDevice', {
                    detail: data
                });
                break;
            case 'setPaddingTop':
                event = new CustomEvent('setPaddingTop', {
                    detail: data
                });
                break;
            case 'appLocationId':
                event = new CustomEvent('appLocationId', {
                    detail: data
                });
                break;
            case 'userGeo':
                event = new CustomEvent('userGeo', {
                    detail: data
                });
                break;
            case 'deviceInfo':
                event = new CustomEvent('deviceInfo', {
                    detail: data
                });
                break;
        }
        if (event) {
            window.dispatchEvent(event);
        }
    },
    openDeepLink(uri) {
        this.emit('openDeepLink', {
            uri
        });
    },
    getUserInfo() {
        this.emit('getUserInfo');
    },
    getAppVersion() {
        this.emit('getAppVersion');
    },
    setScreenBrightness() {
        this.emit('setScreenBrightness');
    },
    resetScreenBrightness() {
        this.emit('resetScreenBrightness');
    },
    openLoginModal() {
        this.emit('openLoginModal');
    },
    closeModal() {
        this.emit('closeModal');
    },
    onVibration() {
        this.emit('onVibration');
    },
    onCopyText(text) {
        this.emit('copyText', {
            text
        });
    },
    onAppNotify(title, message) {
        this.emit('appNotify', {
            title,
            message
        });
    },
    onClearCache() {
        this.emit('clearCache');
    },
    onAppLocationId() {
        this.emit('appLocationId')
    },
    onUserGeo() {
        this.emit('userGeo')
    },
    getDeviceInfo() {
        this.emit('getDeviceInfo')
    }
}

export default {
    install() {
        if (!window.$cimiSDK) {
            window.$cimiSDK = $cimiSDK
        }
    }
}