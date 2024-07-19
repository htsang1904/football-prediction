<template>
  <div id="header">
    <div class="logo">
      <img src="../assets/153618977_logo.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

<style lang="scss" scoped>
#header {
  height: 68px;
  width: 100%;
  background: url('../assets/bg-header.jpg') no-repeat center/100% 80px;
  position: relative;
  box-shadow: inset 0 -12px 10px #152141;
  .logo {
    width: 50px;
    position: absolute;
    top: 10px;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
    img {
      width: 100%;
    }
  }
}
</style>
