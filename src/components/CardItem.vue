<template>
    <div class="container" ref="container">
      <div
       v-if="ListMatch.length"
        class="card-item"
        v-for="(item, index) in ListMatch"
        :key="index"
        :style="{ top: `${positions[index]}px` }"
        ref="items">
        <div v-if="!isTask && !isReward" class="date">Ngày {{ item.date }}</div>
        <div class="match">
          <div class="item-detail">
            <img src="@/assets/img/vs.png" alt="" class="img-black-to-white">
            <div class="left-side">
              <div class="time">
                <img v-if="isReward" src="@/assets/img/voucher.png" alt="">
                <img v-else-if="isTask" src="@/assets/img/dollar-icon.png" alt="">
                <div v-else>{{ item.time }}</div>
              </div>
              <div class="team-group">
                <div v-if="!isTask && !isReward" class="team">
                  <img src="../assets/img/vn.jpg" alt="">
                </div>
                <div v-if="!isTask && !isReward" class="team">
                  <img src="../assets/img/tl.jpg" alt="">
                </div>
                <div v-if="isTask || isReward" class="description">
                  {{ item.description }}
                </div>
              </div>
              <div v-if="!item.isExpired && !isHistory" class="promotion">
                <img src="../assets/img/promo.png" alt="">
              </div>
              <div v-else-if="!isTask && !isReward" class="score">
                <div>
                  2
                </div>
                <div>
                  1
                </div>
              </div>
            </div>
            <div class="right-side">
              <div v-if="isTask || isReward" class="task-btn">
                <div class="num-times">0/{{ item.quantity }} lần</div>
                <div class="task-reward" v-if="!isReward">
                  <img src="@/assets/img/ticket.png" alt="">
                  {{ item.ticket }} vé
                </div>
                <button @click="getReward(item)">Nhận ngay</button>
              </div>
              <button v-else-if="!item.isExpired && !isHistory" @click="OpenPopup(item)">
                Dự đoán
              </button>
              <div class="result" v-else @click="OpenPopup(item)">
                <div class="expired" v-if="!isHistory">
                  Không dự đoán
                </div>
                <div class="reward" v-else>
                  <h4>
                    Thưởng: 400
                  </h4>
                  <span>Xem chi tiết <i class="fas fa-chevron-right"></i></span>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="item.isPredicted && !isHistory" class="predict-success">Bạn đã dự đoán Việt Nam thắng - 60 vé</div>
        <div v-if="isHistory" class="result-img">
          <img v-if="isCorrectPredict" src="../assets/img/correct.png" alt="">
          <img v-else src="../assets/img/correct.png" alt="">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import moment from 'moment'
  export default {
    props: {
      ListItem: {
        type: Array,
        default: () => {
            return []
        }
      },
      isHistory: {
        type: Boolean,
        default: false
      },
      isTask: {
        type: Boolean,
        default: false
      },
      isReward: {
        type: Boolean,
        default: false
      },
      isFullItem: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.processData()
      this.calculatePositions()
    },
    data() {
      return {
        positions: [],
        ListMatch: [],
        isCorrectPredict: true,
      }
    },
    computed: {
    },
    methods: {
      OpenPopup(item) {
        this.$emit('showPopup', item)
      },
      processData() {
        let now = moment(new Date(), 'DD/MM/YYYY HH:mm')
        const updatedItems = this.ListItem.map(e => {
          let dateMatch = moment(e.date +" "+ e.time, 'DD/MM/YYYY HH:mm')
          return now.isBefore(dateMatch) ? {...e, isExpired: false}:{...e, isExpired: true}
        });
          this.ListMatch = this.isFullItem ? updatedItems.slice().reverse() : updatedItems.slice(-3).reverse()
      },
      calculatePositions() {
        this.$nextTick(() => {
          const itemElements = this.$refs.items;
          let top = 20;
          this.positions = [];
          itemElements.forEach((item) => {
            this.positions.push(top);
            top += item.offsetHeight + 26;
          });
          this.$refs.container.style.height = `${top}px`;
        });
      },

      getReward(item) {
        this.$emit('getReward', item)
      }
    }
  }
  </script>
  
