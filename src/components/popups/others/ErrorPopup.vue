<template>
    <Popup
        :visible.sync="isShow"
        @closed="onClosed"
        class="task-popup"
        :showFooter="true"
        :title="title"
        :isFullScreen="false"
        :isShowLeftBtn="false"
    >
    <div class="content">Bạn chưa đủ điều kiện để nhận thưởng, hãy hoàn thành nhiệm vụ</div>
    <template slot="footer">
        <div class="footer-btn">
            <button @click="isShow = false">Đến nhiệm vụ</button>
        </div>
    </template>
    </Popup>
</template>

<script>
import Popup from '../../Popup.vue'
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
            dailyTask: [],
            weeklyTask: []
        }
    },
    mounted() {
        if (this.visible) {
            this.showDialog = true;
        }
    },
    computed: {
        title() {
            return 'Try Again'
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
.task-popup {
        ::v-deep .el-dialog {
           background: #ffe8d0;
           min-height: 20%;
           width: 80%;
           border-radius: 10px;
           border: 3px solid #fff;
           &::after {
            display: none;
           }
           .el-dialog__header{
            width: 80%;
            .el-dialog__title {
                background-color: #ffa113;
                position: absolute;
                top: -16px;
                left: 50%;
                transform: translateX(-50%);
                padding: 6px 30px;
                border-radius: 14px;
                border-bottom: 4px solid #b2481e;
                filter: drop-shadow(0px 3px 0px #ffffff) drop-shadow(3px 0px 0px #ffffff) drop-shadow(-3px 0px 0px #ffffff) drop-shadow(0px -3px 0px #ffffff);
            }
           }
           .el-dialog__body {
                padding-bottom: 10px;
                .content {
                    padding: 10px;
                    color: #6c1e03;
                    word-break: keep-all;
                    text-align: center;
                    line-height: 1.4;
                    font-weight: 600;
                }
           }
           .el-dialog__footer {
               .footer-btn {
                    text-align: center;
                    button {
                        background-color: #DD0000;
                        padding: 8px 20px;
                        border: none;
                        box-shadow: 0 4px #BB0000;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 14px;
                        color: #fff;
                    }
               }
           }
       }
}
</style>
