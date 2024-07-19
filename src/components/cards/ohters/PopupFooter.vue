<template>
    <div class="popup-footer">
      <div class="title">
        <div class="left-side">
          Nhập vé dự đoán:
        </div>
        <div class="right-side">
          Vé của bạn: 0
        </div>
      </div>
      <div class="predict">
        <el-input-number v-model="num" :min="0" :max="10" size="small"></el-input-number>
        <div class="reward">
          <span>Dự đoán đúng:</span>
          <h4>+24</h4>
        </div>
        <button>Dự đoán</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
    },
    data() {
      return {
        num: 1,
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .popup-footer {
    height: 92px;
    width: 100%;
    background-color: #b6d2e7;
    border-top-left-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    box-sizing: border-box;
    filter: drop-shadow(0 -2px 4px #16329759);
    &::before {
      content: '';
      background-color: #ebf4f9;
      height: 50px;
      width: 40%;
      position: absolute;
      border-top-left-radius: 14px;
      clip-path: polygon(0 0, 84% 0%, 100% 100%, 0% 100%);
      bottom: 49px;
      left: 0;
      z-index: -1;
    }
    &::after {
      content: '';
      background-color: #ebf4f9;
      height: 60px;
      width: 100%;
      position: absolute;
      border-top-right-radius: 14px;
      bottom:0;
      right: 0;
      z-index: -4;
    }
    .title {
      width: 100%;
      padding: 8px;
      display: flex;
      color: #15348c;
      font-weight: 600;
      box-sizing: border-box;
      .left-side {
        width: 40%;
      }
      .right-side {
        flex: 1;
        text-align: center;
      }
    }
    .predict {
      width: 96%;
      height: 45px;
      background-color: #fff;
      border-radius: 14px;
      padding: 4px 8px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      color: #15348c;
      .el-input-number--small {
        width: 120px;
      }
      .reward {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-left: 10px;
        font-weight: 600;
        span {
          font-size: 13px;
        }
        h4 {
          font-size: 16px;
          font-weight: 800;
        }
      }
      button {
        height: 100%;
        width: 90px;
        border-radius: 14px;
        background-color: #c6395c;
        color: #fff;
        font-weight: 600;
        border: 2px solid #eb6d9e;
      }
    }
}
  </style>