<style lang="scss" scoped>
.card-item {
  width: 108%;
  min-height: 80px;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  .date {
    padding: 4px 10px 4px 10px;
    border-top: 1px solid #fff;
    box-shadow: inset 0 1px 4px #ffffffd0;
    width: 100px;
    margin-left: 12px;
    font-size: 12px;
    color: #fff;
    background-color: #ffffff43;
    clip-path: polygon(0 100%, 0 0, 88% 0, 100% 100%, 100% 100%, 0 100%);
  }
  .match {
    width: 100%;
    min-height: 80px;
    background-color: #3283e5;
    display: flex;
    flex-direction: column;
    position: relative;
    clip-path: polygon( 0 18%, 4% 0, 100% 0, 100% 84%, 96% 100%, 0% 100%);
    &:before {
      content: '';
      width: 99.4%;
      min-height: 98%;
      background: #193d95;
      position: absolute;
      top: 1px;
      left: 1px;
      clip-path: polygon(0 18%, 4% 0, 100% 0, 100% 84%, 96% 100%, 0% 100%);
      z-index: -1
    }
    .item-detail {
      color: #fff;
      padding: 1px;
      display: flex;
      flex-grow: 1;
      width: 100%;
      box-sizing: border-box;
      box-shadow:inset 0 0 10px #368bf2;
      position: relative;
      .img-black-to-white {
          height: 100%;
          filter: invert(100%) grayscale(100%);
          opacity: 0.1;
          box-sizing: border-box;
          position: absolute;
          z-index: -1;
          left: 48px;
        }
      .left-side {
        flex: 5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          flex: 1;
          font-size: 12px;
          font-weight: 600;
          background-color: #152141;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            padding: 4px;
            white-space: nowrap;
          }
          img {
            width: 80%;
          }
        }
        .team-group {
          margin-left: 10px;
          flex: 3;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: start;
          .team {
            img {
              height: 20px;
              border-radius: 4px;
              border: 1px solid #fff;
            }
          }
          .description {
            word-break: keep-all;
            font-size: 11px;
            margin-right: 4px;
            font-weight: 600;
            line-height: 1.3;
          }
        }
        .promotion {
          flex: 2;
          img {
            height: 80px;
          }
        }
        .score {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: end;
          flex: 2;
          height: 100%;
          padding-right: 10px;
          font-weight: 700;
        }
      }
      .right-side {
        flex: 2;
        background-color: #152141;
        padding: 8px;
        clip-path: polygon(0 0, 0 0, 100% 0, 100% 84%, 87% 100%, 0% 100%);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: relative;
        button {
          background-color: #ffcc4f;
          padding: 4px 8px;
          border: none;
          box-shadow: 0 4px #ffb700;
          border-radius: 8px;
          font-weight: 600;
          font-size: 12px;
        }
        .result {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          .expired {
            font-weight: 600;
          }
          .reward {
            h4 {
              margin-top: 10px;
            }
            span {
              font-size: 11px;
              position: absolute;
              bottom: 2px;
              right: 12px;
            }
          }
        }
        .task-btn {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: center;
          position: relative;
          button {
            margin: 4px 0;
            background-color: #c6395c;
            box-shadow: 0 4px 0 #98213f;
            color: #fff;
          }
          .task-reward {
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            img {
              width: 18px;
              margin-right: 4px;
            }
          }
          .num-times {
            position: absolute;
            top: -8px;
            right: -8px;
            padding: 4px 10px 2px 10px;
            border-left: 1px solid #3283e5;
            border-bottom: 1px solid #3283e5;
            border-bottom-left-radius: 3px;
            white-space: nowrap;
            font-size: 10px;
            color: #3283e5;
            font-weight: 600;
          }
        }
      }
    }
  }
  .predict-success {
    background: #ffffff;
    color: #04419d;
    width: 70%;
    clip-path: polygon(0% 0%, 98% 0%, 100% 50%, 98% 100%, 0% 100%);
    font-size: 12px;
    font-weight: 700;
    padding: 2px 4px 2px 6px;
    position: absolute;
    border-bottom-left-radius: 4px;
    bottom: -14px
  }
  .result-img {
    position: absolute;
    border-radius: 4px;
    top: 4px;
    right: 0;
    img {
      height: 40px;
      border-radius: 4px
    }
  }
};
</style>
  