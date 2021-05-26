<template>
  <div id="app">
    <Header @open-page="openPage"/>
    <Board v-if="currentPage === 'board'" />
    <Swap v-if="currentPage === 'swap'" />
    <AddLiquidity v-if="currentPage === 'pool'" />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Board from "./components/Board.vue";
import Footer from "./components/Footer.vue";
import Swap from "./components/Swap.vue";
import AddLiquidity from "./components/AddLiquidity.vue";

export default {
  name: "App",
  data () {
    return {
      currentPage: 'board'
    }
  },
  components: {
    Header,
    Board,
    Footer,
    Swap,
    AddLiquidity
  },
  methods: {
    openPage (type) {
      console.log(type)
      this.currentPage = type
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
body {
  overflow-x: hidden;
  margin: 0;

  & * {
    font-family: Roboto !important;
  }

  button {
    outline: none;
    cursor: pointer;
  }

  p {
    margin: 0;
  }
}

/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
