<template>
    <div class="match-prediction">
        <Card :isShowTitle="!isFullMatch" :isShowFooter="!isFullMatch">
            <template slot="title">
                <div class="title-img">
                    <img src="../../assets/img/prediction.png" alt="">
                </div>
                <span class="sub-title">Dự đoán gần đây</span>
            </template>
            <template slot="body">
                <CardItem :listItem="ListMatch" @showPopup="onOpenPopup" :isHistory="true" :isFullItem="isFullMatch"/>
            </template>
            <template slot="footer">
                <button @click="ShowFullHistoryPopup">
                    Xem tất cả lịch sử <i class="fas fa-chevron-right"></i>
                </button>
            </template>
        </Card>
        <MatchPopup
            v-if="isShowPopup"
            :item="selectedMatch"
            @closed="isShowPopup = false"
        />

        <FullHistoryPopup
            v-if="isShowFullHitoryPopup"
            @closed="isShowFullHitoryPopup = false"
        />
    </div>
</template>

<script>
import Card from '../Card.vue'
import CardItem from '../CardItem.vue'
import MatchPopup from '../popups/MatchPopup.vue'
import FullHistoryPopup from '../popups/FullHistoryPopup.vue'
export default {
components: {
    Card,
    CardItem,
    MatchPopup,
    FullHistoryPopup
},
props: {
    isFullMatch: {
        type: Boolean,
        default: false
    }
},
data() {
    return {
        ListMatch: [
            {
                isPredicted: false,
                date: '14/07/2024',
                time: '02:00'
            },
            {
                isPredicted: true,
                date: '15/07/2024',
                time: '16:00'
            },
            {
                isPredicted: false,
                date: '15/07/2024',
                time: '16:00'
            },
            {
                isPredicted: false,
                date: '15/07/2024',
                time: '16:00'
            },
            {
                isPredicted: false,
                date: '15/07/2024',
                time: '16:00'
            }
        ],
        isShowPopup: false,
        selectedMatch: null,
        isShowFullHitoryPopup: false,
    }
},
methods: {
    onOpenPopup(e) {
        this.isShowPopup = true
        this.selectedMatch = e
    },
    ShowFullHistoryPopup() {
        this.isShowFullHitoryPopup = true
    }
}
}
</script>
  
<style lang="scss" scoped>
.match-prediction {
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
        width: 40px;
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
        right: -29%;
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
  