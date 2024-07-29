<template>
    <div class="daily-task">
        <Card :isShowFooter="false" v-loading="loading">
            <template slot="title">
                <div class="title-img">
                    <img src="@/assets/img/reward.png" alt="">
                    <span>Xu:</span>
                    <span class="coin-count">{{ coinCount }}</span>
                </div>
                <span class="sub-title">Dúng vé đổi thưởng</span>
            </template>
            <template slot="body">
                <CardItem v-if="listReward.length" :isReward="true" :listItem="listReward" :isFullItem="true" @getReward="getReward"/>
            </template>
        </Card>
        <ErrorPopup
            v-if="isShowFailurePopup"
            :message="message"
            btnName="Đi dự đoán"
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
    },
    data() {
        return {
            listReward: [],
            selectedMatch: null,
            loading: false,
            isShowFailurePopup: false,
            isShowSuccessPopup: false,
            message: ''
        }
    },
    computed: {
        coinCount() {
            return this.$game.userInfo.total_coins
        }
    },
    mounted() {
        this.getRewardList()
    },
    methods: {
        async getRewardList() {
            this.loading = true
            let res = await this.$api.rewardApi.getData()
            setTimeout(() => {
            this.listReward = res.data
            this.loading = false
            }, 200);
        },
        async getReward(e) {
            if(this.$game.userInfo.total_coins < e.coins) {
                this.message = "Xu hiện tại của bạn không đủ để đổi thưởng. Hãy dự đoán để kiếm thêm xu thưởng."
                this.isShowFailurePopup = true
                return
            }
            let receivedReward = await this.$api.rewardHisApi.createLog({
                reward_id: e.id,
                user_id: this.$game.userInfo.id
            }).then(res => {
                this.message = `Chúc mừng bạn đã nhận được"${e.description}"`
                this.isShowSuccessPopup = true
                this.$root.$emit('reload-reward-hisory')
            }).catch(err => {
                console.log(err)
            })
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
        width: 56px;
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
        .coin-count {
        font-weight: 900;
        word-break: keep-all;
        }
        img {
        position: absolute;
        height: 90%;
        left: 4px;
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
  