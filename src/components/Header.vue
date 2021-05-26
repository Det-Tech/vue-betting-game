<template>
  <div class="header">
    <div class="logo" @click="activatePage('board')">
      <img src="imgs/logo.png" />
    </div>
    <div class="actions">
      <button @click="activatePage('pool')">
        <img src="imgs/icons/wallet.svg" />
        <span>POOL</span>
      </button>

      <button @click="activatePage('swap')">
        <img src="imgs/icons/wallet.svg" />
        <span>SWAP</span>
      </button>

      <button>
        <img src="imgs/icons/wallet.svg" />
        <span>123456 DICE</span>
      </button>

      <button class="wallet">
        <span>Connect Wallet</span>
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    activatePage (type) {
      this.$emit('open-page', type)
    }
  }
};


var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
window.onload=openFullscreen();

    
</script>

<style lang="scss">
#app{
  min-width:1200px;
  overflow:hidden;
}
.header {
  height: 60px;
  display: block;
  box-sizing: border-box;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
  align-items: center;
  padding: 0 20px;
 min-width:1200px;
  .logo {
    display: flex;
    align-items: center;

    img {
      height: 36px;
    }
  }

  .actions {
    display: flex;
    align-items: right;
    float : right;

    button {
      margin: 0 5px;
      border: none;
      border-radius: 20px;
      border: 5px solid #120f1f;
      background: #2a2735;
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 3px 0px;
      color: #fff;

      img {
        margin-right: 10px;
      }

      span {
        line-height: -1;
      }
    }

    .wallet {
      margin: 0 5px;
      border: none;
      border-radius: 20px;
      background: #3064ad;
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 8px 10px;
      color: #fff;
    }
  }
}


/*
@media (max-width: 1200px) {
  .header {
    padding: 2px 0px;
  }
  button {
  padding : 2px 0px;
  }
}*/
</style>
