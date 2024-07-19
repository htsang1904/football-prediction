<template>
    <div class="match-prediction">
        <Card :isShowTitle="!isFullMatch" :isShowFooter="!isFullMatch">
            <template slot="title">
                <div class="title-img">
                    <img src="../../assets/ticket.png" alt="">
                    <span>Vé:</span>
                    <span class="ticket-count">0</span>
                </div>
                <span class="sub-title">Dự đoán</span>
            </template>
            <template slot="body">
                <CardItem :ListItem="ListMatch" @showPopup="onOpenPopup" :isFullItem="isFullMatch"/>
            </template>
            <template slot="footer">
                <button @click="ShowFullMatchPopup">
                    Xem tất cả trận đấu <i class="fas fa-chevron-right"></i>
                </button>
            </template>
        </Card>
        <MatchPopup
            v-if="isShowPopup"
            :item="selectedMatch"
            @closed="isShowPopup = false"
        />
        <FullMatchPopup
            v-if="isShowFullMatchPopup"
            @closed="isShowFullMatchPopup = false"
        />
    </div>
</template>

<script>
import Card from '../Card.vue'
import CardItem from '../CardItem.vue'
import MatchPopup from '../popups/MatchPopup.vue'
import FullMatchPopup from '../popups/FullMatchPopup.vue'
export default {
components: {
    Card,
    CardItem,
    MatchPopup,
    FullMatchPopup,
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
                time: '02:00',
                teams:{
                    firtTeam:{
                        name: "Việt Nam"
                    },
                    secTeam: {
                        name: "Thái lan"
                    }
                }
            },
            {
                isPredicted: false,
                date: '15/07/2024',
                time: '16:00',
                match:{
                    firtTeam:{
                        name: "Việt Nam"
                    },
                    secTeam: {
                        name: "Thái lan"
                    }
                }
            },
            {
                isPredicted: true,
                date: '15/07/2024',
                time: '16:00',
                match:{
                    firtTeam:{
                        name: "Việt Nam"
                    },
                    secTeam: {
                        name: "Thái lan"
                    }
                }
            },
            {
                isPredicted: true,
                date: '20/07/2024',
                time: '16:00',
                match:{
                    firtTeam:{
                        name: "Việt Nam"
                    },
                    secTeam: {
                        name: "Thái lan"
                    }
                }
            }
        ],
        isShowPopup: false,
        selectedMatch: null,
        isShowFullMatchPopup: false
    }
},
methods: {
    onOpenPopup(e) {
        this.isShowPopup = true
        this.selectedMatch = e
    },
    ShowFullMatchPopup() {
        this.isShowFullMatchPopup = true
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
        width: 60px;
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
        left: 107%;
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
        height: 80%;
        top: 4px;
        left: -14px;
        -webkit-filter: drop-shadow(0px 4px 4px #222222c4);
        filter: drop-shadow(0px 2px 2px #222222c4);
        }
    }
    .sub-title {
        -webkit-filter: drop-shadow(0px 4px 4px #222222c4);
        filter: drop-shadow(0 0 4px #222222);
    }
}
</style>
  