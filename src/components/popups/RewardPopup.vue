<template>
    <Popup
        :visible.sync="isShow"
        @closed="onClosed"
        class="reward-popup"
        :showFooter="true"
        :title="title"
    >
    </Popup>
</template>

<script>
import Popup from '../Popup.vue'
export default {
    components: {
        Popup,
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isShow: true,
        }
    },
    mounted() {
        if (this.visible) {
            this.showDialog = true;
        }
    },
    computed: {
        title() {
            return 'Đổi thưởng'
        }
    },

    methods: {
        onClosed() {
            this.$emit('closed')
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.showDialog = true;
            } else {
                this.showDialog = false;
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.reward-popup {
    ::v-deep .el-dialog {
           background: url('../../assets/bg-popup1.jpg') no-repeat center / cover;
           &::after {
            display: none;
           }
           .el-dialog__body {
           }
       }
}
</style>
