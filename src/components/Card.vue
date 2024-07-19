<template>
    <div class="card">
        <div class="title" v-if="isShowTitle">
          <slot name="title">
          </slot>
        </div>
        <div class="body">
          <slot name="body">
            
          </slot>
        </div>
        <div class="footer"  v-if="isShowFooter">
          <slot name="footer">
            
          </slot>
        </div>
    </div>
  </template>
  
  <script>
  import CardItem from './CardItem.vue'
  export default {
    components: {
      CardItem
    },
    props: {
      isShowTitle: {
        type: Boolean,
        default: true
      },
      isShowFooter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        items: [
          1, 2, 3
        ]
      }
    },
    methods: {
    }
  }
  </script>
  
<style lang="scss">
.card {
    margin-top: 40px;
    min-height: 160px;
    width: 84%;
    background: url('../assets/grass-bg1.jpg') center / 30%;
    border: 1px solid #fff;
    box-shadow: inset 0 0 20px #ffffff9d;
    border-radius: 4px;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  .title {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
    box-sizing: border-box;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: relative;
  }
  
  .body {
    width: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.3);
    position: relative;
    border-radius: 4px;
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    button {
      padding: 8px;
      background-color: transparent;
      border: 1px solid #fff;
      color: #fff;
      font-weight: 600;
      border-radius: 14px;
      margin-bottom: 10px;
      .fa-chevron-right {
        margin-left: 10px;
      }
    }
  }
}
</style>
  