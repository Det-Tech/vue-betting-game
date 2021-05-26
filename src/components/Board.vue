<template>
  <div class="board">
    <div class="timer">
      <span>Next Game in:</span>
      <div>{{ Math.ceil(timer) || "--" }}</div>
    </div>
    <div class="left-panel panel">
      <img src="imgs/frame.png" />
      <div class="content">
        <p class="title">Current Bets</p>
        <div class="items">
          <div v-for="(item, index) in realBets" :key="index" class="item">
            <span class="name">{{ item.name }}</span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="right-panel panel">
      <img src="imgs/frame.png" />
      <div class="content">
        <p class="title">Past Record</p>
        <div class="items">
          <div v-for="(item, index) in resultList" :key="index" class="item">
            <div v-for="(subItem, subIndex) in item" :key="subIndex" class="dice">
              <img :src="getLink(subItem)" />
            </div>
            <span>{{ item[0] + item[1] + item[2] }}</span>
            <img :src="getSumImageLink(item[0] + item[1] + item[2])" />
          </div>
        </div>
      </div>
    </div>
    <div class="bet-table">
      <div>
        Bet amount:
        <span>{{ getSumThrownCredits() || 0 }}&nbsp;{{ creditType }}</span>
      </div>
      <div>
        <button class="clear" @click="clearBet()">CLEAR</button>
        <button class="bet" @click="bet()">BET</button>
      </div>
    </div>
    <img src="imgs/table.png" ref="creditTable" />
    <img src="imgs/credits/1.png" ref="credit1" />
    <img src="imgs/credits/2.png" ref="credit2" />
    <img src="imgs/credits/3.png" ref="credit3" />
    <img src="imgs/credits/4.png" ref="credit4" />
    <img src="imgs/credits/5.png" ref="credit5" />
    <img src="imgs/credits/6.png" ref="credit6" />
    <img src="imgs/credits/7.png" ref="credit7" />
    <img src="imgs/dice/gray/1.png" ref="grayDiceOne" />
    <img src="imgs/dice/gray/2.png" ref="grayDiceTwo" />
    <img src="imgs/dice/gray/3.png" ref="grayDiceThree" />
    <img src="imgs/dice/gray/4.png" ref="grayDiceFour" />
    <img src="imgs/dice/gray/5.png" ref="grayDiceFive" />
    <img src="imgs/dice/gray/6.png" ref="grayDiceSix" />

    <img src="imgs/dice/result/1.png" ref="resultDiceOne" />
    <img src="imgs/dice/result/2.png" ref="resultDiceTwo" />
    <img src="imgs/dice/result/3.png" ref="resultDiceThree" />
    <img src="imgs/dice/result/4.png" ref="resultDiceFour" />
    <img src="imgs/dice/result/5.png" ref="resultDiceFive" />
    <img src="imgs/dice/result/6.png" ref="resultDiceSix" />

    <img src="imgs/dice_pan.png" ref="dicePan" />
    <img src="imgs/dice_cup.png" ref="diceCup" />

    <img src="imgs/dice_1.png" ref="throwDiceOne" />
    <img src="imgs/dice_2.png" ref="throwDiceTwo" />
    <img src="imgs/dice_3.png" ref="throwDiceThree" />
    <img src="imgs/dice_4.png" ref="throwDiceFour" />
    <img src="imgs/dice_5.png" ref="throwDiceFive" />
    <img src="imgs/dice_6.png" ref="throwDiceSix" />

    <img src="imgs/gamestart.png" ref="startGame" />
    <img src="imgs/gamestopping.png" ref="stopBetting" />

    <canvas
      id="canvas"
      ref="canvas"
      @mousedown="this.onMouseDown"
      @mousemove="this.onMouseMove"
      @mouseup="this.onMouseUp"
    ></canvas>
  </div>
</template>

<script>
import axios from "axios";
import betPostions from "../json/betPosition.json";
import images from "../json/images.json";
import words from "../json/words.json";

