<template>
    <div class="daily-task">
        <Card :isShowFooter="false" v-loading="loading">
            <template slot="title">
                <div class="title-img">
                    <img src="@/assets/img/prediction.png" alt="">
                </div>
                <span class="sub-title">Nhiệm vụ hàng ngày</span>
            </template>
            <template slot="body">
                <CardItem v-if="listItem.length" :isTask="true" :listItem="listItem" @showPopup="" :isFullItem="true" @getReward="getReward"/>
            </template>
        </Card>
        <ErrorPopup
            v-if="isShowFailurePopup"
            :message="message"
            btnName="Đến nhiệm vụ"
            @closed="isShowFailurePopup = false"
        />
        <CongratulationPopup
            v-if="isShowSuccessPopup"
            :message="message"
            btnName="Xác nhận"
            @closed="isShowSuccessPopup = false"
        />
    </div>
</template>

<script>
import Card from '../../Card.vue'
import CardItem from '../../CardItem.vue'
export default {
components: {
    Card,
    CardItem,
},
props: {
    listItem: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
},
data() {
    return {
        selectedMatch: null,
        isShowFailurePopup: false,
        isShowSuccessPopup: false,
        isCompleted: true,
        message: ''
    }
},
methods: {
    async getReward(e) {
        if(e.count <= 0) {
            this.message = "Rất tiếc, bạn chưa đủ điều kiện để nhận thưởng."
            this.isShowFailurePopup = true
            return
        }
        let data = {
            task_id: e.id,
            user_id: this.$game.userInfo.id
        }
        let getTicket = await this.$api.taskHisApi.getTicket(data)
        if(e.count < e.quantity && !getTicket.data.success) {
            this.message = "Rất tiếc, bạn chưa đủ điều kiện để nhận thưởng."
            this.isShowFailurePopup = true
        }
        if(e.count == e.quantity && !getTicket.data.success) {
            this.message = "Hôm nay bạn đã hoàn thành nhiệm vụ này"
            this.isShowFailurePopup = true
        }
        if(getTicket.data.success) {
            this.message = `Chúc mừng bạn đã hoàn thành nhiệm vụ. Nhận ${getTicket.data.count*e.ticket} vé dự đoán`
            this.$game.userInfo.total_tickets+=getTicket.data.count*e.ticket
            await this.$api.userApi.updateTickets({
                user_id: this.$game.userInfo.id, 
                total_tickets:this.$game.userInfo.total_tickets
            })
            this.isShowSuccessPopup = true
        }
    }
}
}
</script>
  
<style lang="scss" scoped>
.daily-task {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    .title-img {
        z-index: 1;
        position: absolute;
        left: 0;
        height: 40px;
        width: 50px;
        background: #fff;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-right: 8px;
        &::after {
        content: "";
        position: absolute;
        top: 34%;
        left: 108%;
        margin-left: -5px;
        border-width: 7px;
        border-style: solid;
        border-color: transparent transparent transparent red;
        }
        span {
        color: #04419d;
        font-size: 12px;
        margin-left: 30px;
        }
        .ticket-count {
        font-weight: 900;
        }
        img {
        position: absolute;
        height: 90%;
        left: 50%;
        transform: translateX(-50%);
        -webkit-filter: drop-shadow(0px 4px 4px #222222c4);
        filter: drop-shadow(0px 2px 2px #22222295);
        }
    }
    .sub-title {
        -webkit-filter: drop-shadow(0px 4px 4px #222222c4);
        filter: drop-shadow(0 0 4px #222222);
    }
}
</style>
  