<template>
    <div class="daily-task">
        <Card :isShowFooter="false">
            <template slot="title">
                <div class="title-img">
                    <img src="@/assets/img/reward.png" alt="">
                    <span>Xu:</span>
                    <span class="coin-count">{{ coinCount }}</span>
                </div>
                <span class="sub-title">Dúng vé đổi thưởng</span>
            </template>
            <template slot="body">
                <CardItem :isReward="true" :ListItem="ListDailyTask" @showPopup="" :isFullItem="true"/>
            </template>
        </Card>
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
        ListDailyTask: [
            {
                description: "Mã giảm giá cà phê 10%"
            },
            {
                description: "Mã giảm giá cà phê 10%"
            },
            {
                description: "Mã giảm giá cà phê 10%"
            },
        ],
        selectedMatch: null,
    }
},
computed: {
    coinCount() {
        return this.$game.userInfo.total_coins
    }
},
methods: {
    
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
  