export default {
  name: "Board",
  data: () => {
    return {
      ip: "",
      baseURI: "http://localhost:4444",
      showResultText: false,
      resultSum: null,
      resultSumText: null,
      mouseStartPos: { x: 0, y: 0 },
      timer: null,
      status: false,
      thrownCreditSize: 36,
      resultDices: null,
      result: [],
      throwTime: 200,
      throwPosition: null,
      gameTime: 0,
      canvas: null,
      ctx: null,
      realBets: [],
      rewardCredits: [],
      thrownCredits: [],
      bettedCredits: {
        credit1: {},
        credit2: {},
        credit3: {},
        credit4: {},
        credit5: {},
        credit6: {},
        credit7: {},
      },
      action: 0,
      creditType: "DICE",
      xStartPosition: { x: 0, y: 0 },
      xEndPosition: { x: 0, y: 0 },
      initialAngle: -144,
      creditTable: null,
      selectedCredit: "credit1",
      credits: null,
      bets: null,
      resultList: [],
      betCredits: {
        credit1: {
          value: 1,
          color: "#F6B309",
          alias: "1",
          angle: -90,
        },
        credit2: {
          value: 5,
          color: "#E62631",
          alias: "5",
          angle: -65,
        },
        credit3: {
          value: 10,
          color: "#2388C1",
          alias: "10",
          angle: -40,
        },
        credit4: {
          value: 50,
          color: "#60C70D",
          alias: "50",
          angle: -15,
        },
        credit5: {
          value: 100,
          color: "#444444",
          alias: "100",
          angle: -165,
        },
        credit6: {
          value: 500,
          color: "#A78F3C",
          alias: "500",
          angle: -140,
        },
        credit7: {
          value: 1000,
          color: "#F05539",
          alias: "1K",
          angle: -115,
        },
      },
      resultBoardDiceOne: {
        x: 350,
        y: 360,
        w: 0,
        h: 0,
      },
      resultBoardDiceTwo: {
        x: 500,
        y: 360,
        w: 0,
        h: 0,
      },
      resultBoardDiceThree: {
        x: 650,
        y: 360,
        w: 0,
        h: 0,
      },
      resultDiceOne: null,
      resultDiceTwo: null,
      resultDiceThree: null,
      throwDiceOne: {
        dice: 1,
        x: window.innerWidth / 2 - 25,
        y: -60,
        w: 50,
        h: 50,
      },
      throwDiceTwo: {
        dice: 5,
        x: window.innerWidth / 2 - 25,
        y: -60,
        w: 50,
        h: 50,
      },
      throwDiceThree: {
        dice: 4,
        x: window.innerWidth / 2 - 25,
        y: -60,
        w: 50,
        h: 50,
      },
      resultBoard: {
        x: window.innerWidth / 2,
        y: 400,
        w: 0,
        h: 0,
      },
      stopBetting: {
        x: window.innerWidth / 2,
        y: 300 + window.innerWidth / 16,
        w: 0,
        h: 0,
      },
      betPostions: betPostions,
      distances: [
        {
          text: "1:8",
          startPos: { x: 237, y: 372 },
          endPos: { x: 417, y: 372 },
        },
        {
          text: "1:150",
          startPos: { x: 428, y: 372 },
          endPos: { x: 799, y: 372 },
        },
        {
          text: "1:8",
          startPos: { x: 810, y: 372 },
          endPos: { x: 990, y: 372 },
        },
        {
          text: "1:5",
          startPos: { x: 237, y: 533 },
          endPos: { x: 989, y: 533 },
        },
        {
          text: "1:2",
          startPos: { x: 237, y: 590 },
          endPos: { x: 989, y: 590 },
        },
      ],
      images: images,
      words: words,
      dicePan: { x: window.innerWidth / 2 - 70, y: 76, width: 140, height: 90 },
      diceCup: null,
      startGame: {
        x: 0,
        y: -1000,
        w: 592,
        h: 517,
      },
      sumResult: {
        3: [],
        4: [0, 3, 17],
        5: [0, 1, 18],
        6: [0, 3, 19],
        7: [0, 1, 20],
        8: [0, 3, 21],
        9: [0, 1, 22],
        10: [0, 3, 23],
        11: [1, 4, 24],
        12: [3, 4, 25],
        13: [1, 4, 26],
        14: [3, 4, 27],
        15: [1, 4, 28],
        16: [3, 4, 29],
        17: [1, 4, 30],
        18: [],
      },
      oneDiceResult: {
        1: 46,
        2: 47,
        3: 48,
        4: 49,
        5: 50,
        6: 51,
      },
      twoDicesResult: {
        "1+1": 5,
        "1+2": 31,
        "1+3": 32,
        "1+4": 33,
        "1+5": 34,
        "1+6": 35,
        "2+2": 6,
        "2+3": 36,
        "2+4": 37,
        "2+5": 38,
        "2+6": 39,
        "3+3": 7,
        "3+4": 40,
        "3+5": 41,
        "3+6": 42,
        "4+4": 14,
        "4+5": 43,
        "4+6": 44,
        "5+5": 15,
        "5+6": 45,
        "6+6": 16,
      },
      threeDicesResult: {
        "1+1+1": [2, 8],
        "2+2+2": [2, 9],
        "3+3+3": [2, 10],
        "4+4+4": [2, 11],
        "5+5+5": [2, 12],
        "6+6+6": [2, 13],
      },
    };
  },
  mounted() {
    this.getMyIp();
    window.addEventListener("resize", this.onResize);
    this.resultList = this.getResultList();
    this.canvas = this.$refs.canvas;
    this.canvas.width =  (window.innerWidth >1200) ? window.innerWidth : 1200;
    this.canvas.height = 790;
    this.ctx = this.canvas.getContext("2d");
    this.credits = {
      credit1: this.$refs.credit1,
      credit2: this.$refs.credit2,
      credit3: this.$refs.credit3,
      credit4: this.$refs.credit4,
      credit5: this.$refs.credit5,
      credit6: this.$refs.credit6,
      credit7: this.$refs.credit7,
    };
    this.diceCup = {
      x: window.innerWidth / 2 - 60,
      y: 10,
      width: 120,
      height: 140,
    };

    this.throwPosition = {
      x: window.innerWidth / 2 - this.thrownCreditSize / 2,
      y: 620,
    };

    this.creditTable = this.$refs.creditTable;
    setInterval(() => {
      if (this.timer) this.timer -= 0.01;

      let timePoint = this.gameTime % 45000;
      this.ctx.width = window.innerWidth;

      switch (timePoint) {
        case 0:
          this.moveDicePan(window.innerWidth / 2 - 125, 310, 250, 150);
          this.moveDiceCup(window.innerWidth / 2 - 110, 180, 220, 150);
          break;
        case 300:
          this.moveDiceCup(window.innerWidth / 2 - 110, -500, 220, 150);
          break;

        case 500:
          setTimeout(() => {
            const diceOnePos = this.getRandomPositionIntoPan();
            this.moveThrowDiceOne(diceOnePos.x, diceOnePos.y, 50);
            setTimeout(() => {
              this.moveThrowDiceOne(
                this.throwDiceOne.x - Math.random() * 50 * (Math.random() > 0.5 ? -1 : 1),
                this.throwDiceOne.y - Math.random() * 100,
                50
              );
              setTimeout(() => {
                this.moveThrowDiceOne(this.throwDiceOne.x, 340 + Math.random() * 40, 50);
              }, 50);
            }, 50);
          }, Math.random() * 200);

          setTimeout(() => {
            const diceTwoPos = this.getRandomPositionIntoPan();
            this.moveThrowDiceTwo(diceTwoPos.x, diceTwoPos.y, 50);
            setTimeout(() => {
              this.moveThrowDiceTwo(
                this.throwDiceTwo.x - Math.random() * 50 * (Math.random() > 0.5 ? -1 : 1),
                this.throwDiceTwo.y - Math.random() * 100,
                50
              );
              setTimeout(() => {
                this.moveThrowDiceTwo(this.throwDiceTwo.x, 340 + Math.random() * 40, 50);
              }, 50);
            }, 50);
          }, Math.random() * 200);

          setTimeout(() => {
            const diceThreePos = this.getRandomPositionIntoPan();
            this.moveThrowDiceThree(diceThreePos.x, diceThreePos.y, 50);
            setTimeout(() => {
              this.moveThrowDiceThree(
                this.throwDiceThree.x -
                  Math.random() * 50 * (Math.random() > 0.5 ? -1 : 1),
                this.throwDiceThree.y - Math.random() * 100,
                50
              );
              setTimeout(() => {
                this.moveThrowDiceThree(
                  this.throwDiceThree.x,
                  340 + Math.random() * 40,
                  50
                );
              }, 50);
            }, 50);
          }, Math.random() * 200);
          break;

        case 700:
          this.moveDiceCup(window.innerWidth / 2 - 110, 180, 220, 150);
          setTimeout(() => {
            this.throwDiceOne = {
              x: window.innerWidth / 2 - 25,
              y: -60,
              w: 50,
              h: 50,
            };
            this.throwDiceTwo = {
              x: window.innerWidth / 2 - 25,
              y: -60,
              w: 50,
              h: 50,
            };
            this.throwDiceThree = {
              x: window.innerWidth / 2 - 25,
              y: -60,
              w: 50,
              h: 50,
            };
          }, 150);
          break;

        case 900:
          this.moveDicePan(this.dicePan.x - 200, this.dicePan.y, this.dicePan.width, 50);
          this.moveDiceCup(this.diceCup.x - 200, this.diceCup.y, this.diceCup.width, 50);

          setTimeout(() => {
            this.moveDicePan(
              this.dicePan.x + 350,
              this.dicePan.y,
              this.dicePan.width,
              80
            );
            this.moveDiceCup(
              this.diceCup.x + 350,
              this.diceCup.y,
              this.diceCup.width,
              80
            );
            setTimeout(() => {
              this.moveDicePan(
                this.dicePan.x - 250,
                this.dicePan.y,
                this.dicePan.width,
                50
              );
              this.moveDiceCup(
                this.diceCup.x - 250,
                this.diceCup.y,
                this.diceCup.width,
                50
              );
              setTimeout(() => {
                this.moveDicePan(
                  this.dicePan.x + 100,
                  this.dicePan.y,
                  this.dicePan.width,
                  20
                );
                this.moveDiceCup(
                  this.diceCup.x + 100,
                  this.diceCup.y,
                  this.diceCup.width,
                  20
                );
                setTimeout(() => {
                  this.moveDicePan(window.innerWidth / 2 - 70, 76, 140, 150);
                  this.moveDiceCup(window.innerWidth / 2 - 60, 10, 120, 150);
                }, 200);
              }, 50);
            }, 80);
          }, 50);

          break;

        case 2000:
          this.startGame = {
            x: window.innerWidth / 2 - 296,
            y: 90,
            w: 592,
            h: 517,
          };

          this.moveStartGame(window.innerWidth / 2 - 200, 174, 400, 500);
          setTimeout(() => {
            this.moveStartGame(window.innerWidth / 2 - 225, 152, 450, 500);
            setTimeout(() => {
              this.moveStartGame(window.innerWidth / 2 - 200, 174, 400, 500);
              setTimeout(() => {
                this.moveStartGame(window.innerWidth / 2 - 225, 152, 450, 500);
                setTimeout(() => {
                  this.moveStartGame(window.innerWidth / 2, 348.5, 0, 200);
                  this.status = true;
                  this.timer = 30;
                }, 500);
              }, 500);
            }, 500);
          }, 500);

          break;

        case 34000:
          this.status = false;
          this.timer = null;
          this.thrownCredits = [];
          this.moveStopBetting(window.innerWidth / 2 - 225, 152, 450, 395, 200);
          setTimeout(() => {
            this.moveStopBetting(
              window.innerWidth / 2,
              300 + window.innerWidth / 16,
              0,
              0,
              200
            );
          }, 1500);
          break;

        case 36000:
          this.status = false;
          this.resultDices = this.getRandomDices(3);
          this.result = this.getResult(this.resultDices);

          this.moveDicePan(window.innerWidth / 2 - 125, 310, 250, 150);
          this.moveDiceCup(window.innerWidth / 2 - 110, 180, 220, 150);
          this.saveResult(this.resultDices);

          setTimeout(() => {
            this.resultDiceOne = {
              dice: this.resultDices[0],
              x: window.innerWidth / 2 - 85,
              y: 350,
              w: 50,
              h: 50,
            };
            this.resultDiceTwo = {
              dice: this.resultDices[1],
              x: window.innerWidth / 2 + 15,
              y: 340,
              w: 50,
              h: 50,
            };
            this.resultDiceThree = {
              dice: this.resultDices[2],
              x: window.innerWidth / 2 - 15,
              y: 360,
              w: 50,
              h: 50,
            };
            this.moveDiceCup(window.innerWidth / 2 - 110, -500, 220, 150);

            setTimeout(() => {
              this.moveResultBoard(0, 300, window.innerWidth, 200, 200);
              setTimeout(() => {
                this.moveResultBoardDiceOne(window.innerWidth / 2 - 350, 345, 100, 200);
                setTimeout(() => {
                  this.moveResultBoardDiceTwo(
                    window.innerWidth / 2 - 200,
                    345,
                    100,
                    100,
                    200
                  );
                  setTimeout(() => {
                    this.moveResultBoardDiceThree(
                      window.innerWidth / 2 - 50,
                      345,
                      100,
                      100,
                      200
                    );
                    setTimeout(() => {
                      this.showResultText = true;
                      this.resultSum = this.getResultSum();
                      this.resultSumText = this.getResultText();
                    }, 200);
                  }, 200);
                }, 200);
              }, 200);

              setTimeout(() => {
                this.showResultText = false;
                this.moveResultBoard(
                  window.innerWidth / 2,
                  200 + window.innerWidth / 12,
                  0,
                  0,
                  200
                );
                this.resultBoardDiceOne = {
                  x: 350,
                  y: 300,
                  w: 0,
                  h: 0,
                };
                this.resultBoardDiceTwo = {
                  x: 500,
                  y: 300,
                  w: 0,
                  h: 0,
                };
                this.resultBoardDiceThree = {
                  x: 650,
                  y: 300,
                  w: 0,
                  h: 0,
                };
              }, 3000);
            }, 1000);

            setTimeout(() => {
              this.moveDicePan(window.innerWidth / 2 - 70, 76, 140, 150);
              this.moveResultDiceOne(window.innerWidth / 2 - 50, 98, 30, 150);
              this.moveResultDiceTwo(window.innerWidth / 2 + 20, 95, 30, 150);
              this.moveResultDiceThree(window.innerWidth / 2 - 5, 108, 30, 150);
            }, 1000);
          }, 300);

          var active = true;
          var i = 0;

          this.betPostions.map((area) => {
            area.width = 1;
          });

          var ani = setInterval(() => {
            i += 300;
            active = !active;
            this.result.map((result) => {
              this.betPostions.map((area) => {
                if (area.id === result) {
                  if (active) {
                    area.width = 3;
                  } else {
                    area.width = 1;
                  }
                }
              });
            });

            if (i > 5000) {
              clearInterval(ani);
            }
          }, 300);
          this.resultList = [this.resultDices].concat(this.resultList);
          break;

        case 41000:
          this.moveDiceCup(window.innerWidth / 2 - 60, 10, 120, 150);
          setTimeout(() => {
            this.resultDiceOne = null;
            this.resultDiceTwo = null;
            this.resultDiceThree = null;

            // winning effect
            this.realBets.map((bet) => {
              if (this.result.indexOf(bet.area) === -1) {
                bet.startPos = bet.endPos;
                bet.endPos = { x: window.innerWidth - 100, y: 80 };
                bet.speed = {
                  x: (bet.endPos.x - bet.startPos.x) / 500,
                  y: (bet.endPos.y - bet.startPos.y) / 500,
                };
                bet.time = 0;
              }
            });

            setTimeout(() => {
              this.realBets.map((bet) => {
                if (this.result.indexOf(bet.area) !== -1) {
                  let endPos = {
                    x: bet.endPos.x + Math.floor(Math.random() * 20) - 10,
                    y: bet.endPos.y + Math.floor(Math.random() * 20) - 10,
                  };
                  this.rewardCredits.push({
                    credit: bet.credit,
                    value: bet.value,
                    avatar: bet.avatar,
                    area: bet.area,
                    name: bet.name,
                    time: 0,
                    startPos: { x: window.innerWidth - 100, y: 80 },
                    endPos: endPos,
                    speed: {
                      x: (endPos.x - window.innerWidth + 100) / 500,
                      y: (endPos.y - 80) / 500,
                    },
                  });
                }
              });

              setTimeout(() => {
                this.rewardCredits.map((item) => {
                  item.startPos = item.endPos;
                  item.endPos = this.throwPosition;
                  item.speed = {
                    x: (item.endPos.x - item.startPos.x) / 500,
                    y: (item.endPos.y - item.startPos.y) / 500,
                  };
                  item.time = 0;
                });

                this.realBets.map((item) => {
                  item.startPos = item.endPos;
                  item.endPos = this.throwPosition;
                  item.speed = {
                    x: (item.endPos.x - item.startPos.x) / 500,
                    y: (item.endPos.y - item.startPos.y) / 500,
                  };
                  item.time = 0;
                });

                setTimeout(() => {
                  this.rewardCredits = [];
                  this.realBets = [];
                }, 500);
              }, 800);
            }, 800);
          }, 150);
          break;

        default:
          break;
      }

      this.thrownCredits.map((item) => {
        if (item.time * item.speed.x + item.startPos.x !== item.endPos.x) item.time += 10;
      });

      this.realBets.map((item) => {
        if (item.time * item.speed.x + item.startPos.x !== item.endPos.x) item.time += 10;
      });

      this.rewardCredits.map((item) => {
        if (item.time * item.speed.x + item.startPos.x !== item.endPos.x) item.time += 10;
      });

      this.realBets = this.realBets.filter((bet) => {
        return (
          bet.startPos.x + bet.time * bet.speed.x !== window.innerWidth - 100 &&
          bet.startPos.y + bet.time * bet.speed.y !== 80 &&
          bet.startPos.x + bet.time * bet.speed.x !== this.throwPosition.x &&
          bet.startPos.y + bet.time * bet.speed.y !== this.throwPosition.y
        );
      });

      this.drawBoard(this.ctx);
      this.gameTime += 10;
    }, 10);
  },
  methods: {
    getMyIp() {
      axios.get("https://api.ipify.org?format=json").then((res) => {
        this.ip = res.data.ip;
      });
    },
    getResultList() {
      let arr = [];
      axios.get(`${this.baseURI}/history`).then((res) => {
        res.data.map((item) => {
          arr.push(JSON.parse(item.dices));
        });
      });
      return arr;
    },
    saveResult(result) {
      let date = new Date();
      let dateTime = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      axios.post(`${this.baseURI}/history`, {
        dices: JSON.stringify(result),
        time: dateTime,
      });
    },
    onResize(e) {
      console.log(e);
    },
    getResultSum() {
      return this.resultDices[0] + this.resultDices[1] + this.resultDices[2];
    },
    getResultText() {
      let sum = this.getResultSum();
      if (
        this.resultDices[0] === this.resultDices[1] &&
        this.resultDices[1] === this.resultDices[2]
      ) {
        return "Triple";
      } else {
        if (sum > 10) {
          return "Big";
        } else {
          return "Small";
        }
      }
    },
    drawResultText(ctx) {
      if (this.showResultText) {
        ctx.fillStyle = "#906942";
        ctx.fillRect(window.innerWidth / 2 + 90, 345, 100, 100);
        this.drawText(
          ctx,
          this.resultSum,
          window.innerWidth / 2 + 140,
          415,
          "bold 60px Roboto",
          "#FFF"
        );
        this.drawText(
          ctx,
          this.resultSumText,
          window.innerWidth / 2 + 320,
          420,
          "bold 80px Roboto",
          "#FFF"
        );
      }
    },
    moveResultBoard(x, y, w, h, time) {
      let speedX = ((x - this.resultBoard.x) / time) * 10;
      let speedY = ((y - this.resultBoard.y) / time) * 10;
      let scale = h / w;
      let diffWidth = ((w - this.resultBoard.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.resultBoard.x += speedX;
        this.resultBoard.y += speedY;
        this.resultBoard.w += diffWidth;
        this.resultBoard.h = this.resultBoard.w * scale;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveStopBetting(x, y, w, h, time) {
      let speedX = ((x - this.stopBetting.x) / time) * 10;
      let speedY = ((y - this.stopBetting.y) / time) * 10;
      let scale = h / w;
      let diffWidth = ((w - this.stopBetting.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.stopBetting.x += speedX;
        this.stopBetting.y += speedY;
        this.stopBetting.w += diffWidth;
        this.stopBetting.h = scale * this.stopBetting.w;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    drawResultBoard(ctx) {
      var grd = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
      grd.addColorStop(0, "#00000000");
      grd.addColorStop(0.3, "RGBA(246, 179, 9, 0.8)");
      grd.addColorStop(0.5, "RGBA(246, 179, 9, 0.9)");
      grd.addColorStop(0.7, "RGBA(246, 179, 9, 0.8)");
      grd.addColorStop(1, "#00000000");
      ctx.fillStyle = grd;
      ctx.fillRect(
        this.resultBoard.x,
        this.resultBoard.y,
        this.resultBoard.w,
        this.resultBoard.h
      );
    },
    clearBet() {
      if (this.status) this.thrownCredits = [];
    },
    bet() {
      if (this.status) {
        this.realBets = this.realBets.concat(this.thrownCredits);
        this.thrownCredits = [];
      }
    },
    getSumThrownCredits() {
      var sum = 0;
      this.thrownCredits.map((item) => {
        sum += item.value;
      });

      this.realBets.map((item) => {
        sum += item.value;
      });

      return Math.ceil(sum * 10) / 10;
    },
    getLink(image) {
      return `./imgs/dice/result/${image}.png`;
    },
    getSumImageLink(sum) {
      var image = "";
      if (sum > 3 && sum < 11) {
        image = "small";
      } else if (sum > 10 && sum < 18) {
        image = "big";
      } else {
        image = "triple";
      }
      return `./imgs/${image}.png`;
    },
    drawStopBetting(ctx) {
      ctx.drawImage(
        this.$refs["stopBetting"],
        this.stopBetting.x,
        this.stopBetting.y,
        this.stopBetting.w,
        this.stopBetting.h
      );
    },
    drawStartGame(ctx) {
      ctx.drawImage(
        this.$refs["startGame"],
        this.startGame.x,
        this.startGame.y,
        this.startGame.w,
        this.startGame.h
      );
    },
    drawThrowDices(ctx) {
      ctx.drawImage(
        this.$refs["throwDiceOne"],
        this.throwDiceOne.x,
        this.throwDiceOne.y,
        this.throwDiceOne.w,
        this.throwDiceOne.h
      );
      ctx.drawImage(
        this.$refs["throwDiceTwo"],
        this.throwDiceTwo.x,
        this.throwDiceTwo.y,
        this.throwDiceTwo.w,
        this.throwDiceTwo.h
      );
      ctx.drawImage(
        this.$refs["throwDiceThree"],
        this.throwDiceThree.x,
        this.throwDiceThree.y,
        this.throwDiceThree.w,
        this.throwDiceThree.h
      );
    },
    moveStartGame(x, y, width, time) {
      let speedX = ((x - this.startGame.x) / time) * 10;
      let speedY = ((y - this.startGame.y) / time) * 10;
      let scale = this.startGame.h / this.startGame.w;
      let diffWidth = ((width - this.startGame.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.startGame.x += speedX;
        this.startGame.y += speedY;
        this.startGame.w += diffWidth;
        this.startGame.h = this.startGame.w * scale;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveThrowDiceOne(x, y, time) {
      let speedX = ((x - this.throwDiceOne.x) / time) * 10;
      let speedY = ((y - this.throwDiceOne.y) / time) * 10;
      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.throwDiceOne.x += speedX;
        this.throwDiceOne.y += speedY;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveResultDiceOne(x, y, w, time) {
      let speedX = ((x - this.resultDiceOne.x) / time) * 10;
      let speedY = ((y - this.resultDiceOne.y) / time) * 10;
      let scale = this.resultDiceOne.h / this.resultDiceOne.w;
      let diffWidth = ((w - this.resultDiceOne.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.resultDiceOne.x += speedX;
        this.resultDiceOne.y += speedY;
        this.resultDiceOne.w += diffWidth;
        this.resultDiceOne.h = this.resultDiceOne.w * scale;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveResultDiceTwo(x, y, w, time) {
      let speedX = ((x - this.resultDiceTwo.x) / time) * 10;
      let speedY = ((y - this.resultDiceTwo.y) / time) * 10;
      let scale = this.resultDiceTwo.h / this.resultDiceTwo.w;
      let diffWidth = ((w - this.resultDiceTwo.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.resultDiceTwo.x += speedX;
        this.resultDiceTwo.y += speedY;
        this.resultDiceTwo.w += diffWidth;
        this.resultDiceTwo.h = this.resultDiceTwo.w * scale;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveResultDiceThree(x, y, w, time) {
      let speedX = ((x - this.resultDiceThree.x) / time) * 10;
      let speedY = ((y - this.resultDiceThree.y) / time) * 10;
      let scale = this.resultDiceThree.h / this.resultDiceThree.w;
      let diffWidth = ((w - this.resultDiceThree.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.resultDiceThree.x += speedX;
        this.resultDiceThree.y += speedY;
        this.resultDiceThree.w += diffWidth;
        this.resultDiceThree.h = this.resultDiceThree.w * scale;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveResultBoardDiceOne(x, y, w, time) {
      let speedX = ((x - this.resultBoardDiceOne.x) / time) * 10;
      let speedY = ((y - this.resultBoardDiceOne.y) / time) * 10;
      let diffWidth = ((w - this.resultBoardDiceOne.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.resultBoardDiceOne.x += speedX;
        this.resultBoardDiceOne.y += speedY;
        this.resultBoardDiceOne.w += diffWidth;
        this.resultBoardDiceOne.h = this.resultBoardDiceOne.w;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveResultBoardDiceTwo(x, y, w, time) {
      let speedX = ((x - this.resultBoardDiceTwo.x) / time) * 10;
      let speedY = ((y - this.resultBoardDiceTwo.y) / time) * 10;
      let diffWidth = ((w - this.resultBoardDiceTwo.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.resultBoardDiceTwo.x += speedX;
        this.resultBoardDiceTwo.y += speedY;
        this.resultBoardDiceTwo.w += diffWidth;
        this.resultBoardDiceTwo.h = this.resultBoardDiceTwo.w;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveResultBoardDiceThree(x, y, w, time) {
      let speedX = ((x - this.resultBoardDiceThree.x) / time) * 10;
      let speedY = ((y - this.resultBoardDiceThree.y) / time) * 10;
      let diffWidth = ((w - this.resultBoardDiceThree.w) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.resultBoardDiceThree.x += speedX;
        this.resultBoardDiceThree.y += speedY;
        this.resultBoardDiceThree.w += diffWidth;
        this.resultBoardDiceThree.h = this.resultBoardDiceThree.w;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    drawResultBoardDices(ctx) {
      if (this.resultDices) {
        const obj = { 1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six" };
        ctx.drawImage(
          this.$refs[`resultDice${obj[this.resultDices[0]]}`],
          this.resultBoardDiceOne.x,
          this.resultBoardDiceOne.y,
          this.resultBoardDiceOne.w,
          this.resultBoardDiceOne.h
        );
        ctx.drawImage(
          this.$refs[`resultDice${obj[this.resultDices[1]]}`],
          this.resultBoardDiceTwo.x,
          this.resultBoardDiceTwo.y,
          this.resultBoardDiceTwo.w,
          this.resultBoardDiceTwo.h
        );
        ctx.drawImage(
          this.$refs[`resultDice${obj[this.resultDices[2]]}`],
          this.resultBoardDiceThree.x,
          this.resultBoardDiceThree.y,
          this.resultBoardDiceThree.w,
          this.resultBoardDiceThree.h
        );
      }
    },
    drawResultDices(ctx) {
      if (this.resultDiceOne) {
        const obj = { 1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six" };
        ctx.drawImage(
          this.$refs[`throwDice${obj[this.resultDiceOne.dice]}`],
          this.resultDiceOne.x,
          this.resultDiceOne.y,
          this.resultDiceOne.w,
          this.resultDiceOne.h
        );
        ctx.drawImage(
          this.$refs[`throwDice${obj[this.resultDiceTwo.dice]}`],
          this.resultDiceTwo.x,
          this.resultDiceTwo.y,
          this.resultDiceTwo.w,
          this.resultDiceTwo.h
        );
        ctx.drawImage(
          this.$refs[`throwDice${obj[this.resultDiceThree.dice]}`],
          this.resultDiceThree.x,
          this.resultDiceThree.y,
          this.resultDiceThree.w,
          this.resultDiceThree.h
        );
      }
    },
    moveThrowDiceTwo(x, y, time) {
      let speedX = ((x - this.throwDiceTwo.x) / time) * 10;
      let speedY = ((y - this.throwDiceTwo.y) / time) * 10;
      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.throwDiceTwo.x += speedX;
        this.throwDiceTwo.y += speedY;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveThrowDiceThree(x, y, time) {
      let speedX = ((x - this.throwDiceThree.x) / time) * 10;
      let speedY = ((y - this.throwDiceThree.y) / time) * 10;
      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.throwDiceThree.x += speedX;
        this.throwDiceThree.y += speedY;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveDicePan(x, y, width, time) {
      let speedX = ((x - this.dicePan.x) / time) * 10;
      let speedY = ((y - this.dicePan.y) / time) * 10;
      let scale = this.dicePan.height / this.dicePan.width;
      let diffWidth = ((width - this.dicePan.width) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.dicePan.x += speedX;
        this.dicePan.y += speedY;
        this.dicePan.width += diffWidth;
        this.dicePan.height = this.dicePan.width * scale;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    moveDiceCup(x, y, width, time) {
      let speedX = ((x - this.diceCup.x) / time) * 10;
      let speedY = ((y - this.diceCup.y) / time) * 10;
      let scale = this.diceCup.height / this.diceCup.width;
      let diffWidth = ((width - this.diceCup.width) / time) * 10;

      let i = 0;
      let ani = setInterval(() => {
        i += 10;
        this.diceCup.x += speedX;
        this.diceCup.y += speedY;
        this.diceCup.width += diffWidth;
        this.diceCup.height = this.diceCup.width * scale;
        if (i === time) clearInterval(ani);
      }, 10);
    },
    onMouseDown(e) {
      if (this.status) {
        this.mouseStartPos = { x: e.offsetX, y: e.offsetY };
        this.xStartPosition = { x: e.offsetX, y: e.offsetY };
        if (
          this.xStartPosition.x > window.innerWidth / 2 - 290 &&
          this.xStartPosition.x < window.innerWidth / 2 + 290 &&
          (this.xStartPosition.y > 660) & (this.xStartPosition.y < 790)
        ) {
          this.action = 2;
        }

        this.betPostions.map((position) => {
          if (
            e.offsetX > position.x + (window.innerWidth - 760) / 2 - 237 &&
            e.offsetX < position.x + (window.innerWidth - 760) / 2 - 237 + position.w &&
            e.offsetY > position.y &&
            e.offsetY < position.y + position.h
          ) {
            if (this.bettedCredits[this.selectedCredit][position.id]) {
              this.bettedCredits[this.selectedCredit][position.id] =
                this.bettedCredits[this.selectedCredit][position.id] + 1;
            } else {
              this.bettedCredits[this.selectedCredit][position.id] = 1;
            }
            let endPos = { x: e.offsetX, y: e.offsetY + Math.floor(Math.random() * 10) };

            if (
              position.x + (window.innerWidth - 760) / 2 - 237 >
              endPos.x - this.thrownCreditSize / 2
            ) {
              endPos.x =
                position.x +
                (window.innerWidth - 760) / 2 -
                237 +
                this.thrownCreditSize / 2;
            }
            if (
              position.x + (window.innerWidth - 760) / 2 - 237 + position.w <
              endPos.x + this.thrownCreditSize / 2
            ) {
              endPos.x =
                position.x +
                (window.innerWidth - 760) / 2 -
                237 +
                position.w -
                this.thrownCreditSize / 2;
            }
            if (position.y > endPos.y - this.thrownCreditSize / 2) {
              endPos.y = position.y + this.thrownCreditSize / 2;
            }
            if (position.y + position.h < endPos.y + this.thrownCreditSize / 2) {
              endPos.y = position.y + position.h - this.thrownCreditSize / 2;
            }

            this.thrownCredits.push({
              credit: this.selectedCredit,
              value: this.betCredits[this.selectedCredit].value,
              avatar: this.credits[this.selectedCredit],
              area: position.id,
              name: position.name,
              time: 0,
              startPos: this.throwPosition,
              endPos: endPos,
              speed: {
                x: (endPos.x - this.throwPosition.x) / this.throwTime,
                y: (endPos.y - this.throwPosition.y) / this.throwTime,
              },
            });
          }
        });
      }
    },
    onMouseMove(e) {
      if (this.status) {
        switch (this.action) {
          case 0:
            this.betPostions.map((position) => (position.width = 1));
            this.betPostions.map((position) => {
              if (
                e.offsetX > position.x + (window.innerWidth - 760) / 2 - 237 &&
                e.offsetX <
                  position.x + (window.innerWidth - 760) / 2 - 237 + position.w &&
                e.offsetY > position.y &&
                e.offsetY < position.y + position.h
              ) {
                position.width = 3;
                position.color = "#FFF";
              }
            });
            break;
          case 2:
            Object.keys(this.betCredits).map((key) => {
              let item = this.betCredits[key];
              item.angle += e.movementX / 3;
              if (item.angle > -10) {
                item.angle += -175;
              } else if (item.angle < -190) {
                item.angle += 175;
              }
            });
            break;

          default:
            break;
        }
      }
    },
    onMouseUp(e) {
      if (this.status) {
        if (e.offsetX === this.mouseStartPos.x && e.offsetY === this.mouseStartPos.y) {
          if (this.getSelectedCredit(e.offsetX, e.offsetY)) {
            this.selectedCredit = this.getSelectedCredit(e.offsetX, e.offsetY);
            const diffAngle = -90 - this.betCredits[this.selectedCredit].angle;
            if (diffAngle !== 0) {
              const time = Math.abs(diffAngle / 1);
              let i = 0;
              let ani = setInterval(() => {
                i += 1;
                Object.keys(this.betCredits).map((item) => {
                  this.betCredits[item].angle += diffAngle > 0 ? 1 : -1;
                  this.betCredits[item].angle += e.movementX / 3;
                  if (this.betCredits[item].angle > -10) {
                    this.betCredits[item].angle += -175;
                  } else if (this.betCredits[item].angle < -190) {
                    this.betCredits[item].angle += 175;
                  }
                });

                if (i >= time) clearInterval(ani);
              }, 10);
            }
          }
        } else {
          let direction = 1;
          let betweenAngle = 0;
          switch (this.action) {
            case 2:
              Object.keys(this.betCredits).map((key) => {
                let credit = this.betCredits[key];
                if (Math.abs(credit.angle + 90) < betweenAngle || betweenAngle === 0) {
                  betweenAngle = Math.abs(credit.angle + 90);
                  if (credit.angle + 90 > 0) {
                    direction = -1;
                  } else {
                    direction = 1;
                  }
                  this.selectedCredit = key;
                }
              });
              Object.keys(this.betCredits).map((key) => {
                let credit = this.betCredits[key];
                credit.angle += betweenAngle * direction;
              });
              break;

            default:
              break;
          }
        }
        this.action = 0;
      }
    },
    getRandomDices(count) {
      var dices = [];
      for (let i = 0; i < count; i++) {
        dices.push(Math.floor(Math.random() * 6 + 1));
      }
      return dices;
    },
    getResult(dices) {
      let result = [];
      let cloneResult = [];
      result.push(...this.getResultBySum(dices));
      result.push(...this.getResultByOneDice(dices));
      result.push(...this.getResultByTwoDices(dices));
      result.push(...this.getResultByThreeDices(dices));

      for (let i = 0; i < result.length; i++) {
        if (cloneResult.indexOf(result[i]) === -1) {
          cloneResult.push(result[i]);
        }
      }
      return cloneResult;
    },
    getResultBySum(dices) {
      const sum = eval(dices.join("+"));
      return this.sumResult[sum];
    },
    getResultByOneDice(dices) {
      let result = [];
      for (let i = 0; i < dices.length; i++) {
        result.push(this.oneDiceResult[dices[i]]);
      }
      return result;
    },
    getResultByTwoDices(dices) {
      let cloneDices = dices.sort();
      let result = [];
      let pair = [];
      pair.push(`${cloneDices[0]}+${cloneDices[1]}`);
      pair.push(`${cloneDices[0]}+${cloneDices[2]}`);
      pair.push(`${cloneDices[1]}+${cloneDices[2]}`);

      for (let i = 0; i < pair.length; i++) {
        result.push(this.twoDicesResult[pair[i]]);
      }

      return result;
    },
    getResultByThreeDices(dices) {
      let result = [];
      if (dices[0] === dices[1] && dices[1] === dices[2]) {
        let num = dices[0];
        if (num) result = this.threeDicesResult[`${num}+${num}+${num}`];
      }
      return result;
    },
    drawText(ctx, text, x, y, font = "bold 12px Roboto", color = "#C4C4C4") {
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.fillStyle = color;
      ctx.font = font;
      ctx.fillText(text, x, y);
    },
    drawLine(ctx, startPos, endPos, color = "#FFF", width = 1) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(endPos.x, endPos.y);
      ctx.stroke();
      ctx.closePath();
    },
    drawRoundedRect(ctx, x, y, width, height, fill = null, stroke = null, radius = 5) {
      if (fill) ctx.fillStyle = fill;
      if (stroke) {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
      }
      if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
      }
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();

      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    },
    drawOval(ctx, x, y, w, h, fill = null, stroke = null) {
      let kappa = 0.5522848,
        ox = (w / 2) * kappa,
        oy = (h / 2) * kappa,
        xe = x + w, // x-end
        ye = y + h, // y-end
        xm = x + w / 2, // x-middle
        ym = y + h / 2; // y-middle

      ctx.beginPath();
      ctx.moveTo(x, ym);
      ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      if (stroke) {
        ctx.lineWidth = stroke.width;
        ctx.strokeStyle = stroke.color;
        ctx.stroke();
      }
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
    },
    drawBetCredits(ctx) {
      const centerPosition = { x: window.innerWidth / 2 - 45, y: 905 };
      const radius = 250;
      Object.keys(this.betCredits).map((key) => {
        let item = this.betCredits[key];
        const angle = (item.angle / 180) * Math.PI;
        const x = radius * Math.cos(angle) + centerPosition.x;
        const y = radius * Math.sin(angle) + centerPosition.y;

        const img = this.credits[key];
        ctx.drawImage(img, x, y, 90, 90);
      });
    },
    drawBetPositions(ctx) {
      this.betPostions.map((item) => {
        this.drawRoundedRect(
          ctx,
          item.x + (window.innerWidth - 760) / 2 - 237,
          item.y,
          item.w,
          item.h,
          null,
          { color: item.color || "#FFF", width: item.width || 1 },
          item.radius
        );
        // this.drawText(ctx, item.id, item.x + 10, item.y + 12);
      });
    },
    drawBoard(ctx) {
      ctx.clearRect(0, 0, window.innerWidth, 790);
      this.drawRoundedRect(ctx, 45, 75, window.innerWidth - 90, 660, "#383D54", null, 80);
      this.drawRoundedRect(
        ctx,
        75,
        100,
        window.innerWidth - 150,
        610,
        "#282B3D",
        null,
        80
      );
      this.drawRoundedRect(
        ctx,
        115,
        140,
        window.innerWidth - 230,
        530,
        "#1D202D",
        null,
        80
      );
      this.drawRoundedRect(
        ctx,
        145,
        160,
        window.innerWidth - 290,
        490,
        "#640505",
        null,
        80
      );
      this.drawRoundedRect(
        ctx,
        160,
        175,
        window.innerWidth - 320,
        460,
        "#6B0404",
        null,
        80
      );
      this.drawOval(ctx, window.innerWidth / 2 - 98.5, 92, 195, 95, "#1D202D", null);
      this.drawOval(ctx, window.innerWidth / 2 - 98.5, 76, 195, 95, "#282B3D", null);
      let img = this.creditTable;
      ctx.drawImage(img, window.innerWidth / 2 - 295, 695);

      this.drawBetCredits(ctx);
      this.drawBetPositions(ctx);
      this.distances.map((item) => {
        this.drawDistance(
          ctx,
          item.text,
          {
            x: item.startPos.x + (window.innerWidth - 760) / 2 - 237,
            y: item.startPos.y,
          },
          {
            x: item.endPos.x + (window.innerWidth - 760) / 2 - 237,
            y: item.endPos.y,
          }
        );
      });
      this.words.map((word) => {
        this.drawText(
          ctx,
          word.text,
          word.x + (window.innerWidth - 760) / 2 - 237,
          word.y,
          word.font
        );
      });

      this.images.map((image) => {
        ctx.drawImage(
          this.$refs[image.image],
          image.x + (window.innerWidth - 760) / 2 - 237,
          image.y,
          image.w,
          image.h
        );
      });

      this.thrownCredits.map((item) => {
        ctx.drawImage(
          item.avatar,
          item.startPos.x + item.time * item.speed.x - this.thrownCreditSize / 2,
          item.startPos.y + item.time * item.speed.y - this.thrownCreditSize / 2,
          this.thrownCreditSize,
          this.thrownCreditSize
        );
      });

      this.realBets.map((item) => {
        ctx.drawImage(
          item.avatar,
          item.startPos.x + item.time * item.speed.x - this.thrownCreditSize / 2,
          item.startPos.y + item.time * item.speed.y - this.thrownCreditSize / 2,
          this.thrownCreditSize,
          this.thrownCreditSize
        );
      });

      this.rewardCredits.map((item) => {
        ctx.drawImage(
          item.avatar,
          item.startPos.x + item.time * item.speed.x - this.thrownCreditSize / 2,
          item.startPos.y + item.time * item.speed.y - this.thrownCreditSize / 2,
          this.thrownCreditSize,
          this.thrownCreditSize
        );
      });

      this.drawDicePan(
        this.ctx,
        this.dicePan.x,
        this.dicePan.y,
        this.dicePan.width,
        this.dicePan.height
      );
      this.drawThrowDices(this.ctx);
      this.drawDiceCup(
        this.ctx,
        this.diceCup.x,
        this.diceCup.y,
        this.diceCup.width,
        this.diceCup.height
      );
      this.drawStartGame(
        this.ctx,
        this.startGame.x,
        this.startGame.y,
        this.startGame.w,
        this.startGame.h
      );
      this.drawResultDices(this.ctx);
      this.drawResultBoard(this.ctx);
      this.drawResultBoardDices(this.ctx);
      this.drawStopBetting(this.ctx);
      this.drawResultText(this.ctx);
    },
    drawDicePan(ctx, x, y, w, h) {
      ctx.drawImage(this.$refs["dicePan"], x, y, w, h);
    },
    drawDiceCup(ctx, x, y, w, h) {
      ctx.drawImage(this.$refs["diceCup"], x, y, w, h);
      ctx.save();
      ctx.rotate(0.01);
      ctx.restore();
    },
    drawDistance(ctx, text, startPos, endPos) {
      this.drawText(
        ctx,
        text,
        (endPos.x - startPos.x) / 2 + startPos.x,
        startPos.y + 3.5
      );
      this.drawLine(ctx, startPos, {
        x: (endPos.x - startPos.x) / 2 - 21 + startPos.x,
        y: startPos.y,
      });
      this.drawLine(
        ctx,
        { x: endPos.x - ((endPos.x - startPos.x) / 2 - 21), y: startPos.y },
        endPos
      );
      this.drawLine(ctx, { x: startPos.x, y: startPos.y - 7 }, startPos);
      this.drawLine(ctx, { x: endPos.x, y: endPos.y - 7 }, endPos);
    },
    getRandomPositionIntoPan() {
      const startPosX = window.innerWidth / 2 - 50;
      const startPosY = 280;
      return { x: Math.random() * 50 + startPosX, y: Math.random() * 30 + startPosY };
    },
    getSelectedCredit(x, y) {
      let returnVal = null;
      const centerPosition = { x: window.innerWidth / 2 - 45, y: 905 };
      const radius = 250;
      Object.keys(this.betCredits).map((key) => {
        let item = this.betCredits[key];
        const angle = (item.angle / 180) * Math.PI;
        const itemX = radius * Math.cos(angle) + centerPosition.x + 45;
        const itemY = radius * Math.sin(angle) + centerPosition.y + 45;

        const distance = Math.sqrt(
          Math.pow(Math.abs(itemX - x), 2) + Math.pow(Math.abs(itemY - y), 2)
        );

        if (distance < 45) {
          returnVal = key;
        }
      });

      return returnVal;
    },
  },
};
</script>

<style lang="scss">
.board {
  display: flex;
  position: relative;

  canvas {
    background: #0a3652;
  }

  .panel {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;

    img {
      display: block;
    }

    .content {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;

      .title {
        text-align: center;
        color: #fff;
        padding-top: 5px;
        font-family: bold;
      }
    }
  }

  .left-panel {
    left: 20px;

    .items {
      width: calc(100% - 3px);
      margin: 10px 0;
      height: calc(100% - 42px);
      overflow-y: hidden;

      &:hover {
        overflow-y: overlay;
      }

      .item {
        display: flex;
        color: #fff;
        align-items: center;
        padding: 0 10px;

        .name {
          background: #6b0404;
          box-sizing: content-box;
          width: 80px;
          margin: 3px 0;
          padding: 10px;
          border-radius: 5px;
        }
        .value {
          margin-left: 5px;
        }
      }
    }
  }

  .right-panel {
    right: 20px;

    .content {
      .items {
        width: calc(100% - 3px);
        margin: 10px 0;
        height: calc(100% - 42px);
        overflow-y: hidden;

        &:hover {
          overflow-y: overlay;
        }

        .item {
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3px 10px;

          img {
            display: flex;
            width: 24px;
            height: 24px;
            margin: 0 5px;
          }

          span {
            width: 20px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 5px;
          }
        }
      }
    }
  }

  img {
    display: none;
  }

  .bet-table {
    position: absolute;
    background: #00000090;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    bottom: 140px;
    padding: 2px;
    border: 2px solid #adafb8;
    border-radius: 10px;
    display: flex;
    align-items: center;

    & > div {
      &:first-child {
        height: 39px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #030405;
        border-radius: 6px;
        padding: 0 30px;
        margin-right: 20px;
        font: {
          family: Roboto;
          size: 16px;
          weight: 500;
        }
        color: #c4c4c4;

        span {
          margin-left: 5px;
          color: #d1d32a;
        }
      }
    }

    .clear {
      color: #aa4813;
      background: linear-gradient(#fae2b7, #d9691d, #e7912b);
      border: 4px solid #d05614;
      width: 88px;
      height: 25px;
      border-radius: 120px;
      box-sizing: content-box;
      margin-right: 10px;

      font: {
        family: Roboto;
        size: 17px;
        weight: 500;
      }
    }

    .bet {
      color: #5af0b1;
      border: 4px solid #378605;
      background: linear-gradient(#97df58, #3b9c09, #60c70d);
      border-radius: 120px;
      width: 88px;
      height: 25px;
      box-sizing: content-box;
      font: {
        family: Roboto;
        size: 17px;
        weight: 500;
      }
    }
  }

  .timer {
    position: absolute;
    right: 100px;
    top: 90px;
    color: #fff;
    display: flex;
    align-items: center;

    span {
      font-size: 20px;
      font-weight: 700;
      margin-right: 10px;
    }

    div {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #00000050;
      display: flex;
      align-items: center;
      justify-content: center;
      font: {
        size: 30px;
        weight: 700;
      }
    }
  }
}
/*
@media (max-width: 1200px) {
  .panel {
    display: none;
  }
}*/
</style>
