<template>
    <Popup
        :visible.sync="isShow"
        @closed="onClosed"
        class="task-popup"
        :showFooter="true"
        :title="title"
    >
    <DailyTask :listItem="currDailyTask" :loading="loading"/>
    <WeeklyTask :listItem="currWeeklyTask" :loading="loading"/>
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
            currDailyTask: [],
            currWeeklyTask: [],
            loading: false
        }
    },
    mounted() {
        if (this.visible) {
            this.showDialog = true;
        }
        this.getTaskList()
    },
    computed: {
        title() {
            return 'Nhiệm vụ'
        }
    },

    methods: {
        async getTaskList() {
            this.loading = true
            let taskList = await this.$api.taskApi.getData()
            let hisTaskList = await this.$api.taskHisApi.getTaskLog({
                user_id: this.$game.userInfo.id
            })
            setTimeout(() => {
            let dailyTask = taskList.data.filter(e => e.type === 'daily')
            this.currDailyTask = dailyTask.map(e => {
               let count = hisTaskList.data.dailyTask.filter(x => x.task.id == e.id).length
               return {...e, count: count}
            })
            let weeklyTask = taskList.data.filter(e => e.type === 'weekly')
            this.currWeeklyTask = weeklyTask.map(e => {
               let count = hisTaskList.data.weeklyTask.filter(x => x.task.id == e.id).length
               return {...e, count: count}
            })
            this.loading = false
            }, 200);
        },
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
           background: url('../../assets/img/bg-popup1.jpg') no-repeat center / cover;
           &::after {
            display: none;
           }
           .el-dialog__body {
           }
       }
}
</style>
