<template>
    <div class="daily-task">
        <Card :isShowFooter="false">
            <template slot="title">
                <div class="title-img">
                    <img src="@/assets/prediction.png" alt="">
                </div>
                <span class="sub-title">Nhiệm vụ hàng tuần</span>
            </template>
            <template slot="body">
                <CardItem :isTask="true" :ListItem="ListDailyTask" @showPopup="" :isFullItem="true"/>
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
                description: "Mua 1 ly nước bất kì mệnh giá 30k"
            },
            {
                description: "Mua 1 ly nước bất kì mệnh giá 30k"
            },
            {
                description: "Mua 1 ly nước bất kì mệnh giá 30k"
            },
        ],
        selectedMatch: null,
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
  