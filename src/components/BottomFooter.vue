<template>
    <div id="footer">
        <div class="btn-group">
            <div class="btn" v-for="(item,index) in tabs" :key="index" @click="handleClick(item)" :class="{active: selectedTab == index}">
                <img v-if="item.img" :src="getImage(item.img)" alt="">
                <span>{{ item.tabName }}</span>
            </div>
        </div>
        <TaskPopup
            v-if="isShowTaskPopup"
            @closed="isShowTaskPopup = false"
        />
        <RewardPopup
          v-if="isShowRewardPopup"
          @closed="isShowRewardPopup = false"
        />
    </div>
  </template>
  
  <script>
  const Tabs = [
    {
      tabName: "Nhiệm vụ",
      img: ""
    },
    {
      tabName: "Dự đoán",
      img: "home-icon.png"
    },
    {
      tabName: "Đổi thưởng",
      img: ""
    }
  ]
  import TaskPopup from './popups/TaskPopup.vue'
  import RewardPopup from './popups/RewardPopup.vue'
  export default {
    components: {
      TaskPopup,
      RewardPopup
    },
    props: {
    },
    data() {
      return {
        activeName: 'home',
        tabs: Tabs,
        selectedTab: 1,
        isShowTaskPopup: false,
        isShowRewardPopup: false
      }
    },
    methods: {
      getImage(img) {
        return img ? require(`../assets/img/${img}`) : '';
      },
      handleClick(item) {
        this.selectedTab = this.tabs.indexOf(item)
        if(this.selectedTab == 0) {
          this.isShowTaskPopup = true
        }
        if(this.selectedTab == 2) {
          this.isShowRewardPopup = true
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  #footer {
  height: 60px;
  width: 100%;
  background: #ebf4fb;
  position: relative;
  border-radius: 10% 10% 0 0 / 12%;
  box-shadow:  0 -3px 0 #b9d8ea, 0 -6px 0px #ebf4fbbe;
  .btn-group {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    .btn {
        flex: 1;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #828ec4;
        img {
            height: 60px;
            width: 60px;
            margin-bottom: 4px;
        }
    }
    .btn:nth-child(2) {
        margin-bottom: 12px;
        color: #1f388b;
        filter: drop-shadow(0 1px 3px #2f7bd87b);
        font-size: 12px;
    }
  }
}
  </style>