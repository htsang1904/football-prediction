<template>
    <div :class="{ loader: true, fadeout: !isLoading }">
        <img src="../assets/img/logo.png" alt="">
        <div class="loading-icon" v-loading="isLoading">
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoadingScreen",
    props: ["isLoading"]
  };
  </script>
  
  <style lang="scss">
  .loader {
    background: #237e08;
    bottom: 0;
    color: white;
    display: block;
    font-size: 32px;
    left: 0;
    overflow: hidden;
    padding-top: 10vh;
    position: fixed;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 0;
    z-index: 99999999999;
    .loading-icon {
        height: 200px;
        width: 100%;
        margin-top: 160px;
    }
    img {
        width: 50%;
    }
  }
  
  .fadeout {
    animation: fadeout 1s forwards;
  }
  
  @keyframes fadeout {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
  </style>