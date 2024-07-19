<template>
    <Popup
        :visible.sync="isShow"
        @closed="onClosed"
        class="full-match-popup"
        :showFooter="true"
        :title="title"
    >
        <FullHistoryPrediction :isFullMatch="true"/>
    </Popup>
</template>

<script>
import Popup from '../Popup.vue'
export default {
    components: {
        Popup,
        FullHistoryPrediction: () => import('../cards/HistoryPrediction.vue')
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        listItem: {
            type: Array,
            default: () => {
                return []
            }
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
            return 'Dự đoán gần đây'
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
.full-match-popup {
     .el-dialog {
        .el-dialog__body {
            padding: 50px 0px 30px 0px;
        }
    }
}
</style>
