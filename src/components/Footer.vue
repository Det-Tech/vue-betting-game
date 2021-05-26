<template>
  <div class="footer">
    <div>
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>Play Game</li>
        <li>FAQ</li>
        <li>News</li>
        <li>Contact US</li>
      </ul>
      <div class="social">
        <button><img src="imgs/icons/reddit.svg" /></button>
        <button><img src="imgs/icons/twitter.svg" /></button>
        <button><img src="imgs/icons/instagram.svg" /></button>
        <button><img src="imgs/icons/telegram.svg" /></button>
      </div>
    </div>
    <div>
      If playing online blockchain games are not allowed in your region, we advise you to
      refrain from playing this game or participate in the activities on this website. You
      must be 21 years of age to click on any betting or gambling related items even if it
      is legal to do so in your location.<br /><br />

      By using our website, you agree to our terms and conditions. Recognising that the
      laws and regulations involving online gaming are different everywhere, readers are
      advised to check with the laws that exist within their own jurisdiction to ascertain
      the legality of the activities which are covered.<br /><br />

      The game provided in our platform is based on blockchain, fair and transparent. When
      you start playing, please note that online gambling and lottery is an entertainment
      vehicle and that it carries with it a certain degree of financial risk. Users should
      be aware of this risk, and govern themselves accordingly.
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
.footer {
  background: #12101f;
  color: #ffffff20;
  padding: 12px 10px 35px;
  font-size: 11px;

  & > div {
    &:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #222036;
      border-radius: 20px;
      padding: 34px;

      ul {
        padding-left: 0;
        display: flex;
        margin: 0;
        margin-bottom: 34px;

        li {
          list-style-type: none;
          color: #fff;
          font-size: 16px;
          margin: 0 10px;
        }
      }

      .social {
        display: flex;

        button {
          width: 50px;
          height: 50px;
          padding: 0;
          border: none;
          background: #38364a;
          margin: 0 11px;

          img {
            width: 30px;
            height: 30px;
            filter: invert(1);
          }
        }
      }
    }

    &:last-child {
      padding: 24px 18px;
    }
  }
}
</style>
