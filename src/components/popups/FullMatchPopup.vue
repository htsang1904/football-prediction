<template>
    <Popup
        :visible.sync="isShow"
        @closed="onClosed"
        class="full-match-popup"
        :showFooter="true"
        :title="title"
    >
        <FullMatchPrediction :isFullMatch="true"/>
    </Popup>
</template>

<script>
import Popup from '../Popup.vue'
export default {
    components: {
        Popup,
        FullMatchPrediction: () => import('../cards/MatchPrediction.vue')
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
            return 'Dự đoán trận đấu'
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
        }
    }
}
</style>
