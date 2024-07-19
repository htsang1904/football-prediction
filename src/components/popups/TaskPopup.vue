<template>
    <Popup
        :visible.sync="isShow"
        @closed="onClosed"
        class="task-popup"
        :showFooter="true"
        :title="title"
    >
    <DailyTask/>
    <WeeklyTask/>
    </Popup>
</template>

<script>
import Popup from '../Popup.vue'
import DailyTask from '../cards/tasks/DailyTask.vue'
import WeeklyTask from '../cards/tasks/WeeklyTask.vue'
export default {
    components: {
        Popup,
        DailyTask,
        WeeklyTask
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
            return 'Nhiệm vụ'
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
           background: url('../../assets/bg-popup1.jpg') no-repeat center / cover;
           &::after {
            display: none;
           }
           .el-dialog__body {
           }
       }
}
</style>
